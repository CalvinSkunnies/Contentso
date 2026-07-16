"use client"

import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import { motion } from "framer-motion"
import { WeekView } from "@/components/calendar/week-view"
import { CalendarDays } from "lucide-react"

export default function CalendarPage() {
  const { data: session, status } = useSession()

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[var(--primary)] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!session) {
    redirect("/auth/signin")
  }

  return (
    <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-pink-500 to-cyan-500 flex items-center justify-center">
            <CalendarDays className="w-4 h-4 text-white" />
          </div>
          <h1 className="text-2xl font-bold">Content Calendar</h1>
        </div>
        <p className="text-sm text-[var(--muted)]">
          Plan your week. Drag & drop content between days.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <WeekView />
      </motion.div>
    </div>
  )
}
