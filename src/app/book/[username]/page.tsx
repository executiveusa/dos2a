"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

interface BookPageProps {
  params: Promise<{ username: string }>
}

const EVENT_TYPES = [
  "Wedding", "Corporate event", "Birthday party", "Club night",
  "Festival", "Private party", "Concert", "Other"
]

export default function BookPage({ params }: BookPageProps) {
  const router = useRouter()
  const [form, setForm] = useState({
    eventType: "",
    eventDate: "",
    duration: 4,
    location: "",
    guestCount: 100,
    notes: "",
    clientName: "",
    clientEmail: "",
    clientPhone: ""
  })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState("")

  function update(field: string, value: string | number) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    setError("")

    const { username } = await params

    // first look up the DJ's id
    const profileRes = await fetch(`/api/profiles/${username}`)
    if (!profileRes.ok) {
      setError("DJ not found")
      setSubmitting(false)
      return
    }
    const { id: djId } = await profileRes.json()

    const res = await fetch("/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        djId,
        ...form,
        duration: Number(form.duration),
        guestCount: Number(form.guestCount)
      })
    })

    setSubmitting(false)
    if (res.ok) {
      router.push("/bookings?quoted=true")
    } else {
      const d = await res.json()
      setError(d.error ?? "Something went wrong")
    }
  }

  return (
    <div className="mx-auto max-w-lg px-4 py-12 sm:px-6">
      <div className="mb-6">
        <Link href="javascript:history.back()" className="text-sm text-slate-500 hover:text-slate-300">
          ← Back to profile
        </Link>
        <h1 className="mt-4 font-display text-2xl font-bold text-slate-50">Request booking</h1>
        <p className="mt-1 text-sm text-slate-400">
          An automated quote will be generated within 60 seconds.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 space-y-4">
          <h2 className="font-medium text-slate-200">Your details</h2>
          <div>
            <label className="block text-sm text-slate-400 mb-1">Full name</label>
            <input required value={form.clientName} onChange={(e) => update("clientName", e.target.value)}
              className="input-base w-full" placeholder="Jane Doe" />
          </div>
          <div>
            <label className="block text-sm text-slate-400 mb-1">Email</label>
            <input required type="email" value={form.clientEmail} onChange={(e) => update("clientEmail", e.target.value)}
              className="input-base w-full" placeholder="jane@example.com" />
          </div>
          <div>
            <label className="block text-sm text-slate-400 mb-1">WhatsApp / phone</label>
            <input value={form.clientPhone} onChange={(e) => update("clientPhone", e.target.value)}
              className="input-base w-full" placeholder="+52 55 1234 5678" />
          </div>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 space-y-4">
          <h2 className="font-medium text-slate-200">Event details</h2>
          <div>
            <label className="block text-sm text-slate-400 mb-1">Event type</label>
            <select required value={form.eventType} onChange={(e) => update("eventType", e.target.value)}
              className="input-base w-full">
              <option value="">Select event type</option>
              {EVENT_TYPES.map((t) => <option key={t}>{t}</option>)}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm text-slate-400 mb-1">Date</label>
              <input required type="date" value={form.eventDate}
                min={new Date().toISOString().split("T")[0]}
                onChange={(e) => update("eventDate", e.target.value)}
                className="input-base w-full" />
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-1">Hours</label>
              <input required type="number" min={2} max={12} value={form.duration}
                onChange={(e) => update("duration", e.target.value)}
                className="input-base w-full" />
            </div>
          </div>
          <div>
            <label className="block text-sm text-slate-400 mb-1">Venue / address</label>
            <input required value={form.location} onChange={(e) => update("location", e.target.value)}
              className="input-base w-full" placeholder="Bar Lunas, Colonia Roma, CDMX" />
          </div>
          <div>
            <label className="block text-sm text-slate-400 mb-1">Expected guests</label>
            <input type="number" min={10} value={form.guestCount}
              onChange={(e) => update("guestCount", e.target.value)}
              className="input-base w-full" />
          </div>
          <div>
            <label className="block text-sm text-slate-400 mb-1">Additional notes</label>
            <textarea value={form.notes} onChange={(e) => update("notes", e.target.value)}
              rows={3} placeholder="Special requests, sound requirements, etc."
              className="input-base w-full resize-none" />
          </div>
        </div>

        {error && (
          <p className="rounded-md border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-sm text-red-400">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-md bg-brand-purple py-3 text-sm font-semibold text-white hover:bg-brand-purple/90 disabled:opacity-50"
        >
          {submitting ? "Generating quote…" : "Request automated quote"}
        </button>
        <p className="text-center text-xs text-slate-600">Quote valid for 48 hours · No commitment until payment</p>
      </form>
    </div>
  )
}
