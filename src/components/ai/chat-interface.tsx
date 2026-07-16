"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Send, Bot, User, Terminal, Sparkles, Loader2 } from "lucide-react"
import type { PromptType } from "@/lib/prompts"

interface Message {
  role: "user" | "assistant"
  content: string
}

const quickActions: { label: string; type: PromptType; prompt: string }[] = [
  { label: "Generate Hooks", type: "hookGenerator", prompt: "Give me 5 viral hooks for fitness content" },
  { label: "Write Script", type: "scriptWriter", prompt: "Write a 30-second Reel script about morning routine tips" },
  { label: "Brainstorm Ideas", type: "ideaGenerator", prompt: "Give me 5 video ideas for a tech review channel" },
  { label: "Content Advice", type: "contentCoach", prompt: "How do I increase my engagement rate?" },
]

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Welcome to **AI Terminal**.\n\nI can help you generate hooks, write scripts, brainstorm ideas, or give content advice. Try one of the quick actions below or type anything!",
    },
  ])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [activeType, setActiveType] = useState<PromptType | undefined>()
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const sendMessage = async (content: string, type?: PromptType) => {
    if (!content.trim() || loading) return

    setMessages((prev) => [...prev, { role: "user", content }])
    setInput("")
    setLoading(true)

    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: content,
          type: type || activeType,
          history: messages.slice(1).map((m) => ({
            role: m.role === "assistant" ? "model" : "user",
            content: m.content,
          })),
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: `**Error:** ${data.error}` },
        ])
      } else {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.response },
        ])
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "**Error:** Network error. Please try again." },
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-2 mb-4">
        <Badge variant="default" className="text-xs">
          <Terminal className="w-3 h-3 mr-1" />
          AI Terminal
        </Badge>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 pr-2 scrollbar-thin">
        <AnimatePresence initial={false}>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              {msg.role === "assistant" && (
                <div className="w-8 h-8 rounded-xl bg-[var(--primary)]/10 flex items-center justify-center shrink-0 mt-1">
                  <Bot className="w-4 h-4 text-[var(--primary)]" />
                </div>
              )}
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                  msg.role === "user"
                    ? "bg-[var(--primary)]/10 border border-[var(--primary)]/20"
                    : "glass"
                }`}
              >
                <p className="text-sm whitespace-pre-wrap leading-relaxed">
                  {msg.content}
                </p>
              </div>
              {msg.role === "user" && (
                <div className="w-8 h-8 rounded-xl bg-[var(--secondary)]/10 flex items-center justify-center shrink-0 mt-1">
                  <User className="w-4 h-4 text-[var(--secondary)]" />
                </div>
              )}
            </motion.div>
          ))}
          {loading && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-3"
            >
              <div className="w-8 h-8 rounded-xl bg-[var(--primary)]/10 flex items-center justify-center">
                <Bot className="w-4 h-4 text-[var(--primary)]" />
              </div>
              <div className="glass rounded-2xl px-4 py-3 flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin text-[var(--primary)]" />
                <span className="text-sm text-[var(--muted)]">Thinking...</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={bottomRef} />
      </div>

      {messages.length === 1 && (
        <div className="grid grid-cols-2 gap-2 my-4">
          {quickActions.map((action) => (
            <button
              key={action.label}
              onClick={() => {
                setActiveType(action.type)
                sendMessage(action.prompt, action.type)
              }}
              disabled={loading}
              className="glass rounded-xl p-3 text-left text-sm hover:border-[var(--primary)]/30 transition-all duration-200 disabled:opacity-50"
            >
              <div className="flex items-center gap-1.5 mb-1">
                <Sparkles className="w-3.5 h-3.5 text-[var(--primary)]" />
                <span className="font-medium">{action.label}</span>
              </div>
              <p className="text-xs text-[var(--muted)] truncate">{action.prompt}</p>
            </button>
          ))}
        </div>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault()
          sendMessage(input)
        }}
        className="flex gap-2 pt-4 border-t border-[var(--card-border)]"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask anything about your content..."
          disabled={loading}
          className="flex-1 h-11 rounded-xl bg-[var(--card)] border border-[var(--card-border)] px-4 text-sm outline-none focus:border-[var(--primary)]/50 transition-colors disabled:opacity-50"
        />
        <Button type="submit" size="icon" disabled={loading || !input.trim()}>
          <Send className="w-4 h-4" />
        </Button>
      </form>
    </div>
  )
}
