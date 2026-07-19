"use client"

import { cn } from "@/lib/utils"
import { type ScriptItem } from "@/lib/script-types"
import { PLATFORM_CONFIG } from "@/lib/calendar-types"
import { FileText, Plus, ScrollText } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ScriptListProps {
  scripts: ScriptItem[]
  selectedId: string | null
  onSelect: (id: string) => void
  onNew: () => void
}

export function ScriptList({ scripts, selectedId, onSelect, onNew }: ScriptListProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
          Scripts ({scripts.length})
        </h3>
        <Button size="sm" variant="outline" onClick={onNew}>
          <Plus className="w-4 h-4 mr-1" />
          New
        </Button>
      </div>

      <div className="flex-1 space-y-1 overflow-y-auto">
        {scripts.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-32 text-xs text-[var(--muted)]">
            <FileText className="w-8 h-8 mb-2 opacity-30" />
            <span className="opacity-50">No scripts yet</span>
          </div>
        ) : (
          scripts.map((script) => {
            const cfg = PLATFORM_CONFIG[script.platform]
            return (
              <button
                key={script.id}
                onClick={() => onSelect(script.id)}
                className={cn(
                  "w-full text-left p-3 rounded-xl border transition-all",
                  selectedId === script.id
                    ? "border-[var(--primary)]/30 bg-[var(--primary)]/5"
                    : "border-[var(--card-border)] hover:border-[var(--card-border)]/50"
                )}
                type="button"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium truncate">{script.title}</p>
                    <p className="text-xs text-[var(--muted)] truncate mt-0.5">
                      {script.content.slice(0, 50)}{script.content.length > 50 ? "..." : ""}
                    </p>
                  </div>
                  {script.linkedContentId && (
                    <ScrollText className="w-3.5 h-3.5 text-[var(--secondary)] shrink-0 mt-0.5" />
                  )}
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <div className={cn("text-[10px] font-medium px-1.5 py-0.5 rounded-md border", cfg.bg)}>
                    {cfg.label}
                  </div>
                  <span className="text-[10px] text-[var(--muted)]">
                    {new Date(script.updatedAt).toLocaleDateString()}
                  </span>
                </div>
              </button>
            )
          })
        )}
      </div>
    </div>
  )
}
