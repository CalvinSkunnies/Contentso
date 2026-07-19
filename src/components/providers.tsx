"use client"

import { ThemeProvider } from "next-themes"
import { SessionProvider } from "next-auth/react"
import { type ReactNode } from "react"
import { AppProvider } from "@/context/app-context"

export function Providers({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem={false}
        storageKey="contentso-theme"
      >
        <AppProvider>
          {children}
        </AppProvider>
      </ThemeProvider>
    </SessionProvider>
  )
}
