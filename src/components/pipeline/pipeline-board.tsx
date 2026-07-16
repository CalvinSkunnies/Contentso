"use client"

import { useState, useCallback } from "react"
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
} from "@dnd-kit/core"
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable"
import { PipelineColumn } from "./pipeline-column"
import { AddContentDialog } from "@/components/calendar/add-content-dialog"
import { DragOverlayContent } from "@/components/calendar/content-card"
import { generateId, type ContentItem, type Platform, type ContentStatus, STATUS_CONFIG } from "@/lib/calendar-types"
import { cn } from "@/lib/utils"

const PIPELINE_STATUSES: ContentStatus[] = ["idea", "scripted", "filmed", "editing", "scheduled", "posted"]

export function PipelineBoard() {
  const [items, setItems] = useState<ContentItem[]>([])
  const [activeItem, setActiveItem] = useState<ContentItem | null>(null)
  const [addDialogOpen, setAddDialogOpen] = useState(false)
  const [addDialogStatus, setAddDialogStatus] = useState<ContentStatus>("idea")

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

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      setActiveItem(null)
      const { active, over } = event
      if (!over) return

      const activeId = active.id as string
      const overId = over.id as string

      if (activeId === overId) return

      const activeItemData = items.find((i) => i.id === activeId)
      if (!activeItemData) return

      let targetStatus: ContentStatus | null = null

      if (typeof overId === "string" && overId.startsWith("pipeline-")) {
        targetStatus = overId.replace("pipeline-", "") as ContentStatus
      } else {
        const overItem = items.find((i) => i.id === overId)
        if (overItem) targetStatus = overItem.status
      }

      if (targetStatus && targetStatus !== activeItemData.status) {
        setItems((prev) =>
          prev.map((item) =>
            item.id === activeId ? { ...item, status: targetStatus! } : item
          )
        )
      }
    },
    [items]
  )

  const handleAdd = (data: { title: string; platform: Platform; status: ContentStatus; content?: string; media?: string; notes?: string }) => {
    const newItem: ContentItem = {
      id: generateId(),
      day: new Date().getDay(),
      ...data,
    }
    setItems((prev) => [...prev, newItem])
  }

  const handleDelete = useCallback((id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id))
  }, [])

  return (
    <div>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="flex gap-3 overflow-x-auto pb-4">
          {PIPELINE_STATUSES.map((status) => {
            const statusItems = items
              .filter((item) => item.status === status)
              .sort((a, b) => (a.id < b.id ? -1 : 1))
            return (
              <PipelineColumn
                key={status}
                status={status}
                items={statusItems}
                onAdd={() => {
                  setAddDialogStatus(status)
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
        onAdd={(data) => handleAdd({ ...data, status: addDialogStatus })}
      />
    </div>
  )
}
