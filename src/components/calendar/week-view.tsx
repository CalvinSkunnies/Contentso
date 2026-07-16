"use client"

import { useState, useCallback, useMemo } from "react"
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragStartEvent,
  type DragEndEvent,
  type DragOverEvent,
} from "@dnd-kit/core"
import { sortableKeyboardCoordinates, arrayMove } from "@dnd-kit/sortable"
import { DayColumn } from "./day-column"
import { AddContentDialog } from "./add-content-dialog"
import { DragOverlayContent } from "./content-card"
import { getWeekDates, generateId, type ContentItem, type Platform, type ContentStatus } from "@/lib/calendar-types"
import { ChevronLeft, ChevronRight } from "lucide-react"

function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
}

export function WeekView() {
  const [weekOffset, setWeekOffset] = useState(0)
  const [items, setItems] = useState<ContentItem[]>([])
  const [activeItem, setActiveItem] = useState<ContentItem | null>(null)
  const [addDialogOpen, setAddDialogOpen] = useState(false)
  const [addDialogDay, setAddDialogDay] = useState<number>(new Date().getDay())

  const today = new Date()
  const referenceDate = useMemo(() => {
    const d = new Date()
    d.setDate(d.getDate() + weekOffset * 7)
    return d
  }, [weekOffset])

  const weekDays = useMemo(() => getWeekDates(referenceDate), [referenceDate])

  const getItemsForDay = useCallback(
    (day: number) =>
      items
        .filter((item) => item.day === day)
        .sort((a, b) => (a.id < b.id ? -1 : 1)),
    [items]
  )

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  )

  const handleDragStart = useCallback(
    (event: DragStartEvent) => {
      const id = event.active.id as string
      const item = items.find((i) => i.id === id)
      if (item) setActiveItem(item)
    },
    [items]
  )

  const handleDragOver = useCallback(
    (event: DragOverEvent) => {
      const { active, over } = event
      if (!over) return

      const activeId = active.id as string
      const overId = over.id as string

      const activeItemData = items.find((i) => i.id === activeId)
      if (!activeItemData) return

      const activeDay = activeItemData.day

      // Check if hovering over a day column
      let targetDay: number | null = null
      if (typeof overId === "string" && overId.startsWith("day-")) {
        targetDay = parseInt(overId.replace("day-", ""), 10)
      } else {
        const overItem = items.find((i) => i.id === overId)
        if (overItem) targetDay = overItem.day
      }

      if (targetDay !== null && targetDay !== activeDay) {
        setItems((prev) =>
          prev.map((item) => (item.id === activeId ? { ...item, day: targetDay! } : item))
        )
      }
    },
    [items]
  )

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      setActiveItem(null)
      const { active, over } = event
      if (!over) return

      const activeId = active.id as string
      const overId = over.id as string

      if (activeId === overId) return

      const activeItemData = items.find((i) => i.id === activeId)
      const overIsDay = typeof overId === "string" && overId.startsWith("day-")
      const overItem = overIsDay ? null : items.find((i) => i.id === overId)

      if (!activeItemData) return

      const day = overItem ? overItem.day : overIsDay ? parseInt(overId.replace("day-", ""), 10) : activeItemData.day

      const dayItems = items.filter((i) => i.day === day)
      const activeIdx = dayItems.findIndex((i) => i.id === activeId)
      const overIdx = overItem ? dayItems.findIndex((i) => i.id === overId) : dayItems.length - 1

      if (activeIdx === -1 || overIdx === -1) return

      const reordered = arrayMove(dayItems, activeIdx, overIdx)

      setItems((prev) => {
        const other = prev.filter((i) => i.day !== day)
        return [
          ...other,
          ...reordered.map((item, idx) => ({
            ...item,
            day,
          })),
        ]
      })
    },
    [items]
  )

  const handleAdd = (day: number, data: { title: string; platform: Platform; status: ContentStatus; notes?: string }) => {
    const newItem: ContentItem = {
      id: generateId(),
      day,
      ...data,
    }
    setItems((prev) => [...prev, newItem])
  }

  const handleDelete = useCallback((id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id))
  }, [])

  const weekLabel = useMemo(() => {
    const start = weekDays[0].date
    const end = weekDays[6].date
    return `${formatDate(start)} – ${formatDate(end)}`
  }, [weekDays])

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setWeekOffset((p) => p - 1)}
            className="w-8 h-8 rounded-xl glass flex items-center justify-center hover:border-[var(--primary)]/30 transition-colors"
            type="button"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <h2 className="text-lg font-semibold min-w-[200px] text-center">{weekLabel}</h2>
          <button
            onClick={() => setWeekOffset((p) => p + 1)}
            className="w-8 h-8 rounded-xl glass flex items-center justify-center hover:border-[var(--primary)]/30 transition-colors"
            type="button"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
          {weekOffset !== 0 && (
            <button
              onClick={() => setWeekOffset(0)}
              className="text-xs text-[var(--primary)] hover:underline ml-2"
              type="button"
            >
              Today
            </button>
          )}
        </div>
        <span className="text-xs text-[var(--muted)]">
          {items.length} item{items.length !== 1 ? "s" : ""} planned
        </span>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div className="grid grid-cols-7 gap-2">
          {weekDays.map((dayData) => {
            const isToday =
              dayData.date.toISOString().split("T")[0] === today.toISOString().split("T")[0]
            return (
              <DayColumn
                key={dayData.day}
                day={dayData.day}
                label={dayData.label}
                dateStr={dayData.date.getDate().toString()}
                items={getItemsForDay(dayData.day)}
                isToday={isToday}
                onAdd={() => {
                  setAddDialogDay(dayData.day)
                  setAddDialogOpen(true)
                }}
                onDelete={handleDelete}
              />
            )
          })}
        </div>

        <DragOverlay>
          {activeItem ? <DragOverlayContent item={activeItem} /> : null}
        </DragOverlay>
      </DndContext>

      <AddContentDialog
        open={addDialogOpen}
        onClose={() => setAddDialogOpen(false)}
        onAdd={(data) => handleAdd(addDialogDay, data)}
      />
    </div>
  )
}
