"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

interface PaymentPageProps {
  params: Promise<{ bookingId: string }>
}

export default function PaymentPage({ params }: PaymentPageProps) {
  const router = useRouter()
  const [paying, setPaying] = useState(false)
  const [error, setError] = useState("")

  async function handlePay(e: React.FormEvent) {
    e.preventDefault()
    setPaying(true)
    setError("")

    const resolvedParams = await params

    const res = await fetch("/api/bookings/pay", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        bookingId: resolvedParams.bookingId,
        stripePaymentMethodId: "pm_card_visa"
      })
    })

    setPaying(false)
    if (res.ok) {
      router.push("/bookings?confirmed=true")
    } else {
      const d = await res.json()
      setError(d.error ?? "Payment failed. Please try again.")
    }
  }

  return (
    <div className="mx-auto max-w-md px-4 py-16 sm:px-6">
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-8">
        <div className="mb-6">
          <h1 className="font-display text-2xl font-bold text-slate-50">
            Complete payment
          </h1>
          <p className="mt-2 text-sm text-slate-400">
            Your card will be charged immediately. Funds are held until after your event.
          </p>
        </div>

        <div className="mb-6 rounded-lg border border-slate-700 bg-slate-800/50 p-4 space-y-2 text-sm">
          <div className="flex justify-between text-slate-400">
            <span>Booking total</span>
            <span className="text-slate-200">—</span>
          </div>
          <div className="flex justify-between text-slate-400">
            <span>Platform fee (included)</span>
            <span className="text-slate-200">15%</span>
          </div>
        </div>

        <form onSubmit={handlePay} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1.5">
              Card number
            </label>
            <input
              type="text"
              placeholder="4242 4242 4242 4242"
              className="w-full rounded-md border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-slate-200 placeholder-slate-600 focus:border-brand-purple focus:outline-none font-mono"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1.5">Expiry</label>
              <input
                type="text"
                placeholder="MM / YY"
                className="w-full rounded-md border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-slate-200 placeholder-slate-600 focus:border-brand-purple focus:outline-none font-mono"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1.5">CVC</label>
              <input
                type="text"
                placeholder="123"
                className="w-full rounded-md border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-slate-200 placeholder-slate-600 focus:border-brand-purple focus:outline-none font-mono"
              />
            </div>
          </div>

          {error && (
            <p className="rounded-md border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm text-red-400">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={paying}
            className="w-full rounded-md bg-brand-purple py-3 text-sm font-semibold text-white transition-all hover:bg-brand-purple/90 disabled:opacity-50"
          >
            {paying ? "Processing…" : "Pay & confirm booking"}
          </button>

          <p className="text-center text-xs text-slate-600">
            Powered by Stripe. Your payment info is never stored on DOS2A servers.
          </p>
        </form>
      </div>
    </div>
  )
}
