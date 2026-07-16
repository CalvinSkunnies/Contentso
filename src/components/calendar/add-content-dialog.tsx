"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { X, Sparkles } from "lucide-react"
import { PLATFORM_CONFIG, type Platform, type ContentStatus, STATUS_CONFIG } from "@/lib/calendar-types"

interface AddContentDialogProps {
  open: boolean
  onClose: () => void
  onAdd: (data: { title: string; platform: Platform; status: ContentStatus; notes?: string }) => void
}

const statuses: { value: ContentStatus; label: string }[] = [
  { value: "idea", label: "Idea" },
  { value: "scripted", label: "Scripted" },
  { value: "filmed", label: "Filmed" },
  { value: "editing", label: "Editing" },
  { value: "scheduled", label: "Scheduled" },
]

export function AddContentDialog({ open, onClose, onAdd }: AddContentDialogProps) {
  const [title, setTitle] = useState("")
  const [platform, setPlatform] = useState<Platform>("ig")
  const [status, setStatus] = useState<ContentStatus>("idea")
  const [notes, setNotes] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return
    onAdd({ title: title.trim(), platform, status, notes: notes.trim() || undefined })
    setTitle("")
    setNotes("")
    setPlatform("ig")
    setStatus("idea")
    onClose()
  }

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="relative glass rounded-2xl p-6 w-full max-w-md mx-4 shadow-glow"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
              type="button"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <h2 className="text-lg font-bold">New Content</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-[var(--muted)] mb-1.5">
                  Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Morning routine tips"
                  autoFocus
                  className="w-full h-10 rounded-xl bg-[var(--card)] border border-[var(--card-border)] px-3 text-sm outline-none focus:border-[var(--primary)]/50 transition-colors"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-[var(--muted)] mb-1.5">
                    Platform
                  </label>
                  <div className="flex gap-2">
                    {(["ig", "tiktok"] as const).map((p) => {
                      const cfg = PLATFORM_CONFIG[p]
                      return (
                        <button
                          key={p}
                          type="button"
                          onClick={() => setPlatform(p)}
                          className={`flex-1 h-9 rounded-xl text-xs font-medium border transition-all ${
                            platform === p
                              ? `border-[var(--primary)]/30 bg-[var(--primary)]/5 text-[var(--primary)]`
                              : "border-[var(--card-border)] text-[var(--muted)] hover:border-[var(--card-border)]/50"
                          }`}
                        >
                          {cfg.label}
                        </button>
                      )
                    })}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[var(--muted)] mb-1.5">
                    Status
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as ContentStatus)}
                    className="w-full h-9 rounded-xl bg-[var(--card)] border border-[var(--card-border)] px-2.5 text-xs outline-none focus:border-[var(--primary)]/50 transition-colors"
                  >
                    {statuses.map((s) => (
                      <option key={s.value} value={s.value}>{s.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[var(--muted)] mb-1.5">
                  Notes <span className="text-[var(--muted)]/50">(optional)</span>
                </label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Hook idea, sound reference..."
                  className="w-full h-10 rounded-xl bg-[var(--card)] border border-[var(--card-border)] px-3 text-sm outline-none focus:border-[var(--primary)]/50 transition-colors"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <Button type="button" variant="ghost" className="flex-1" onClick={onClose}>
                  Cancel
                </Button>
                <Button type="submit" className="flex-1" disabled={!title.trim()}>
                  Add to Calendar
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
