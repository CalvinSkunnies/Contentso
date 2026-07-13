"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"

export function CTASection() {
  return (
    <section className="py-20 md:py-28">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="glass rounded-3xl p-10 md:p-16 glow-border"
        >
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] flex items-center justify-center mx-auto mb-6">
            <Sparkles className="w-8 h-8 text-white" />
          </div>

          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Ready to plan your{" "}
            <span className="text-gradient">best content?</span>
          </h2>
          <p className="text-lg text-[var(--muted)] max-w-xl mx-auto mb-8">
            Join creators who are shipping consistent, high-performing content.
            Start planning in 30 seconds — free forever.
          </p>

          <Link href="/auth/signin">
            <Button size="lg" className="text-base glow-border">
              Start Creating Free
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>

          <p className="mt-4 text-xs text-[var(--muted)]">
            No credit card required. Free tier includes calendar, AI scripts, and pipeline.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
