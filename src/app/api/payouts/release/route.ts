import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { payoutAgent } from "@/lib/agents/payment-agent"
import { communicationAgent } from "@/lib/agents/communication-agent"
import { db } from "@/lib/db"
import { z } from "zod"

const schema = z.object({ bookingId: z.string().cuid() })

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const userId = (session.user as { id?: string }).id
  if (!userId) {
    return NextResponse.json({ error: "Invalid session" }, { status: 401 })
  }

  const body = await req.json()
  const parsed = schema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 })
  }

  const booking = await db.booking.findUnique({ where: { id: parsed.data.bookingId } })
  if (!booking || booking.djId !== userId) {
    return NextResponse.json({ error: "Not authorized to release this payout" }, { status: 403 })
  }

  await db.booking.update({
    where: { id: parsed.data.bookingId },
    data: { status: "COMPLETED", completedAt: new Date() }
  })

  const result = await payoutAgent(parsed.data)
  if (!result.success) {
    return NextResponse.json({ error: result.error }, { status: 500 })
  }

  await communicationAgent({ type: "post_event", bookingId: parsed.data.bookingId }).catch(() => {})

  return NextResponse.json(result.data)
}
