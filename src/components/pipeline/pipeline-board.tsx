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
import { type ContentItem, type Platform, type ContentStatus } from "@/lib/calendar-types"
import { Button } from "@/components/ui/button"
import { Plus, FileText } from "lucide-react"
import { useApp } from "@/context/app-context"
import Link from "next/link"

const PIPELINE_STATUSES: ContentStatus[] = ["idea", "scripted", "filmed", "editing", "scheduled", "posted"]

export function PipelineBoard() {
  const { pipelineItems, addPipelineItem, deletePipelineItem, setPipelineItems, scripts } = useApp()
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
      const item = pipelineItems.find((i) => i.id === id)
      if (item) setActiveItem(item)
    },
    [pipelineItems]
  )

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      setActiveItem(null)
      const { active, over } = event
      if (!over) return

      const activeId = active.id as string
      const overId = over.id as string

      if (activeId === overId) return

      const activeItemData = pipelineItems.find((i) => i.id === activeId)
      if (!activeItemData) return

      let targetStatus: ContentStatus | null = null

      if (typeof overId === "string" && overId.startsWith("pipeline-")) {
        targetStatus = overId.replace("pipeline-", "") as ContentStatus
      } else {
        const overItem = pipelineItems.find((i) => i.id === overId)
        if (overItem) targetStatus = overItem.status
      }

      if (targetStatus && targetStatus !== activeItemData.status) {
        setPipelineItems((prev) =>
          prev.map((item) =>
            item.id === activeId ? { ...item, status: targetStatus! } : item
          )
        )
      }
    },
    [pipelineItems, setPipelineItems]
  )

  const linkedScriptCount = scripts.filter((s) => s.linkedContentId).length
  const getHasScript = useCallback((id: string) => scripts.some((s) => s.linkedContentId === id), [scripts])

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <span className="text-xs text-[var(--muted)]">
            {pipelineItems.length} item{pipelineItems.length !== 1 ? "s" : ""} in pipeline
          </span>
          {linkedScriptCount > 0 && (
            <Link
              href="/dashboard/studio"
              className="text-xs text-[var(--secondary)] hover:underline flex items-center gap-1"
            >
              <FileText className="w-3 h-3" />
              {linkedScriptCount} script{linkedScriptCount !== 1 ? "s" : ""} linked
            </Link>
          )}
        </div>
        <Button
          size="sm"
          onClick={() => {
            setAddDialogStatus("idea")
            setAddDialogOpen(true)
          }}
        >
          <Plus className="w-4 h-4 mr-1.5" />
          Add Content
        </Button>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="flex gap-3 overflow-x-auto pb-4">
          {PIPELINE_STATUSES.map((status) => {
            const statusItems = pipelineItems
              .filter((item) => item.status === status)
              .sort((a, b) => (a.id < b.id ? -1 : 1))
            return (
              <PipelineColumn
                key={status}
                status={status}
                items={statusItems}
                onDelete={deletePipelineItem}
                getHasScript={getHasScript}
                onViewScript={(id) => {
                  const script = scripts.find((s) => s.linkedContentId === id)
                  if (script) window.open(`/dashboard/studio?script=${script.id}`, "_self")
                }}
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
        onAdd={(data) => addPipelineItem({ ...data, status: addDialogStatus })}
      />
    </div>
  )
}
