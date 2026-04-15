import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { bookingAgent } from "@/lib/agents/booking-agent"
import { z } from "zod"

const bookingSchema = z.object({
  djId: z.string().cuid(),
  eventDate: z.string().min(1), // accepts "2024-12-25" or full ISO
  duration: z.number().min(1).max(24),
  location: z.string().min(2),
  eventType: z.string().min(2),
  guestCount: z.number().min(1),
  notes: z.string().optional(),
  clientName: z.string().optional(),
  clientEmail: z.string().email().optional(),
  clientPhone: z.string().optional()
})

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { searchParams } = new URL(req.url)
  const role = searchParams.get("role") ?? "client"

  const userId = (session.user as { id?: string }).id
  if (!userId) {
    return NextResponse.json({ error: "Invalid session" }, { status: 401 })
  }

  const where =
    role === "dj" ? { djId: userId } : { clientId: userId }

  const bookings = await db.booking.findMany({
    where,
    include: {
      client: { select: { name: true, email: true, avatarUrl: true } },
      dj: { select: { name: true, username: true, avatarUrl: true } },
      transaction: true,
      reviews: true
    },
    orderBy: { eventDate: "desc" }
  })

  return NextResponse.json({ bookings })
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await req.json()
  const parsed = bookingSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid request", details: parsed.error.issues },
      { status: 400 }
    )
  }

  const userId = (session.user as { id?: string }).id
  if (!userId) {
    return NextResponse.json({ error: "Invalid session" }, { status: 401 })
  }

  const result = await bookingAgent({ ...parsed.data, clientId: userId })

  if (!result.success) {
    return NextResponse.json({ error: result.error }, { status: 500 })
  }

  return NextResponse.json(result.data, { status: 201 })
}
