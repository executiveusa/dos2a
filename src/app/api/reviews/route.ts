import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { z } from "zod"

const reviewSchema = z.object({
  targetId: z.string().cuid(),
  bookingId: z.string().cuid().optional(),
  rating: z.number().min(1).max(5),
  comment: z.string().max(1000).optional()
})

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await req.json()
  const parsed = reviewSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 })
  }

  const userId = (session.user as { id?: string }).id
  if (!userId) {
    return NextResponse.json({ error: "Invalid session" }, { status: 401 })
  }

  const review = await db.review.create({
    data: {
      reviewerId: userId,
      targetId: parsed.data.targetId,
      bookingId: parsed.data.bookingId,
      rating: parsed.data.rating,
      comment: parsed.data.comment
    }
  })

  const agg = await db.review.aggregate({
    where: { targetId: parsed.data.targetId },
    _avg: { rating: true },
    _count: true
  })

  await db.djProfile.updateMany({
    where: { userId: parsed.data.targetId },
    data: {
      rating: agg._avg.rating ?? 0,
      reviewCount: agg._count
    }
  })

  return NextResponse.json(review, { status: 201 })
}
