"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

const ROLES = ["CLIENT", "DJ", "ENGINEER", "PROMOTER"] as const

export default function RegisterPage() {
  const router = useRouter()
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "CLIENT" as typeof ROLES[number]
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  function update(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (form.password.length < 8) {
      setError("Password must be at least 8 characters")
      return
    }
    setLoading(true)
    setError("")

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    })

    setLoading(false)
    if (res.ok) {
      router.push("/login?registered=true")
    } else {
      const d = await res.json()
      setError(d.error ?? "Registration failed. Please try again.")
    }
  }

  return (
    <div className="flex min-h-[calc(100vh-3.5rem)] items-center justify-center px-4 py-16">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <Link href="/" className="font-display text-2xl font-bold text-slate-50">
            DOS<span className="text-brand-purple">2A</span>
          </Link>
          <p className="mt-2 text-sm text-slate-400">Create your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1.5">Full name</label>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              className="w-full rounded-md border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-slate-200 placeholder-slate-500 focus:border-brand-purple focus:outline-none"
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1.5">Email</label>
            <input
              type="email"
              required
              autoComplete="email"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              className="w-full rounded-md border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-slate-200 placeholder-slate-500 focus:border-brand-purple focus:outline-none"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1.5">Password</label>
            <input
              type="password"
              required
              minLength={8}
              autoComplete="new-password"
              value={form.password}
              onChange={(e) => update("password", e.target.value)}
              className="w-full rounded-md border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-slate-200 placeholder-slate-500 focus:border-brand-purple focus:outline-none"
              placeholder="Min 8 characters"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1.5">I am a…</label>
            <div className="grid grid-cols-2 gap-2">
              {ROLES.map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => update("role", r)}
                  className={`rounded-md border py-2 text-sm font-medium transition-colors ${
                    form.role === r
                      ? "border-brand-purple bg-brand-purple/10 text-brand-purple"
                      : "border-slate-700 text-slate-400 hover:border-slate-600"
                  }`}
                >
                  {r === "CLIENT" ? "Client" : r === "DJ" ? "DJ" : r === "ENGINEER" ? "Engineer" : "Promoter"}
                </button>
              ))}
            </div>
          </div>

          {error && (
            <p className="rounded-md border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm text-red-400">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-brand-purple py-2.5 text-sm font-semibold text-white transition-all hover:bg-brand-purple/90 disabled:opacity-50"
          >
            {loading ? "Creating account…" : "Create account"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          Already have an account?{" "}
          <Link href="/login" className="text-brand-purple hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
