"use client"

import Link from "next/link"
import { motion } from "framer-motion"

const genres = ["House", "Techno", "Latin", "Hip-Hop", "Reggaeton", "EDM", "Cumbia", "Afrobeats"]

const stats = [
  { value: "500+", label: "DJs registered" },
  { value: "2,400+", label: "Gigs booked" },
  { value: "4.9", label: "Avg DJ rating" },
  { value: "15 min", label: "Avg quote time" }
]

const steps = [
  {
    step: "01",
    title: "Browse & discover",
    desc: "Filter DJs by genre, location, price, and availability. Every profile includes real reviews."
  },
  {
    step: "02",
    title: "Get an instant quote",
    desc: "Our booking agent generates a personalized quote in seconds. No back-and-forth."
  },
  {
    step: "03",
    title: "Pay securely",
    desc: "Card, transfer, or wallet. Funds are held until after your event."
  },
  {
    step: "04",
    title: "Show up and enjoy",
    desc: "We handle all the coordination, reminders, and payout to the DJ."
  }
]

const tiers = [
  {
    name: "Musician",
    price: "$0",
    period: "/month",
    features: ["Basic profile", "1 portfolio item", "Booking inquiry form", "Community access"],
    cta: "Get started free",
    href: "/register",
    accent: false
  },
  {
    name: "Pro DJ",
    price: "$29",
    period: "/month",
    features: [
      "Featured in search",
      "5 portfolio items",
      "Booking calendar + availability",
      "Automated quote generation",
      "Email + SMS reminders",
      "Weekly analytics"
    ],
    cta: "Start 14-day trial",
    href: "/register?tier=starter",
    accent: true
  },
  {
    name: "Studio",
    price: "$99",
    period: "/month",
    features: [
      "Everything in Pro DJ",
      "Up to 5 team collaborators",
      "Gear rental inventory",
      "Advanced analytics",
      "Custom subdomain",
      "API access",
      "Priority support"
    ],
    cta: "Start 14-day trial",
    href: "/register?tier=pro",
    accent: false
  }
]

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[92vh] flex flex-col justify-center overflow-hidden">
        {/* Grid background */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
            backgroundSize: "48px 48px"
          }}
        />
        {/* Purple glow */}
        <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[600px] w-[600px] rounded-full bg-brand-purple/10 blur-[100px]" />

        <div className="relative mx-auto max-w-6xl px-6 py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-md border border-brand-purple/30 bg-brand-purple/10 px-3 py-1.5 text-sm text-brand-purple">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-cyan animate-pulse" />
              Now in beta — Mexico City
            </div>

            <h1 className="font-display text-6xl font-bold leading-[1.08] tracking-tight text-slate-50 md:text-7xl">
              Book the DJ.
              <br />
              <span className="text-brand-purple">Skip the chaos.</span>
            </h1>

            <p className="mt-6 max-w-xl text-lg text-slate-400">
              DOS2A connects event planners with top DJs, sound engineers, and musicians. Instant quotes, secure payments, automated everything.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/marketplace/djs"
                className="inline-flex items-center gap-2 rounded-md bg-brand-purple px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-brand-purple/90 hover:shadow-[0_0_20px_rgba(124,58,237,0.3)]"
              >
                Find a DJ
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <Link
                href="/register?role=dj"
                className="inline-flex items-center gap-2 rounded-md border border-slate-700 bg-slate-800/60 px-5 py-2.5 text-sm font-semibold text-slate-200 transition-all duration-200 hover:border-slate-600 hover:bg-slate-800"
              >
                I&apos;m a DJ — join free
              </Link>
            </div>

            {/* Genre pills */}
            <div className="mt-12 flex flex-wrap gap-2">
              {genres.map((g) => (
                <Link
                  key={g}
                  href={`/marketplace/djs?genres=${g}`}
                  className="rounded-sm border border-slate-800 bg-slate-900 px-3 py-1 text-xs font-medium text-slate-400 transition-colors hover:border-brand-purple/40 hover:text-slate-200"
                >
                  {g}
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* STATS */}
      <section className="border-y border-slate-800 bg-slate-900/50">
        <div className="mx-auto max-w-6xl px-6 py-10">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="font-display text-3xl font-bold text-slate-50">{s.value}</p>
                <p className="mt-1 text-sm text-slate-500">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="mb-16 max-w-xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-cyan">How it works</p>
          <h2 className="mt-3 font-display text-4xl font-bold text-slate-50">
            From inquiry to event
            <br />
            in under 15 minutes.
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <div
              key={step.step}
              className="rounded-lg border border-slate-800 bg-slate-900/60 p-6"
            >
              <p className="font-mono text-sm font-medium text-brand-purple">{step.step}</p>
              <h3 className="mt-3 font-display text-lg font-semibold text-slate-100">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="border-t border-slate-800 bg-slate-900/30">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <div className="mb-16 text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-brand-cyan">Pricing</p>
            <h2 className="mt-3 font-display text-4xl font-bold text-slate-50">
              Plans for every musician
            </h2>
            <p className="mt-3 text-slate-400">No lock-in. Cancel anytime.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={`relative rounded-lg border p-7 ${
                  tier.accent
                    ? "border-brand-purple bg-brand-purple/5"
                    : "border-slate-800 bg-slate-900/60"
                }`}
              >
                {tier.accent && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand-purple px-3 py-0.5 text-xs font-semibold text-white">
                    Most popular
                  </div>
                )}
                <p className="font-display text-lg font-semibold text-slate-100">{tier.name}</p>
                <div className="mt-4 flex items-end gap-1">
                  <span className="font-display text-4xl font-bold text-slate-50">{tier.price}</span>
                  <span className="mb-1 text-sm text-slate-500">{tier.period}</span>
                </div>
                <ul className="mt-6 space-y-2.5">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-slate-400">
                      <svg className="mt-0.5 h-4 w-4 shrink-0 text-brand-cyan" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M13.3 3.7a1 1 0 0 1 0 1.41l-6.6 6.6a1 1 0 0 1-1.41 0l-2.9-2.9a1 1 0 1 1 1.42-1.41L6 9.59l5.9-5.89a1 1 0 0 1 1.4 0Z" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href={tier.href}
                  className={`mt-8 block rounded-md px-4 py-2.5 text-center text-sm font-semibold transition-all duration-200 ${
                    tier.accent
                      ? "bg-brand-purple text-white hover:bg-brand-purple/90"
                      : "border border-slate-700 text-slate-200 hover:border-slate-600 hover:bg-slate-800"
                  }`}
                >
                  {tier.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-slate-800">
        <div className="mx-auto max-w-3xl px-6 py-24 text-center">
          <h2 className="font-display text-4xl font-bold text-slate-50">
            Ready to fill your calendar?
          </h2>
          <p className="mt-4 text-slate-400">
            Join 500+ DJs already booking gigs on DOS2A.
          </p>
          <div className="mt-8 flex justify-center gap-3">
            <Link
              href="/register?role=dj"
              className="inline-flex items-center gap-2 rounded-md bg-brand-purple px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-brand-purple/90"
            >
              Start for free
            </Link>
            <Link
              href="/marketplace/djs"
              className="inline-flex items-center gap-2 rounded-md border border-slate-700 px-6 py-3 text-sm font-semibold text-slate-300 transition-all hover:border-slate-600"
            >
              Browse DJs
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
