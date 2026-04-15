"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

interface Booking {
  id: string
  eventDate: string
  duration: number
  location: string
  eventType: string
  grossAmount: number
  djPayout: number
  status: string
  client: { name: string; email: string }
  dj: { name: string; username?: string }
}

const STATUS_COLORS: Record<string, string> = {
  PENDING: "text-amber-400 bg-amber-400/10",
  QUOTED: "text-brand-cyan bg-brand-cyan/10",
  ACCEPTED: "text-blue-400 bg-blue-400/10",
  CONFIRMED: "text-green-400 bg-green-400/10",
  COMPLETED: "text-slate-300 bg-slate-300/10",
  CANCELLED: "text-red-400 bg-red-400/10",
  DISPUTED: "text-red-500 bg-red-500/10"
}

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [role, setRole] = useState<"client" | "dj">("client")

  useEffect(() => {
    setLoading(true)
    fetch(`/api/bookings?role=${role}`)
      .then((r) => r.json())
      .then((d) => { setBookings(d.bookings ?? []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [role])

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="font-display text-3xl font-bold text-slate-50">Bookings</h1>
        <div className="flex gap-1 rounded-md border border-slate-700 bg-slate-800/60 p-0.5">
          {(["client", "dj"] as const).map((r) => (
            <button
              key={r}
              onClick={() => setRole(r)}
              className={`rounded px-4 py-1.5 text-sm font-medium transition-colors ${
                role === r
                  ? "bg-brand-purple text-white"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              {r === "client" ? "As client" : "As DJ"}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="animate-pulse h-20 rounded-lg border border-slate-800 bg-slate-900/60" />
          ))}
        </div>
      ) : bookings.length === 0 ? (
        <div className="py-20 text-center">
          <p className="text-slate-400">No bookings yet.</p>
          <Link href="/marketplace/djs" className="mt-4 inline-block text-sm text-brand-purple hover:underline">
            Browse DJs
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {bookings.map((b) => (
            <div
              key={b.id}
              className="rounded-lg border border-slate-800 bg-slate-900/60 p-5"
            >
              <div className="flex flex-wrap items-start gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-slate-100">{b.eventType}</p>
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                        STATUS_COLORS[b.status] ?? "text-slate-400 bg-slate-400/10"
                      }`}
                    >
                      {b.status}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-slate-400">
                    {new Date(b.eventDate).toLocaleDateString("en-MX", {
                      weekday: "short",
                      year: "numeric",
                      month: "short",
                      day: "numeric"
                    })} · {b.duration}h · {b.location}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    {role === "client" ? `DJ: ${b.dj.name}` : `Client: ${b.client.name}`}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <p className="font-semibold text-slate-100">
                    ${(b.grossAmount / 100).toFixed(2)}
                  </p>
                  {role === "dj" && (
                    <p className="text-xs text-slate-500">
                      Your payout: ${(b.djPayout / 100).toFixed(2)}
                    </p>
                  )}
                </div>
              </div>

              {b.status === "QUOTED" && role === "client" && (
                <div className="mt-3 flex gap-2 border-t border-slate-800 pt-3">
                  <Link
                    href={`/payment/${b.id}`}
                    className="rounded-md bg-brand-purple px-4 py-1.5 text-sm font-medium text-white hover:bg-brand-purple/90"
                  >
                    Pay & confirm
                  </Link>
                </div>
              )}
              {b.status === "CONFIRMED" && role === "dj" && (
                <div className="mt-3 border-t border-slate-800 pt-3">
                  <form action={`/api/payouts/release`} method="POST">
                    <button
                      type="submit"
                      className="rounded-md border border-green-600/40 bg-green-600/10 px-4 py-1.5 text-sm font-medium text-green-400 hover:bg-green-600/20"
                    >
                      Mark complete & release payout
                    </button>
                  </form>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
