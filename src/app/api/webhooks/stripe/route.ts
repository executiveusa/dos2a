import { NextRequest, NextResponse } from "next/server"
import { stripe } from "@/lib/stripe"
import { db } from "@/lib/db"
import { headers } from "next/headers"

export async function POST(req: NextRequest) {
  const body = await req.text()
  const headersList = await headers()
  const sig = headersList.get("stripe-signature")

  if (!sig || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 })
  }

  let event
  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    )
  } catch {
    return NextResponse.json({ error: "Webhook verification failed" }, { status: 400 })
  }

  switch (event.type) {
    case "payment_intent.succeeded": {
      const pi = event.data.object
      const bookingId = pi.metadata?.bookingId
      if (bookingId) {
        await db.booking.update({
          where: { id: bookingId },
          data: { status: "CONFIRMED", confirmedAt: new Date() }
        })
      }
      break
    }

    case "payment_intent.payment_failed": {
      const pi = event.data.object
      const bookingId = pi.metadata?.bookingId
      if (bookingId) {
        await db.booking.update({
          where: { id: bookingId },
          data: { status: "CANCELLED" }
        })
      }
      break
    }

    case "customer.subscription.updated":
    case "customer.subscription.deleted": {
      const sub = event.data.object
      const stripeCustomerId = typeof sub.customer === "string" ? sub.customer : sub.customer.id
      const user = await db.user.findFirst({
        where: { stripeCustomerId }
      })
      if (user) {
        await db.subscription.updateMany({
          where: { userId: user.id, stripeSubscriptionId: sub.id },
          data: {
            status: sub.status,
            currentPeriodEnd: new Date(sub.current_period_end * 1000)
          }
        })
      }
      break
    }
  }

  return NextResponse.json({ received: true })
}
