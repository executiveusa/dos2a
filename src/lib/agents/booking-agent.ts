import { callClaude } from "@/lib/claude"
import { db } from "@/lib/db"
import { calculatePlatformFee, calculateDjPayout } from "@/lib/stripe"
import type { AgentResult } from "@/types"

export interface BookingInquiry {
  clientId: string
  djId: string
  eventDate: string
  duration: number
  location: string
  eventType: string
  guestCount: number
  budget?: number
  notes?: string
}

export async function bookingAgent(inquiry: BookingInquiry): Promise<AgentResult> {
  try {
    const [dj, client] = await Promise.all([
      db.user.findUnique({
        where: { id: inquiry.djId },
        include: { djProfile: true }
      }),
      db.user.findUnique({ where: { id: inquiry.clientId } })
    ])

    if (!dj?.djProfile) {
      return { success: false, error: "DJ profile not found" }
    }
    if (!client) {
      return { success: false, error: "Client not found" }
    }

    const baseRate = dj.djProfile.hourlyRate
    const grossAmount = baseRate * inquiry.duration * 100 // store in cents

    const prompt = `
You are a professional booking agent for DOS2A, a DJ booking platform.
Generate a personalized booking quote for the following inquiry:

DJ: ${dj.name} (${dj.djProfile.genres.join(", ")})
DJ Rate: $${baseRate}/hour
Event Date: ${inquiry.eventDate}
Duration: ${inquiry.duration} hours
Location: ${inquiry.location}
Event Type: ${inquiry.eventType}
Guest Count: ${inquiry.guestCount}
Client Notes: ${inquiry.notes ?? "None"}

Generate a professional quote message (2-3 sentences) that:
1. Confirms the booking details
2. Mentions the price ($${(grossAmount / 100).toFixed(2)} total)
3. Has a warm, professional tone
4. Is concise and clear

Return ONLY the quote message, nothing else.
`

    const { text, inputTokens, outputTokens } = await callClaude(
      prompt,
      "EXECUTION"
    )

    const booking = await db.booking.create({
      data: {
        clientId: inquiry.clientId,
        djId: inquiry.djId,
        eventDate: new Date(inquiry.eventDate),
        duration: inquiry.duration,
        location: inquiry.location,
        eventType: inquiry.eventType,
        guestCount: inquiry.guestCount,
        grossAmount,
        platformFee: calculatePlatformFee(grossAmount),
        djPayout: calculateDjPayout(grossAmount),
        status: "QUOTED",
        notes: inquiry.notes,
        quoteExpiresAt: new Date(Date.now() + 48 * 60 * 60 * 1000)
      }
    })

    await db.agentLog.create({
      data: {
        agentName: "booking",
        userId: inquiry.clientId,
        inputTokens,
        outputTokens,
        costCents: Math.round((inputTokens * 0.025 + outputTokens * 0.125) / 10),
        input: JSON.parse(JSON.stringify(inquiry)),
        output: { bookingId: booking.id, quoteMessage: text }
      }
    })

    return {
      success: true,
      data: {
        bookingId: booking.id,
        quoteMessage: text,
        grossAmount,
        platformFee: calculatePlatformFee(grossAmount),
        djPayout: calculateDjPayout(grossAmount),
        expiresAt: booking.quoteExpiresAt
      },
      tokensUsed: { input: inputTokens, output: outputTokens }
    }
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Booking agent error"
    }
  }
}
