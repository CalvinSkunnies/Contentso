"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"
import { generateId, type ContentItem, type Platform, type ContentStatus } from "@/lib/calendar-types"
import { type ScriptItem, generateScriptId } from "@/lib/script-types"

interface AppContextType {
  pipelineItems: ContentItem[]
  addPipelineItem: (data: { title: string; platform: Platform; status: ContentStatus; content?: string; media?: string; notes?: string }) => void
  updatePipelineItem: (id: string, updates: Partial<ContentItem>) => void
  deletePipelineItem: (id: string) => void
  setPipelineItems: (updater: ContentItem[] | ((prev: ContentItem[]) => ContentItem[])) => void

  scripts: ScriptItem[]
  addScript: (data: { title: string; content: string; platform: Platform; linkedContentId?: string; linkedContentTitle?: string }) => string
  updateScript: (id: string, updates: Partial<ScriptItem>) => void
  deleteScript: (id: string) => void
  getLinkedScript: (contentId: string) => ScriptItem | undefined
}

const AppContext = createContext<AppContextType | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const [pipelineItems, setPipelineItemsState] = useState<ContentItem[]>([])
  const [scripts, setScripts] = useState<ScriptItem[]>([])

  const setPipelineItems = useCallback((updater: ContentItem[] | ((prev: ContentItem[]) => ContentItem[])) => {
    setPipelineItemsState(updater)
  }, [])

  const addPipelineItem = useCallback((data: { title: string; platform: Platform; status: ContentStatus; content?: string; media?: string; notes?: string }) => {
    const newItem: ContentItem = {
      id: generateId(),
      day: new Date().getDay(),
      ...data,
    }
    setPipelineItemsState((prev) => [...prev, newItem])
  }, [])

  const updatePipelineItem = useCallback((id: string, updates: Partial<ContentItem>) => {
    setPipelineItemsState((prev) => prev.map((item) => (item.id === id ? { ...item, ...updates } : item)))
  }, [])

  const deletePipelineItem = useCallback((id: string) => {
    setPipelineItemsState((prev) => prev.filter((item) => item.id !== id))
    setScripts((prev) => prev.map((s) => (s.linkedContentId === id ? { ...s, linkedContentId: undefined, linkedContentTitle: undefined } : s)))
  }, [])

  const addScript = useCallback((data: { title: string; content: string; platform: Platform; linkedContentId?: string; linkedContentTitle?: string }) => {
    const now = Date.now()
    const id = generateScriptId()
    const newScript: ScriptItem = {
      id,
      ...data,
      createdAt: now,
      updatedAt: now,
    }
    setScripts((prev) => [...prev, newScript])
    return id
  }, [])

  const updateScript = useCallback((id: string, updates: Partial<ScriptItem>) => {
    setScripts((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...updates, updatedAt: Date.now() } : s))
    )
  }, [])

  const deleteScript = useCallback((id: string) => {
    setScripts((prev) => prev.filter((s) => s.id !== id))
  }, [])

  const getLinkedScript = useCallback(
    (contentId: string) => scripts.find((s) => s.linkedContentId === contentId),
    [scripts]
  )

  return (
    <AppContext.Provider
      value={{
        pipelineItems,
        addPipelineItem,
        updatePipelineItem,
        deletePipelineItem,
        setPipelineItems,
        scripts,
        addScript,
        updateScript,
        deleteScript,
        getLinkedScript,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error("useApp must be used within AppProvider")
  return ctx
}
