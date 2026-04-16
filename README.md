# DOS2A

**Audio, Iluminación y Producción Audiovisual — Ciudad de México**

https://dos2a.vercel.app

---

## Stack

| Layer | Tech |
|-------|------|
| Frontend | Next.js 15.3 + React 19 + TypeScript 5 |
| Styling | Tailwind CSS v4 + inline styles |
| Animation | GSAP 3.12.5 |
| Backend | Rust + Axum 0.7 |
| Database | PostgreSQL (Supabase) + SQLx |
| Memory | Upstash Redis |
| AI | Anthropic Claude (Haiku for agents, Sonnet for complex) |
| WhatsApp | Twilio |
| Telegram | Bot API |
| Payments | Stripe Connect |
| Deploy | Frontend → Vercel | Backend → Railway |

## Project Structure

```
dos2a/
├── frontend/          Next.js app → Vercel
│   └── src/
│       ├── app/       App Router pages
│       ├── components/ UI components
│       └── lib/       i18n, API client
├── backend/           Rust Axum API → Railway
│   └── src/
│       ├── api/       Route handlers
│       ├── agents/    AI agents (Claude)
│       └── db/        Models + migrations
└── CLAUDE_CODE_HANDOFF.md  Full build prompt for Claude Code
```

## Local Development

```bash
# Frontend
cd frontend && pnpm install && pnpm dev

# Backend
cd backend && cargo run
```

## Deploy

```bash
# Frontend
cd frontend && npx vercel --prod

# Backend: connect repo to Railway, set env vars, deploy automatically
```

## Environment Variables

See `.env.example` for all required variables.

## Phases

- [x] Phase 1–3: Landing page, lead capture, brand
- [x] Phase 4: Cinematic hero, Rust backend, Claude agents, WhatsApp/Telegram
- [ ] Phase 5: Dashboard (Manus-inspired)
- [ ] Phase 6: DJ Marketplace
- [ ] Phase 7: Voice agent + AI improvements

---

Instagram: [@dos2a](https://www.instagram.com/dos2a/)  
Email: 2audioiluminacion@gmail.com
