import { stripe, calculatePlatformFee, calculateDjPayout } from "@/lib/stripe"
import { db } from "@/lib/db"
import type { AgentResult } from "@/types"

export interface PaymentRequest {
  bookingId: string
  stripePaymentMethodId: string
}

export interface PayoutRequest {
  bookingId: string
}

export async function paymentAgent(
  request: PaymentRequest
): Promise<AgentResult> {
  try {
    const booking = await db.booking.findUnique({
      where: { id: request.bookingId },
      include: { client: true, dj: true }
    })

    if (!booking) {
      return { success: false, error: "Booking not found" }
    }
    if (booking.status !== "QUOTED" && booking.status !== "ACCEPTED") {
      return {
        success: false,
        error: `Booking cannot be paid in status: ${booking.status}`
      }
    }

    let customerId = booking.client.stripeCustomerId
    if (!customerId) {
      const customer = await stripe.customers.create({
        email: booking.client.email,
        name: booking.client.name
      })
      customerId = customer.id
      await db.user.update({
        where: { id: booking.clientId },
        data: { stripeCustomerId: customerId }
      })
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: booking.grossAmount,
      currency: "mxn",
      customer: customerId,
      payment_method: request.stripePaymentMethodId,
      confirm: true,
      metadata: {
        bookingId: booking.id,
        djId: booking.djId,
        clientId: booking.clientId
      },
      description: `DOS2A booking — ${booking.eventType} on ${booking.eventDate.toISOString().split("T")[0]}`
    })

    await db.booking.update({
      where: { id: booking.id },
      data: {
        status: "CONFIRMED",
        stripePaymentId: paymentIntent.id,
        confirmedAt: new Date()
      }
    })

    await db.transaction.create({
      data: {
        bookingId: booking.id,
        amount: booking.grossAmount,
        platformFee: calculatePlatformFee(booking.grossAmount),
        djPayout: calculateDjPayout(booking.grossAmount),
        stripeChargeId: paymentIntent.id,
        status: "SUCCEEDED"
      }
    })

    return {
      success: true,
      data: {
        paymentIntentId: paymentIntent.id,
        status: paymentIntent.status,
        amount: booking.grossAmount
      }
    }
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Payment agent error"
    }
  }
}

export async function payoutAgent(
  request: PayoutRequest
): Promise<AgentResult> {
  try {
    const booking = await db.booking.findUnique({
      where: { id: request.bookingId },
      include: { transaction: true, dj: true }
    })

    if (!booking) {
      return { success: false, error: "Booking not found" }
    }
    if (booking.status !== "COMPLETED") {
      return { success: false, error: "Booking must be COMPLETED to payout" }
    }
    if (!booking.transaction) {
      return { success: false, error: "No transaction found for booking" }
    }
    if (booking.transaction.paidOutAt) {
      return { success: false, error: "Payout already processed" }
    }

    if (!booking.dj.stripeCustomerId) {
      return {
        success: false,
        error: "DJ does not have a Stripe Connect account"
      }
    }

    const transfer = await stripe.transfers.create({
      amount: booking.djPayout,
      currency: "mxn",
      destination: booking.dj.stripeCustomerId,
      source_transaction: booking.transaction.stripeChargeId ?? undefined,
      metadata: { bookingId: booking.id, djId: booking.djId }
    })

    await db.transaction.update({
      where: { bookingId: booking.id },
      data: {
        stripePayoutId: transfer.id,
        paidOutAt: new Date()
      }
    })

    return {
      success: true,
      data: {
        transferId: transfer.id,
        amount: booking.djPayout,
        djId: booking.djId
      }
    }
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Payout agent error"
    }
  }
}
