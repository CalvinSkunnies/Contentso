"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Lightbulb, TrendingUp, Target, MessageSquare } from "lucide-react"

interface AnalysisResult {
  hookScore: number
  pacingScore: number
  viralScore: number
  clarityScore: number
  overallScore: number
  suggestions: string[]
}

interface FeedbackPanelProps {
  analysis: AnalysisResult
}

function ScoreRing({ score, label, color }: { score: number; label: string; color: string }) {
  const radius = 24
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (score / 10) * circumference

  return (
    <div className="flex flex-col items-center gap-1">
      <svg width="60" height="60" className="-rotate-90">
        <circle cx="30" cy="30" r={radius} fill="none" stroke="var(--card-border)" strokeWidth="4" />
        <circle
          cx="30"
          cy="30"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="4"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-1000"
        />
        <text x="30" y="30" textAnchor="middle" dominantBaseline="central" className="text-sm font-bold fill-current">
          {score}
        </text>
      </svg>
      <span className="text-xs text-[var(--muted)]">{label}</span>
    </div>
  )
}

export function FeedbackPanel({ analysis }: FeedbackPanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="space-y-6"
    >
      <div className="flex items-center gap-2">
        <Badge variant="secondary" className="text-xs">
          <TrendingUp className="w-3 h-3 mr-1" />
          AI Analysis
        </Badge>
        <Badge
          variant={analysis.overallScore >= 7 ? "success" : analysis.overallScore >= 5 ? "warning" : "default"}
          className="text-xs"
        >
          Overall: {analysis.overallScore}/10
        </Badge>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <ScoreRing score={analysis.hookScore} label="Hook" color="#00f0ff" />
        <ScoreRing score={analysis.pacingScore} label="Pacing" color="#7c3aed" />
        <ScoreRing score={analysis.viralScore} label="Viral" color="#10b981" />
        <ScoreRing score={analysis.clarityScore} label="Clarity" color="#f59e0b" />
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-2 mb-3">
            <Lightbulb className="w-4 h-4 text-[var(--primary)]" />
            <span className="text-sm font-semibold">Improvement Suggestions</span>
          </div>
          <ul className="space-y-2">
            {analysis.suggestions.map((s, i) => (
              <li key={i} className="flex gap-2 text-sm text-[var(--muted)]">
                <Target className="w-4 h-4 text-[var(--primary)] shrink-0 mt-0.5" />
                {s}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <div className="glass rounded-xl p-4 flex items-start gap-3">
        <MessageSquare className="w-4 h-4 text-[var(--primary)] shrink-0 mt-0.5" />
        <p className="text-xs text-[var(--muted)] leading-relaxed">
          Scores are AI-generated estimates based on viral content patterns. Use them as a guideline,
          not a guarantee. Trust your creative instincts.
        </p>
      </div>
    </motion.div>
  )
}
