import Link from "next/link"

const LINKS = {
  Platform: [
    { href: "/marketplace/djs", label: "Find DJs" },
    { href: "/marketplace/gear", label: "Gear rental" },
    { href: "/collaborate", label: "Collaborate" },
    { href: "/pricing", label: "Pricing" }
  ],
  Account: [
    { href: "/register", label: "Register" },
    { href: "/login", label: "Sign in" },
    { href: "/bookings", label: "My bookings" },
    { href: "/analytics", label: "Analytics" }
  ],
  Legal: [
    { href: "/privacy", label: "Privacy policy" },
    { href: "/terms", label: "Terms of service" }
  ]
}

export function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="font-display text-lg font-bold text-slate-50">
              DOS<span className="text-brand-purple">2A</span>
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-slate-500">
              The musician&apos;s booking & collaboration platform. Book gigs, manage gear, get paid.
            </p>
          </div>

          {Object.entries(LINKS).map(([group, items]) => (
            <div key={group}>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                {group}
              </p>
              <ul className="mt-3 space-y-2">
                {items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-slate-500 hover:text-slate-300 transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 border-t border-slate-800 pt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <p className="text-xs text-slate-600">
            &copy; {new Date().getFullYear()} DOS2A. All rights reserved.
          </p>
          <p className="text-xs text-slate-600">
            Powered by Next.js · Stripe · Anthropic
          </p>
        </div>
      </div>
    </footer>
  )
}
