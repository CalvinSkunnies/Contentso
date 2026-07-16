"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { X, Sparkles } from "lucide-react"
import { PLATFORM_CONFIG, type Platform, type ContentStatus, STATUS_CONFIG } from "@/lib/calendar-types"

interface AddContentDialogProps {
  open: boolean
  onClose: () => void
  onAdd: (data: { title: string; platform: Platform; status: ContentStatus; content?: string; media?: string; notes?: string }) => void
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
  const [content, setContent] = useState("")
  const [media, setMedia] = useState("")
  const [notes, setNotes] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return
    onAdd({
      title: title.trim(),
      platform,
      status,
      content: content.trim() || undefined,
      media: media.trim() || undefined,
      notes: notes.trim() || undefined,
    })
    setTitle("")
    setContent("")
    setMedia("")
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
            className="relative glass rounded-2xl p-6 w-full max-w-lg mx-4 shadow-glow"
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
                  <div className="flex flex-wrap gap-1.5">
                    {statuses.map((s) => (
                      <button
                        key={s.value}
                        type="button"
                        onClick={() => setStatus(s.value)}
                        className={`px-2.5 h-7 rounded-lg text-[11px] font-medium border transition-all ${
                          status === s.value
                            ? "border-[var(--primary)]/30 bg-[var(--primary)]/5 text-[var(--primary)]"
                            : "border-[var(--card-border)] text-[var(--muted)] hover:border-[var(--card-border)]/50"
                        }`}
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[var(--muted)] mb-1.5">
                  Content <span className="text-[var(--muted)]/50">(optional)</span>
                </label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Script, hook, or description..."
                  rows={3}
                  className="w-full rounded-xl bg-[var(--card)] border border-[var(--card-border)] px-3 py-2 text-sm outline-none focus:border-[var(--primary)]/50 transition-colors resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[var(--muted)] mb-1.5">
                  Media <span className="text-[var(--muted)]/50">(optional)</span>
                </label>
                <input
                  type="text"
                  value={media}
                  onChange={(e) => setMedia(e.target.value)}
                  placeholder="Media URL or file reference..."
                  className="w-full h-10 rounded-xl bg-[var(--card)] border border-[var(--card-border)] px-3 text-sm outline-none focus:border-[var(--primary)]/50 transition-colors"
                />
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
                  Add Content
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
