"use client"

import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import { motion } from "framer-motion"
import { PipelineBoard } from "@/components/pipeline/pipeline-board"
import { BackButton } from "@/components/back-button"
import { KanbanSquare } from "lucide-react"

export default function PipelinePage() {
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
        <BackButton />
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center">
            <KanbanSquare className="w-4 h-4 text-white" />
          </div>
          <h1 className="text-2xl font-bold">Pipeline Board</h1>
        </div>
        <p className="text-sm text-[var(--muted)]">
          Track content from idea to posted. Drag cards between stages.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <PipelineBoard />
      </motion.div>
    </div>
  )
}
