"use client"

import { useState } from "react"

interface TeamMemberInput {
  userId: string
  role: string
  revenueSplit: number
}

export default function CollaboratePage() {
  const [teamName, setTeamName] = useState("")
  const [description, setDescription] = useState("")
  const [members, setMembers] = useState<TeamMemberInput[]>([
    { userId: "", role: "DJ", revenueSplit: 40 },
    { userId: "", role: "Sound Engineer", revenueSplit: 30 },
    { userId: "", role: "Promoter", revenueSplit: 30 }
  ])
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  const totalSplit = members.reduce((s, m) => s + m.revenueSplit, 0)

  function updateMember(idx: number, field: keyof TeamMemberInput, value: string | number) {
    setMembers((prev) => {
      const next = [...prev]
      next[idx] = { ...next[idx], [field]: value }
      return next
    })
  }

  function addMember() {
    setMembers((prev) => [...prev, { userId: "", role: "", revenueSplit: 0 }])
  }

  function removeMember(idx: number) {
    setMembers((prev) => prev.filter((_, i) => i !== idx))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (totalSplit !== 100) {
      setError(`Revenue splits must total 100%. Currently: ${totalSplit}%`)
      return
    }
    setSaving(true)
    setError("")
    const res = await fetch("/api/agent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "collaboration",
        payload: { name: teamName, description, members }
      })
    })
    setSaving(false)
    if (res.ok) {
      setSuccess(true)
    } else {
      const d = await res.json()
      setError(d.error ?? "Failed to create team")
    }
  }

  if (success) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 text-center">
        <div className="rounded-full mx-auto mb-6 flex h-16 w-16 items-center justify-center bg-green-500/10">
          <svg className="h-8 w-8 text-green-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h1 className="font-display text-2xl font-bold text-slate-50">Team created!</h1>
        <p className="mt-2 text-slate-400">Your collaboration workspace is ready.</p>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-slate-50">Collaborate</h1>
        <p className="mt-2 text-slate-400">Create a team, assign roles, and split revenue automatically.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 space-y-4">
          <h2 className="font-display font-semibold text-slate-100">Team details</h2>
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1.5">Team name</label>
            <input
              required
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              className="w-full rounded-md border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-slate-200 placeholder-slate-500 focus:border-brand-purple focus:outline-none"
              placeholder="e.g. Soundwave Collective"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1.5">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
              className="w-full rounded-md border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-slate-200 placeholder-slate-500 focus:border-brand-purple focus:outline-none resize-none"
              placeholder="What does this team do?"
            />
          </div>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display font-semibold text-slate-100">Team members</h2>
            <span className={`text-sm font-mono ${totalSplit === 100 ? "text-green-400" : "text-amber-400"}`}>
              {totalSplit}% / 100%
            </span>
          </div>

          {members.map((m, idx) => (
            <div key={idx} className="grid gap-3 grid-cols-12 items-start">
              <div className="col-span-4">
                <input
                  value={m.userId}
                  onChange={(e) => updateMember(idx, "userId", e.target.value)}
                  placeholder="User ID"
                  className="w-full rounded-md border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:border-brand-purple focus:outline-none"
                />
              </div>
              <div className="col-span-4">
                <input
                  value={m.role}
                  onChange={(e) => updateMember(idx, "role", e.target.value)}
                  placeholder="Role"
                  className="w-full rounded-md border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:border-brand-purple focus:outline-none"
                />
              </div>
              <div className="col-span-3">
                <div className="relative">
                  <input
                    type="number"
                    min={0}
                    max={100}
                    value={m.revenueSplit}
                    onChange={(e) => updateMember(idx, "revenueSplit", parseInt(e.target.value) || 0)}
                    className="w-full rounded-md border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs text-slate-200 focus:border-brand-purple focus:outline-none"
                  />
                  <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-slate-500">%</span>
                </div>
              </div>
              <div className="col-span-1 flex justify-center pt-1">
                <button
                  type="button"
                  onClick={() => removeMember(idx)}
                  disabled={members.length <= 1}
                  className="text-slate-600 hover:text-red-400 disabled:opacity-30"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2 7h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={addMember}
            className="text-sm text-brand-purple hover:underline"
          >
            + Add member
          </button>
        </div>

        {error && (
          <p className="rounded-md border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-sm text-red-400">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={saving || totalSplit !== 100}
          className="w-full rounded-md bg-brand-purple py-3 text-sm font-semibold text-white transition-all hover:bg-brand-purple/90 disabled:opacity-50"
        >
          {saving ? "Creating team…" : "Create team"}
        </button>
      </form>
    </div>
  )
}
