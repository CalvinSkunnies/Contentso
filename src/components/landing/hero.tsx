"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Sparkles } from "lucide-react"

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Badge variant="default" className="mb-6 px-4 py-1.5 text-sm">
            <Sparkles className="w-3.5 h-3.5 mr-1.5" />
            Pre-production OS for short-form creators
          </Badge>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight leading-tight"
        >
          Plan. Script.
          <br />
          <span className="text-gradient">Go Viral.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-[var(--muted)]"
        >
          The only workspace that connects trend discovery &rarr; ideas &rarr; AI hooks &rarr; scripts &rarr; calendar &rarr; analytics.
          Built for IG Reels and TikTok creators who ship daily.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href="/auth/signin">
            <Button size="lg" className="glow-border text-base">
              Start Creating Free
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
          <a href="#features">
            <Button variant="outline" size="lg" className="text-base">
              See Features
            </Button>
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto"
        >
          {[
            { label: "AI Scripts", value: "10x faster" },
            { label: "Content Pipeline", value: "6 stages" },
            { label: "Platforms", value: "IG + TikTok" },
            { label: "Cost", value: "Free tier" },
          ].map((stat) => (
            <div key={stat.label} className="glass rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-gradient">{stat.value}</div>
              <div className="text-xs text-[var(--muted)] mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
