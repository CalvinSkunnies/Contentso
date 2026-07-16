"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export function BackButton() {
  return (
    <Link
      href="/dashboard"
      className="inline-flex items-center gap-1.5 text-xs text-[var(--muted)] hover:text-[var(--foreground)] transition-colors mb-4"
    >
      <ArrowLeft className="w-3.5 h-3.5" />
      Dashboard
    </Link>
  )
}
