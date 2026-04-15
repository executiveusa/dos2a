import Stripe from "stripe"

function createStripe(): Stripe {
  if (!process.env.STRIPE_SECRET_KEY) throw new Error("STRIPE_SECRET_KEY is not set")
  return new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: "2025-02-24.acacia" })
}

let _stripe: Stripe
export const stripe = new Proxy({} as Stripe, {
  get(_, prop: string | symbol) {
    if (!_stripe) _stripe = createStripe()
    return (_stripe as unknown as Record<string | symbol, unknown>)[prop]
  }
})

export const PLATFORM_BOOKING_COMMISSION = parseFloat(
  process.env.PLATFORM_BOOKING_COMMISSION ?? "0.15"
)

export const PLATFORM_GEAR_COMMISSION = parseFloat(
  process.env.PLATFORM_GEAR_COMMISSION ?? "0.05"
)

export function calculatePlatformFee(grossAmount: number): number {
  return Math.round(grossAmount * PLATFORM_BOOKING_COMMISSION)
}

export function calculateDjPayout(grossAmount: number): number {
  return grossAmount - calculatePlatformFee(grossAmount)
}

export const STRIPE_PRICES = {
  STARTER_MONTHLY: process.env.STRIPE_PRICE_STARTER_MONTHLY ?? "",
  PRO_MONTHLY: process.env.STRIPE_PRICE_PRO_MONTHLY ?? "",
  ENTERPRISE_MONTHLY: process.env.STRIPE_PRICE_ENTERPRISE_MONTHLY ?? ""
} as const
