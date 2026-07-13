"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarDays, FileText, KanbanSquare, TrendingUp, Sparkles, Clock } from "lucide-react"

const features = [
  {
    icon: CalendarDays,
    title: "Drag & Drop Calendar",
    description: "Plan your week or month visually. Color-coded by platform — pink for Reels, teal for TikTok.",
  },
  {
    icon: FileText,
    title: "AI Script Studio",
    description: "Generate hooks and full scripts per platform. Timing guide, beat structure, teleprompter mode included.",
  },
  {
    icon: KanbanSquare,
    title: "Pipeline Board",
    description: "Kanban from Idea → Scripted → Filmed → Editing → Scheduled → Posted. Never drop a ball.",
  },
  {
    icon: TrendingUp,
    title: "Trend Radar",
    description: "Discover trending sounds, hooks, and formats in your niche before they blow up.",
  },
  {
    icon: Sparkles,
    title: "Ideas Board",
    description: "Pinterest-style moodboard to dump ideas, save trending references, and organize by theme.",
  },
  {
    icon: Clock,
    title: "Analytics & Streaks",
    description: "Track virality scores, best posting times, and build a daily creation streak.",
  },
]

export function Features() {
  return (
    <section id="features" className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold">
            Everything you need to{" "}
            <span className="text-gradient">ship consistently</span>
          </h2>
          <p className="mt-4 text-lg text-[var(--muted)] max-w-2xl mx-auto">
            No more spreadsheets, scattered notes, and forgotten ideas.
            Contenso is your creator cockpit.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="glass-hover h-full">
                <CardHeader>
                  <div className="w-10 h-10 rounded-xl bg-[var(--primary)]/10 flex items-center justify-center mb-2">
                    <feature.icon className="w-5 h-5 text-[var(--primary)]" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                  <CardDescription className="text-sm mt-2 leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
