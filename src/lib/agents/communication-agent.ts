import { sendEmail, emailTemplates } from "@/lib/sendgrid"
import { sendWhatsApp, sendSMS } from "@/lib/twilio"
import { db } from "@/lib/db"
import type { AgentResult } from "@/types"

export type NotificationType =
  | "booking_confirmed"
  | "quote_received"
  | "payment_received"
  | "reminder_week"
  | "reminder_day"
  | "reminder_hour"
  | "post_event"
  | "payout_processed"

export interface NotificationRequest {
  type: NotificationType
  bookingId: string
}

export async function communicationAgent(
  request: NotificationRequest
): Promise<AgentResult> {
  try {
    const booking = await db.booking.findUnique({
      where: { id: request.bookingId },
      include: { client: true, dj: true, transaction: true }
    })

    if (!booking) {
      return { success: false, error: "Booking not found" }
    }

    const eventDateStr = booking.eventDate.toLocaleDateString("en-MX", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    })

    const eventTimeStr = booking.eventDate.toLocaleTimeString("en-MX", {
      hour: "2-digit",
      minute: "2-digit"
    })

    const sent: string[] = []

    switch (request.type) {
      case "booking_confirmed": {
        const template = emailTemplates.bookingConfirmation({
          clientName: booking.client.name,
          djName: booking.dj.name,
          eventDate: eventDateStr,
          eventTime: eventTimeStr,
          location: booking.location,
          totalAmount: booking.grossAmount,
          bookingId: booking.id
        })
        await sendEmail(booking.client.email, template.subject, template.html)
        sent.push("email_to_client")

        if (booking.client.whatsapp) {
          await sendWhatsApp(
            booking.client.whatsapp,
            `✅ Booking confirmed! ${booking.dj.name} is set for ${eventDateStr} at ${eventTimeStr}. Check your email for details.`
          )
          sent.push("whatsapp_to_client")
        }
        break
      }

      case "reminder_week": {
        if (booking.dj.whatsapp) {
          await sendWhatsApp(
            booking.dj.whatsapp,
            `📅 Reminder: You have a gig in 7 days!\n${booking.eventType} — ${eventDateStr} at ${eventTimeStr}\n📍 ${booking.location}\n💰 Payout: $${(booking.djPayout / 100).toFixed(2)}`
          )
          sent.push("whatsapp_to_dj")
        }
        break
      }

      case "reminder_day": {
        const reminderEmail = emailTemplates.eventReminder({
          recipientName: booking.dj.name,
          djName: booking.dj.name,
          eventDate: `${eventDateStr} at ${eventTimeStr}`,
          location: booking.location,
          daysUntil: 1
        })
        await sendEmail(booking.dj.email, reminderEmail.subject, reminderEmail.html)
        sent.push("email_to_dj")

        if (booking.dj.phone) {
          await sendSMS(
            booking.dj.phone,
            `DOS2A: Your gig is TOMORROW at ${eventTimeStr}! Location: ${booking.location}. Arrive 30 min early. 🎵`
          )
          sent.push("sms_to_dj")
        }
        break
      }

      case "post_event": {
        if (booking.client.whatsapp) {
          await sendWhatsApp(
            booking.client.whatsapp,
            `🌟 How was your event with ${booking.dj.name}? Leave a review to help other clients find great DJs!`
          )
          sent.push("whatsapp_review_request")
        }
        if (booking.transaction && booking.dj.email) {
          const payoutEmail = emailTemplates.djPayout({
            djName: booking.dj.name,
            eventDate: eventDateStr,
            grossAmount: booking.grossAmount,
            platformFee: booking.platformFee,
            netAmount: booking.djPayout
          })
          await sendEmail(booking.dj.email, payoutEmail.subject, payoutEmail.html)
          sent.push("payout_email_to_dj")
        }
        break
      }

      default:
        return { success: false, error: `Unknown notification type: ${request.type}` }
    }

    return {
      success: true,
      data: { sent, bookingId: request.bookingId }
    }
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Communication agent error"
    }
  }
}
