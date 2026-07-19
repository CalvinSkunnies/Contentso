import type { Platform } from "./calendar-types"

export interface ScriptItem {
  id: string
  title: string
  content: string
  platform: Platform
  linkedContentId?: string
  linkedContentTitle?: string
  createdAt: number
  updatedAt: number
}

export function generateScriptId() {
  return `script_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`
}
