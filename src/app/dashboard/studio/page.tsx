"use client"

import { useState, useMemo, useEffect } from "react"
import { useSession } from "next-auth/react"
import { redirect, useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { BackButton } from "@/components/back-button"
import { ScriptList } from "@/components/studio/script-list"
import { ScriptEditor } from "@/components/studio/script-editor"
import { useApp } from "@/context/app-context"
import { FileText } from "lucide-react"

export default function StudioPage() {
  const { data: session, status } = useSession()
  const searchParams = useSearchParams()
  const { scripts, addScript, deleteScript } = useApp()
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const selectedScript = useMemo(
    () => scripts.find((s) => s.id === selectedId) || null,
    [scripts, selectedId]
  )

  useEffect(() => {
    const scriptParam = searchParams.get("script")
    if (scriptParam && scripts.some((s) => s.id === scriptParam)) {
      setSelectedId(scriptParam)
    }
  }, [searchParams, scripts])

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

  const handleNew = () => {
    const id = addScript({
      title: "Untitled Script",
      content: "",
      platform: "ig",
    })
    setSelectedId(id)
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
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[var(--secondary)] to-pink-500 flex items-center justify-center">
            <FileText className="w-4 h-4 text-white" />
          </div>
          <h1 className="text-2xl font-bold">Script Studio</h1>
        </div>
        <p className="text-sm text-[var(--muted)]">
          Write and manage your scripts. Link them to pipeline content.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex gap-4 h-[600px]"
      >
        <div className="w-72 shrink-0 glass rounded-2xl p-4 border border-[var(--card-border)]">
          <ScriptList
            scripts={scripts}
            selectedId={selectedId}
            onSelect={setSelectedId}
            onNew={handleNew}
          />
        </div>

        <div className="flex-1 glass rounded-2xl p-6 border border-[var(--card-border)]">
          {selectedScript ? (
            <ScriptEditor
              key={selectedScript.id}
              script={selectedScript}
              onSave={() => {}}
              onDelete={(id) => {
                if (selectedId === id) setSelectedId(null)
                deleteScript(id)
              }}
            />
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-[var(--muted)]">
              <FileText className="w-12 h-12 mb-3 opacity-30" />
              <p className="text-sm font-medium">Select or create a script</p>
              <p className="text-xs mt-1 opacity-50">Choose a script from the list or create a new one</p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  )
}
