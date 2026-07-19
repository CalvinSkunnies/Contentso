"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Save, Trash2, Link2, Link2Off } from "lucide-react"
import { PLATFORM_CONFIG, type Platform } from "@/lib/calendar-types"
import type { ScriptItem } from "@/lib/script-types"
import { useApp } from "@/context/app-context"

interface ScriptEditorProps {
  script: ScriptItem | null
  onSave: () => void
  onDelete: (id: string) => void
}

export function ScriptEditor({ script, onSave, onDelete }: ScriptEditorProps) {
  const { updateScript, pipelineItems } = useApp()
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [platform, setPlatform] = useState<Platform>("ig")
  const [linkedContentId, setLinkedContentId] = useState<string | undefined>()

  useEffect(() => {
    if (script) {
      setTitle(script.title)
      setContent(script.content)
      setPlatform(script.platform)
      setLinkedContentId(script.linkedContentId)
    } else {
      setTitle("")
      setContent("")
      setPlatform("ig")
      setLinkedContentId(undefined)
    }
  }, [script])

  const handleSave = () => {
    if (!title.trim() || !content.trim() || !script) return
    updateScript(script.id, {
      title: title.trim(),
      content: content.trim(),
      platform,
      linkedContentId,
      linkedContentTitle: linkedContentId
        ? pipelineItems.find((i) => i.id === linkedContentId)?.title
        : undefined,
    })
    onSave()
  }

  const linkedItem = linkedContentId ? pipelineItems.find((i) => i.id === linkedContentId) : null

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Script title..."
          className="flex-1 h-10 rounded-xl bg-[var(--card)] border border-[var(--card-border)] px-3 text-sm outline-none focus:border-[var(--primary)]/50 transition-colors"
        />
      </div>

      <div className="flex items-center gap-3 mb-4">
        <div className="flex gap-2">
          {(["ig", "tiktok"] as const).map((p) => {
            const cfg = PLATFORM_CONFIG[p]
            return (
              <button
                key={p}
                type="button"
                onClick={() => setPlatform(p)}
                className={`px-3 h-7 rounded-lg text-xs font-medium border transition-all ${
                  platform === p
                    ? "border-[var(--primary)]/30 bg-[var(--primary)]/5 text-[var(--primary)]"
                    : "border-[var(--card-border)] text-[var(--muted)] hover:border-[var(--card-border)]/50"
                }`}
              >
                {cfg.label}
              </button>
            )
          })}
        </div>

        <div className="flex-1" />

        {script && (
          <Button variant="ghost" size="sm" onClick={() => onDelete(script.id)}>
            <Trash2 className="w-4 h-4 text-red-400" />
          </Button>
        )}

        <Button size="sm" onClick={handleSave} disabled={!title.trim() || !content.trim() || !script}>
          <Save className="w-4 h-4 mr-1.5" />
          Save
        </Button>
      </div>

      <div className="mb-4">
        <label className="block text-xs font-medium text-[var(--muted)] mb-1.5">
          Link to Pipeline Content <span className="text-[var(--muted)]/50">(optional)</span>
        </label>
        <div className="flex items-center gap-2">
          <select
            value={linkedContentId || ""}
            onChange={(e) => setLinkedContentId(e.target.value || undefined)}
            className="flex-1 h-9 rounded-xl bg-[var(--card)] border border-[var(--card-border)] px-2.5 text-xs outline-none focus:border-[var(--primary)]/50 transition-colors"
          >
            <option value="">Not linked</option>
            {pipelineItems.map((item) => (
              <option key={item.id} value={item.id}>
                {item.title} ({PLATFORM_CONFIG[item.platform].label})
              </option>
            ))}
          </select>
          {linkedContentId ? (
            <span className="flex items-center gap-1 text-xs text-[var(--primary)]">
              <Link2 className="w-3 h-3" />
              Linked
            </span>
          ) : (
            <span className="flex items-center gap-1 text-xs text-[var(--muted)]">
              <Link2Off className="w-3 h-3" />
              Not linked
            </span>
          )}
        </div>
        {linkedItem && (
          <p className="text-xs text-[var(--muted)] mt-1">
            Linked to: {linkedItem.title}
          </p>
        )}
      </div>

      <div className="flex-1">
        <label className="block text-xs font-medium text-[var(--muted)] mb-1.5">
          Script Content
        </label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your script here..."
          className="w-full h-[calc(100%-24px)] rounded-xl bg-[var(--card)] border border-[var(--card-border)] px-3 py-2 text-sm outline-none focus:border-[var(--primary)]/50 transition-colors resize-none font-mono"
        />
      </div>
    </div>
  )
}
