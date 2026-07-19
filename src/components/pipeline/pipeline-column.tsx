"use client"

import { useDroppable } from "@dnd-kit/core"
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { cn } from "@/lib/utils"
import { ContentCard } from "@/components/calendar/content-card"
import type { ContentItem, ContentStatus } from "@/lib/calendar-types"
import { STATUS_CONFIG } from "@/lib/calendar-types"

interface PipelineColumnProps {
  status: ContentStatus
  items: ContentItem[]
  onDelete?: (id: string) => void
  getHasScript?: (id: string) => boolean
  onViewScript?: (id: string) => void
}

export function PipelineColumn({ status, items, onDelete, getHasScript, onViewScript }: PipelineColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: `pipeline-${status}`,
    data: { type: "pipeline", status },
  })

  const cfg = STATUS_CONFIG[status]

  return (
    <div
      className={cn(
        "flex flex-col rounded-2xl border transition-all duration-200 min-w-[220px] w-[220px] shrink-0",
        isOver
          ? "border-[var(--primary)]/40 bg-[var(--primary)]/5"
          : "border-[var(--card-border)]"
      )}
    >
      <div className="px-3 py-2.5 border-b border-[var(--card-border)] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className={cn("w-2 h-2 rounded-full", cfg.color.replace("text-", "bg-"))} />
          <span className="text-xs font-semibold uppercase tracking-wider">{cfg.label}</span>
        </div>
        <span className="text-xs text-[var(--muted)] tabular-nums">{items.length}</span>
      </div>

      <div
        ref={setNodeRef}
        className={cn(
          "flex-1 p-2 space-y-2 transition-colors min-h-[380px]",
          isOver && "bg-[var(--primary)]/5"
        )}
      >
        <SortableContext items={items.map((i) => i.id)} strategy={verticalListSortingStrategy}>
          {items.length === 0 ? (
            <div className="flex items-center justify-center h-20 text-xs text-[var(--muted)]">
              <span className="opacity-50">Drop here</span>
            </div>
          ) : (
            items.map((item) => (
              <ContentCard
                key={item.id}
                item={item}
                onDelete={onDelete}
                hasScript={getHasScript?.(item.id)}
                onViewScript={onViewScript}
              />
            ))
          )}
        </SortableContext>
      </div>
    </div>
  )
}
