import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ username: string }> }
) {
  const { username } = await params

  const user = await db.user.findUnique({
    where: { username },
    select: {
      id: true,
      name: true,
      username: true,
      avatarUrl: true,
      location: true,
      bio: true,
      role: true,
      djProfile: true
    }
  })

  if (!user) {
    return NextResponse.json({ error: "Profile not found" }, { status: 404 })
  }

  const reviewCount = await db.review.count({ where: { targetId: user.id } })
  const avgRating = await db.review.aggregate({
    where: { targetId: user.id },
    _avg: { rating: true }
  })

  return NextResponse.json({
    ...user,
    reviewCount,
    avgRating: avgRating._avg.rating ?? 0
  })
}
