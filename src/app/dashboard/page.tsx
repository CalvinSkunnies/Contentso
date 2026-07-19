"use client"

import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, FileText, KanbanSquare, Sparkles, TrendingUp } from "lucide-react"
import Link from "next/link"

const quickActions = [
  {
    title: "Content Calendar",
    desc: "Plan your week with drag & drop",
    icon: CalendarDays,
    href: "/dashboard/calendar",
    color: "text-[var(--primary)]",
  },
  {
    title: "Script Studio",
    desc: "Write & link scripts to content",
    icon: FileText,
    href: "/dashboard/studio",
    color: "text-[var(--secondary)]",
  },
  {
    title: "Pipeline Board",
    desc: "Track from idea to posted",
    icon: KanbanSquare,
    href: "/dashboard/pipeline",
    color: "text-emerald-500",
  },
  {
    title: "Trend Radar",
    desc: "Discover trending content",
    icon: TrendingUp,
    href: "#",
    color: "text-amber-500",
  },
]

export default function DashboardPage() {
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
        className="mb-10"
      >
        <div className="flex items-center gap-3 mb-2">
          <Badge variant="default" className="text-xs">
            <Sparkles className="w-3 h-3 mr-1" />
            Dashboard
          </Badge>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold">
          Welcome back{session.user?.name ? `, ${session.user.name.split(" ")[0]}` : ""}
        </h1>
        <p className="text-[var(--muted)] mt-1">
          Ready to plan today&apos;s content?
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {quickActions.map((action, i) => (
          <motion.div
            key={action.title}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
          >
            <Link href={action.href}>
              <Card className="glass-hover cursor-pointer">
                <CardHeader>
                  <div className={`w-10 h-10 rounded-xl bg-[var(--card)] flex items-center justify-center mb-2 ${action.color}`}>
                    <action.icon className="w-5 h-5" />
                  </div>
                  <CardTitle className="text-base">{action.title}</CardTitle>
                  <CardDescription className="text-xs">{action.desc}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Coming Soon</CardTitle>
            <CardDescription>
              Full calendar view, script studio, and trend radar are being built.
              Stay tuned for updates.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-48 rounded-xl bg-[var(--card)]/50 flex items-center justify-center">
              <p className="text-sm text-[var(--muted)]">
                Your content calendar will appear here
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
