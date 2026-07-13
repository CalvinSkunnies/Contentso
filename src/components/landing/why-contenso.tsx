"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronDown, ChevronUp, Lightbulb, Target, Rocket } from "lucide-react"
import { useState, type ReactNode } from "react"

interface FAQ {
  q: string
  a: string
  icon: ReactNode
}

const faqs: FAQ[] = [
  {
    q: "What is Contenso and who is it for?",
    a: "Contenso is a pre-production OS built specifically for short-form video creators who post on Instagram Reels and TikTok. It replaces the chaotic workflow of spreadsheets, random notes, and 10 different tabs with one connected workspace: ideation \u2192 AI hooks \u2192 scripts \u2192 calendar \u2192 pipeline \u2192 analytics. If you create short-form content daily or weekly, Contenso is for you.",
    icon: <Lightbulb className="w-4 h-4 text-[var(--primary)]" />,
  },
  {
    q: "How is Contenso different from just using Google Sheets or Notion?",
    a: "Google Sheets and Notion are general-purpose tools \u2014 they don\u2019t understand content creation workflows. Contenso is purpose-built: it knows the difference between \u2018scripting\u2019 and \u2018filming\u2019 stages, it color-codes by platform (IG vs TikTok), it generates AI hooks optimized for short-form, and it shows you virality predictions. A spreadsheet can track what you posted \u2014 Contenso helps you plan what to post next and predict if it will work.",
    icon: <Target className="w-4 h-4 text-[var(--primary)]" />,
  },
  {
    q: "Does Contenso actually post videos for me?",
    a: "Not yet. Contenso is a pre-production tool \u2014 it handles everything before you hit record: trend research, idea validation, hook writing, script generation, shot planning, and scheduling. Publishing integration is on the roadmap, but our core focus is making your planning phase 10x faster and more strategic.",
    icon: <Rocket className="w-4 h-4 text-[var(--primary)]" />,
  },
  {
    q: "Can I use Contenso if I\u2019m a beginner creator?",
    a: "Absolutely. Contenso is designed for creators at every level. Beginners get AI-generated hooks and scripts so they never stare at a blank page. Advanced creators get the full pipeline, trend radar, and analytics to optimize their content strategy. The free tier is generous enough to plan a full content calendar.",
    icon: <Lightbulb className="w-4 h-4 text-[var(--primary)]" />,
  },
  {
    q: "What platforms are supported?",
    a: "Currently IG Reels and TikTok. YouTube Shorts support is in development and will launch soon. Each platform gets its own script optimization, timing recommendations, and color-coded calendar entries.",
    icon: <Target className="w-4 h-4 text-[var(--primary)]" />,
  },
  {
    q: "Is my content and data private?",
    a: "Yes. Your ideas, scripts, and content plans are yours. We don\u2019t train on your data. All AI processing is done through API calls without storing your content for training. You can delete your account and all associated data at any time.",
    icon: <Rocket className="w-4 h-4 text-[var(--primary)]" />,
  },
]

export function WhyContenso() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="why" className="py-20 md:py-28">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold">
            Frequently Asked{" "}
            <span className="text-gradient">Questions</span>
          </h2>
          <p className="mt-4 text-lg text-[var(--muted)] max-w-2xl mx-auto">
            Everything you need to know about Contenso before you start.
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <Card
                className={`cursor-pointer transition-all duration-300 ${
                  openIndex === i ? "border-[var(--primary)]/30" : "hover:border-[var(--card-border)]"
                }`}
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                <CardHeader className="flex flex-row items-center justify-between py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[var(--primary)]/10 flex items-center justify-center shrink-0">
                      {faq.icon}
                    </div>
                    <CardTitle className="text-base md:text-lg font-medium">{faq.q}</CardTitle>
                  </div>
                  {openIndex === i ? (
                    <ChevronUp className="w-5 h-5 text-[var(--muted)] shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-[var(--muted)] shrink-0" />
                  )}
                </CardHeader>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openIndex === i ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <CardContent className="pt-0 pb-4">
                    <p className="text-[var(--muted)] leading-relaxed">{faq.a}</p>
                  </CardContent>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
