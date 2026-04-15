import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { paymentAgent } from "@/lib/agents/payment-agent"
import { communicationAgent } from "@/lib/agents/communication-agent"
import { z } from "zod"

const paySchema = z.object({
  bookingId: z.string().cuid(),
  stripePaymentMethodId: z.string()
})

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await req.json()
  const parsed = paySchema.safeParse(body)
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

  const booking = await db.booking.findUnique({
    where: { id: parsed.data.bookingId }
  })

  if (!booking || booking.clientId !== userId) {
    return NextResponse.json({ error: "Booking not found" }, { status: 404 })
  }

  const result = await paymentAgent(parsed.data)
  if (!result.success) {
    return NextResponse.json({ error: result.error }, { status: 500 })
  }

  await communicationAgent({ type: "booking_confirmed", bookingId: parsed.data.bookingId }).catch(
    () => {}
  )

  return NextResponse.json(result.data)
}
