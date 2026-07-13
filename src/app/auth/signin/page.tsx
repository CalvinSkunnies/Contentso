"use client"

import { signIn } from "next-auth/react"
import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Chrome, Sparkles, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function SignInPage() {
  const [loading, setLoading] = useState(false)

  const handleGoogleSignIn = () => {
    setLoading(true)
    signIn("google", { callbackUrl: "/dashboard" })
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md"
      >
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-[var(--muted)] hover:text-[var(--foreground)] mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to home
        </Link>

        <Card className="p-8">
          <CardHeader className="text-center p-0">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[var(--primary)] to-[var(--secondary)] flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold">Welcome to Contenso</CardTitle>
            <CardDescription className="mt-2">
              Your content planning OS. Sign in to get started.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0 mt-8 space-y-4">
            <Button
              variant="outline"
              size="lg"
              className="w-full h-12 text-base"
              onClick={handleGoogleSignIn}
              disabled={loading}
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-[var(--primary)] border-t-transparent rounded-full animate-spin mr-3" />
              ) : (
                <Chrome className="w-5 h-5 mr-3" />
              )}
              {loading ? "Signing in..." : "Continue with Google"}
            </Button>

            <p className="text-xs text-center text-[var(--muted)] pt-2">
              By signing in, you agree to our Terms of Service and Privacy Policy.
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
