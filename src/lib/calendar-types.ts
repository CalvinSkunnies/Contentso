export type Platform = "ig" | "tiktok"
export type ContentStatus = "idea" | "scripted" | "filmed" | "editing" | "scheduled" | "posted"

export interface ContentItem {
  id: string
  title: string
  platform: Platform
  status: ContentStatus
  day: number
  content?: string
  media?: string
  notes?: string
}

export interface DayData {
  day: number
  label: string
  shortLabel: string
  date: Date
  items: ContentItem[]
}

export const DAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
export const DAY_LABELS_FULL = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

export const PLATFORM_CONFIG = {
  ig: { label: "Reels", color: "from-pink-500 to-purple-500", bg: "bg-pink-500/10 text-pink-500 border-pink-500/20" },
  tiktok: { label: "TikTok", color: "from-teal-400 to-cyan-500", bg: "bg-teal-500/10 text-teal-500 border-teal-500/20" },
} as const

export const STATUS_CONFIG: Record<ContentStatus, { label: string; color: string }> = {
  idea: { label: "Idea", color: "text-gray-400" },
  scripted: { label: "Scripted", color: "text-blue-400" },
  filmed: { label: "Filmed", color: "text-yellow-400" },
  editing: { label: "Editing", color: "text-orange-400" },
  scheduled: { label: "Scheduled", color: "text-green-400" },
  posted: { label: "Posted", color: "text-emerald-400" },
}

export function getWeekDates(referenceDate?: Date) {
  const now = referenceDate || new Date()
  const day = now.getDay()
  const diff = now.getDate() - day
  const start = new Date(now)
  start.setDate(diff)
  start.setHours(0, 0, 0, 0)

  return Array.from({ length: 7 }, (_, i) => {
    const date = new Date(start)
    date.setDate(start.getDate() + i)
    return {
      day: i,
      label: DAY_LABELS[i],
      shortLabel: DAY_LABELS[i].slice(0, 2),
      date,
      dateStr: date.toISOString().split("T")[0],
    }
  })
}

export function generateId() {
  return `content_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`
}
