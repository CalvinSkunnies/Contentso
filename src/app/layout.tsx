import type { Metadata } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import "./globals.css"
import { Providers } from "@/components/providers"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Contentso — Content Planning OS for Short-Form Creators",
  description:
    "Plan, script, and track your IG Reels and TikTok content in one futuristic workspace. AI-powered hooks, drag-and-drop calendar, pipeline management.",
  keywords: [
    "content planner",
    "tiktok planner",
    "instagram reels planner",
    "content creation",
    "ai script generator",
    "social media planner",
  ],
  openGraph: {
    title: "Contentso — Content Planning OS",
    description: "The pre-production OS for short-form creators.",
    url: "https://contentso.vercel.app",
    siteName: "Contentso",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        <Providers>
          <div className="min-h-screen flex flex-col bg-grid">
            <div className="fixed inset-0 bg-glow pointer-events-none" />
            <Navbar />
            <main className="flex-1 relative z-10">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  )
}
