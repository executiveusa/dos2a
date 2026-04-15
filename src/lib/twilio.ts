import twilio from "twilio"

const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN

if (!accountSid || !authToken) {
  throw new Error("Twilio credentials are not set")
}

export const twilioClient = twilio(accountSid, authToken)

const FROM_PHONE = process.env.TWILIO_PHONE_NUMBER ?? ""
const FROM_WHATSAPP = process.env.TWILIO_WHATSAPP_FROM ?? "whatsapp:+14155238886"

export async function sendSMS(to: string, body: string): Promise<void> {
  await twilioClient.messages.create({
    from: FROM_PHONE,
    to,
    body
  })
}

export async function sendWhatsApp(to: string, body: string): Promise<void> {
  const formattedTo = to.startsWith("whatsapp:") ? to : `whatsapp:${to}`
  await twilioClient.messages.create({
    from: FROM_WHATSAPP,
    to: formattedTo,
    body
  })
}
