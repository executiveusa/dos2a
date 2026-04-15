import sgMail from "@sendgrid/mail"

const FROM_EMAIL = process.env.SENDGRID_FROM_EMAIL ?? "noreply@dos2a.com"
const FROM_NAME = process.env.SENDGRID_FROM_NAME ?? "DOS2A"

export async function sendEmail(
  to: string,
  subject: string,
  html: string,
  text?: string
): Promise<void> {
  if (!process.env.SENDGRID_API_KEY) {
    console.warn("SENDGRID_API_KEY is not set — email not sent")
    return
  }
  sgMail.setApiKey(process.env.SENDGRID_API_KEY)
  await sgMail.send({
    to,
    from: { email: FROM_EMAIL, name: FROM_NAME },
    subject,
    html,
    text: text ?? html.replace(/<[^>]+>/g, "")
  })
}

export const emailTemplates = {
  bookingConfirmation: (params: {
    clientName: string
    djName: string
    eventDate: string
    eventTime: string
    location: string
    totalAmount: number
    bookingId: string
  }) => ({
    subject: `✅ Booking Confirmed: ${params.djName} for ${params.eventDate}`,
    html: `
      <div style="font-family: Inter, sans-serif; max-width: 600px; margin: 0 auto; background: #0F172A; color: #F1F5F9; padding: 40px; border-radius: 12px;">
        <h1 style="color: #7C3AED; font-size: 24px; margin-bottom: 8px;">Booking Confirmed!</h1>
        <p>Hi ${params.clientName},</p>
        <div style="background: #1E293B; border-radius: 8px; padding: 24px; margin: 24px 0;">
          <p>📅 <strong>${params.eventDate}</strong> at ${params.eventTime}</p>
          <p>🎤 <strong>${params.djName}</strong></p>
          <p>💵 Total: <strong>$${(params.totalAmount / 100).toFixed(2)}</strong></p>
          <p>📍 ${params.location}</p>
        </div>
        <p>${params.djName} has confirmed and is preparing for your event.</p>
        <p>Questions? Reply to this email.</p>
        <p style="color: #7C3AED; font-weight: 600;">DOS2A Team</p>
      </div>
    `
  }),

  djPayout: (params: {
    djName: string
    eventDate: string
    grossAmount: number
    platformFee: number
    netAmount: number
  }) => ({
    subject: `💰 Payout Processed: $${(params.netAmount / 100).toFixed(2)}`,
    html: `
      <div style="font-family: Inter, sans-serif; max-width: 600px; margin: 0 auto; background: #0F172A; color: #F1F5F9; padding: 40px; border-radius: 12px;">
        <h1 style="color: #7C3AED;">Payout Processed</h1>
        <p>Hi ${params.djName},</p>
        <p>Your payout for ${params.eventDate} has been processed!</p>
        <div style="background: #1E293B; border-radius: 8px; padding: 24px; margin: 24px 0;">
          <p>Booking: $${(params.grossAmount / 100).toFixed(2)}</p>
          <p>Platform fee (15%): -$${(params.platformFee / 100).toFixed(2)}</p>
          <p style="font-size: 20px; color: #7C3AED;"><strong>Your payout: $${(params.netAmount / 100).toFixed(2)}</strong></p>
        </div>
        <p>Arrives in 2-3 business days. Keep rocking! 🎵</p>
      </div>
    `
  }),

  eventReminder: (params: {
    recipientName: string
    djName: string
    eventDate: string
    location: string
    daysUntil: number
  }) => ({
    subject: `⏰ ${params.daysUntil === 1 ? "Tomorrow" : `${params.daysUntil} days`} — Your event with ${params.djName}`,
    html: `
      <div style="font-family: Inter, sans-serif; max-width: 600px; margin: 0 auto; background: #0F172A; color: #F1F5F9; padding: 40px; border-radius: 12px;">
        <h1 style="color: #06B6D4;">Event Reminder</h1>
        <p>Hi ${params.recipientName},</p>
        <p>Your event with <strong>${params.djName}</strong> is in <strong>${params.daysUntil} day${params.daysUntil !== 1 ? "s" : ""}</strong>!</p>
        <div style="background: #1E293B; border-radius: 8px; padding: 24px; margin: 24px 0;">
          <p>📅 ${params.eventDate}</p>
          <p>📍 ${params.location}</p>
        </div>
        <p>DOS2A Team</p>
      </div>
    `
  })
}
