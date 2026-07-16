"use client"

import { forwardRef, type HTMLAttributes } from "react"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { GripVertical, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { PLATFORM_CONFIG, STATUS_CONFIG, type ContentItem } from "@/lib/calendar-types"

interface ContentCardProps extends HTMLAttributes<HTMLDivElement> {
  item: ContentItem
  onDelete?: (id: string) => void
}

export function ContentCard({ item, onDelete, ...props }: ContentCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: item.id,
    data: { type: "content", item, day: item.day },
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  const platformCfg = PLATFORM_CONFIG[item.platform]
  const statusCfg = STATUS_CONFIG[item.status]

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "glass rounded-xl p-3 group cursor-grab active:cursor-grabbing",
        "hover:border-[var(--primary)]/20 transition-all duration-200",
        isDragging && "opacity-30 ring-2 ring-[var(--primary)]"
      )}
      {...attributes}
      {...props}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-start gap-2 flex-1 min-w-0">
          <button
            className="mt-0.5 text-[var(--muted)] hover:text-[var(--foreground)] transition-colors opacity-0 group-hover:opacity-100"
            {...listeners}
            type="button"
            tabIndex={-1}
          >
            <GripVertical className="w-3.5 h-3.5" />
          </button>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium truncate">{item.title}</p>
            {item.notes && (
              <p className="text-xs text-[var(--muted)] truncate mt-0.5">{item.notes}</p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <span className={cn("text-xs font-medium", statusCfg.color)}>
            {statusCfg.label}
          </span>
          {onDelete && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                onDelete(item.id)
              }}
              className="text-[var(--muted)] hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
              type="button"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
      <div className="flex items-center gap-2 mt-2">
        <div className={cn("text-[10px] font-medium px-1.5 py-0.5 rounded-md border", platformCfg.bg)}>
          {platformCfg.label}
        </div>
      </div>
    </div>
  )
}

export function DragOverlayContent({ item }: { item: ContentItem }) {
  const platformCfg = PLATFORM_CONFIG[item.platform]
  const statusCfg = STATUS_CONFIG[item.status]

  return (
    <div className="glass rounded-xl p-3 shadow-glow border-[var(--primary)]/30 rotate-2 w-64">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium truncate">{item.title}</p>
          {item.notes && (
            <p className="text-xs text-[var(--muted)] truncate mt-0.5">{item.notes}</p>
          )}
        </div>
        <span className={cn("text-xs font-medium shrink-0", statusCfg.color)}>
          {statusCfg.label}
        </span>
      </div>
      <div className={cn("text-[10px] font-medium px-1.5 py-0.5 rounded-md border mt-2 w-fit", platformCfg.bg)}>
        {platformCfg.label}
      </div>
    </div>
  )
}
