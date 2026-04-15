import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"

export async function GET(_req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const userId = (session.user as { id?: string }).id
  if (!userId) {
    return NextResponse.json({ error: "Invalid session" }, { status: 401 })
  }

  const [bookings, reviews] = await Promise.all([
    db.booking.findMany({
      where: { djId: userId },
      select: { status: true, djPayout: true }
    }),
    db.review.aggregate({
      where: { targetId: userId },
      _avg: { rating: true },
      _count: true
    })
  ])

  const totalBookings = bookings.length
  const confirmedBookings = bookings.filter((b) =>
    ["CONFIRMED", "COMPLETED"].includes(b.status)
  ).length
  const completedBookings = bookings.filter((b) => b.status === "COMPLETED").length
  const totalRevenue = bookings
    .filter((b) => b.status === "COMPLETED")
    .reduce((s, b) => s + b.djPayout, 0)

  const bookingsByStatus = bookings.reduce<Record<string, number>>((acc, b) => {
    acc[b.status] = (acc[b.status] ?? 0) + 1
    return acc
  }, {})

  return NextResponse.json({
    totalBookings,
    confirmedBookings,
    completedBookings,
    totalRevenue,
    avgRating: reviews._avg.rating ?? 0,
    reviewCount: reviews._count,
    conversionRate:
      totalBookings > 0 ? (confirmedBookings / totalBookings) * 100 : 0,
    bookingsByStatus
  })
}
