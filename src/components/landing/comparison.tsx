"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, X, Minus } from "lucide-react"

const comparisons = [
  {
    feature: "AI Hook Generator",
    contenso: true,
    sheets: false,
    notion: false,
    later: true,
    trello: false,
  },
  {
    feature: "AI Script Writer (per platform)",
    contenso: true,
    sheets: false,
    notion: false,
    later: false,
    trello: false,
  },
  {
    feature: "Drag & Drop Calendar",
    contenso: true,
    sheets: "Manual",
    notion: "Partial",
    later: true,
    trello: true,
  },
  {
    feature: "Pipeline Board (Idea → Posted)",
    contenso: true,
    sheets: false,
    notion: "Manual",
    later: false,
    trello: true,
  },
  {
    feature: "Trend Discovery",
    contenso: true,
    sheets: false,
    notion: false,
    later: false,
    trello: false,
  },
  {
    feature: "Platform Color-Coding",
    contenso: true,
    sheets: "Manual",
    notion: "Manual",
    later: true,
    trello: false,
  },
  {
    feature: "Virality Prediction",
    contenso: true,
    sheets: false,
    notion: false,
    later: false,
    trello: false,
  },
  {
    feature: "Teleprompter Mode",
    contenso: true,
    sheets: false,
    notion: false,
    later: false,
    trello: false,
  },
  {
    feature: "Free Tier",
    contenso: true,
    sheets: true,
    notion: true,
    later: true,
    trello: true,
  },
  {
    feature: "Purpose-built for Short-Form",
    contenso: true,
    sheets: false,
    notion: false,
    later: "Generic",
    trello: false,
  },
]

const tools = [
  { id: "contenso", label: "Contenso", highlight: true },
  { id: "sheets", label: "Google Sheets" },
  { id: "notion", label: "Notion" },
  { id: "later", label: "Later" },
  { id: "trello", label: "Trello" },
]

function Cell({ value }: { value: boolean | string }) {
  if (value === true)
    return <Check className="w-5 h-5 text-emerald-500 mx-auto" />
  if (value === false)
    return <X className="w-5 h-5 text-red-500/60 mx-auto" />
  return (
    <span className="text-xs text-[var(--muted)] text-center block">
      {value}
    </span>
  )
}

export function Comparison() {
  return (
    <section id="comparison" className="py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold">
            Contenso vs.{" "}
            <span className="text-gradient">The Alternatives</span>
          </h2>
          <p className="mt-4 text-lg text-[var(--muted)] max-w-2xl mx-auto">
            General tools work, but they weren&apos;t built for content creators.
            See the difference.
          </p>
        </motion.div>

        <div className="overflow-x-auto">
          <Card className="min-w-[700px]">
            <CardContent className="p-0">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[var(--card-border)]">
                    <th className="text-left py-4 px-6 text-sm font-medium text-[var(--muted)] w-[220px]">
                      Feature
                    </th>
                    {tools.map((tool) => (
                      <th
                        key={tool.id}
                        className={`py-4 px-4 text-center text-sm font-semibold ${
                          tool.highlight ? "text-[var(--primary)]" : "text-[var(--muted)]"
                        }`}
                      >
                        <Badge
                          variant={tool.highlight ? "default" : "outline"}
                          className="text-xs"
                        >
                          {tool.label}
                        </Badge>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {comparisons.map((row, i) => (
                    <tr
                      key={row.feature}
                      className={`border-b border-[var(--card-border)] last:border-0 ${
                        i % 2 === 0 ? "bg-[var(--card)]/30" : ""
                      }`}
                    >
                      <td className="py-3.5 px-6 text-sm">{row.feature}</td>
                      {tools.map((tool) => (
                        <td key={tool.id} className="py-3.5 px-4">
                          <Cell value={row[tool.id as keyof typeof row] as boolean | string} />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6 flex items-center justify-center gap-6 text-xs text-[var(--muted)]">
          <span className="flex items-center gap-1">
            <Check className="w-3.5 h-3.5 text-emerald-500" /> Built-in / Native
          </span>
          <span className="flex items-center gap-1">
            <X className="w-3.5 h-3.5 text-red-500/60" /> Not available
          </span>
          <span className="flex items-center gap-1">
            Manual / Partial — requires setup
          </span>
        </div>
      </div>
    </section>
  )
}
