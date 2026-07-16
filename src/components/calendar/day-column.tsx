"use client"

import { useDroppable } from "@dnd-kit/core"
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { cn } from "@/lib/utils"
import { ContentCard } from "./content-card"
import { Plus } from "lucide-react"
import type { ContentItem } from "@/lib/calendar-types"

interface DayColumnProps {
  day: number
  label: string
  dateStr: string
  items: ContentItem[]
  isToday: boolean
  onAdd?: () => void
  onDelete?: (id: string) => void
}

export function DayColumn({ day, label, dateStr, items, isToday, onAdd, onDelete }: DayColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: `day-${day}`,
    data: { type: "day", day },
  })

  return (
    <div
      className={cn(
        "flex flex-col rounded-2xl border transition-all duration-200 min-h-[300px]",
        isOver
          ? "border-[var(--primary)]/40 bg-[var(--primary)]/5"
          : "border-[var(--card-border)]",
        isToday && "border-[var(--primary)]/20"
      )}
    >
      <div
        className={cn(
          "px-3 py-2.5 border-b border-[var(--card-border)] flex items-center justify-between",
          isToday && "bg-[var(--primary)]/5"
        )}
      >
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-[var(--muted)] uppercase tracking-wider">
            {label}
          </span>
          <span
            className={cn(
              "text-xs font-mono px-1.5 py-0.5 rounded-md",
              isToday
                ? "bg-[var(--primary)]/10 text-[var(--primary)]"
                : "text-[var(--muted)]"
            )}
          >
            {dateStr}
          </span>
        </div>
        <span className="text-xs text-[var(--muted)] tabular-nums">{items.length}</span>
      </div>

      <div
        ref={setNodeRef}
        className={cn(
          "flex-1 p-2 space-y-2 transition-colors min-h-[200px]",
          isOver && "bg-[var(--primary)]/5"
        )}
      >
        <SortableContext items={items.map((i) => i.id)} strategy={verticalListSortingStrategy}>
          {items.length === 0 ? (
            <div className="flex items-center justify-center h-24 text-xs text-[var(--muted)]">
              <span className="opacity-50">Drop content here</span>
            </div>
          ) : (
            items.map((item) => (
              <ContentCard key={item.id} item={item} onDelete={onDelete} />
            ))
          )}
        </SortableContext>

        {onAdd && (
          <button
            onClick={onAdd}
            className="w-full py-2 rounded-xl border border-dashed border-[var(--card-border)] text-xs text-[var(--muted)] hover:border-[var(--primary)]/30 hover:text-[var(--primary)] transition-all duration-200 flex items-center justify-center gap-1 opacity-0 hover:opacity-100 group-hover:opacity-100"
            type="button"
          >
            <Plus className="w-3 h-3" />
            Add
          </button>
        )}
      </div>
    </div>
  )
}
