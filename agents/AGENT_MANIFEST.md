# DOS2A Agent Architecture

> Autonomous agent system for AI-powered audio, lighting, and AV production.
> Based on Cynthia Design Studio's 12-agent model, adapted for DOS2A's domain.

## Operating Model

```
┌─────────────────────────────────────────────────┐
│  PAPERCLIP — Control Plane                      │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐      │
│  │ Task     │  │ Budget   │  │ Provider │      │
│  │ Router   │  │ Guard    │  │ Router   │      │
│  └──────────┘  └──────────┘  └──────────┘      │
├─────────────────────────────────────────────────┤
│  CHAT LAYER — User Interface                    │
│  ┌──────────────────────────────────────────┐   │
│  │ Chat-First Dashboard                      │  │
│  │ Tools: quote, booking, search, generate   │  │
│  │ Provider: BYOK + OpenRouter fallback      │  │
│  └──────────────────────────────────────────┘   │
├─────────────────────────────────────────────────┤
│  AGENT LAYER — Specialists                      │
│  ┌────────┐┌────────┐┌────────┐┌────────┐      │
│  │ Audio  ││ Light  ││ Video  ││ Design │      │
│  │ Agent  ││ Agent  ││ Agent  ││ Agent  │      │
│  └────────┘└────────┘└────────┘└────────┘      │
│  ┌────────┐┌────────┐┌────────┐┌────────┐      │
│  │ Quote  ││ Course ││ Content││ Review │      │
│  │ Agent  ││ Agent  ││ Agent  ││ Agent  │      │
│  └────────┘└────────┘└────────┘└────────┘      │
├─────────────────────────────────────────────────┤
│  INFRA — Synthia Gateway + SQLite Spend Track   │
│  OpenAI │ Anthropic │ Google │ OpenRouter       │
└─────────────────────────────────────────────────┘
```

## Quality Gate

Every agent output is scored against UDEC 14-axis rubric.
- **Minimum composite**: 8.5 / 10
- **Blocker axes**: Motion (MOT ≥ 7.0), Accessibility (ACC ≥ 7.0)
- **Process**: Karpathy Council — 3 parallel variations → review → synthesize best

## Agent Boundary Rules

### CAN
- Read project files, configs, and user preferences
- Execute design/code/content generation within their domain
- Score outputs against UDEC
- Write to shared memory (append-only)
- Route requests to other agents via Task Router

### CANNOT
- Process payments or move money
- Publish to external platforms without human approval
- Modify doctrine or design laws
- Accept work scoring below 8.5 UDEC floor
- Access user API keys (handled by gateway layer)
