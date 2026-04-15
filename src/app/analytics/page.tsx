"use client"

import { useEffect, useState } from "react"

interface AnalyticsData {
  totalBookings: number
  confirmedBookings: number
  completedBookings: number
  totalRevenue: number
  avgRating: number
  reviewCount: number
  conversionRate: number
  bookingsByStatus: Record<string, number>
}

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/analytics")
      .then((r) => r.json())
      .then((d) => { setData(d); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  const metrics = data
    ? [
        { label: "Total bookings", value: data.totalBookings },
        { label: "Confirmed", value: data.confirmedBookings },
        { label: "Completed", value: data.completedBookings },
        {
          label: "Revenue earned",
          value: `$${(data.totalRevenue / 100).toFixed(2)}`
        },
        { label: "Avg rating", value: data.avgRating.toFixed(1) },
        { label: "Reviews", value: data.reviewCount },
        {
          label: "Conversion rate",
          value: `${data.conversionRate.toFixed(0)}%`
        }
      ]
    : []

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-slate-50">Analytics</h1>
        <p className="mt-2 text-slate-400">Your performance at a glance.</p>
      </div>

      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className="animate-pulse h-24 rounded-lg border border-slate-800 bg-slate-900/60" />
          ))}
        </div>
      ) : !data ? (
        <p className="text-slate-400">No analytics data available. Sign in to see your stats.</p>
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {metrics.map((m) => (
              <div
                key={m.label}
                className="rounded-lg border border-slate-800 bg-slate-900/60 p-5"
              >
                <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                  {m.label}
                </p>
                <p className="mt-2 font-display text-2xl font-bold text-slate-50">
                  {m.value}
                </p>
              </div>
            ))}
          </div>

          {Object.keys(data.bookingsByStatus).length > 0 && (
            <div className="mt-8 rounded-xl border border-slate-800 bg-slate-900/60 p-6">
              <h2 className="font-display text-lg font-semibold text-slate-100 mb-4">
                Bookings by status
              </h2>
              <div className="space-y-3">
                {Object.entries(data.bookingsByStatus).map(([status, count]) => (
                  <div key={status} className="flex items-center gap-3">
                    <span className="w-24 text-sm text-slate-500">{status}</span>
                    <div className="flex-1 rounded-full bg-slate-800 h-2">
                      <div
                        className="h-2 rounded-full bg-brand-purple"
                        style={{
                          width: `${(count / data.totalBookings) * 100}%`
                        }}
                      />
                    </div>
                    <span className="w-8 text-right text-sm font-medium text-slate-300">
                      {count}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}
