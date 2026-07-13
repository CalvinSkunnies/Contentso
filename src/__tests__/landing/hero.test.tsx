import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { Hero } from "@/components/landing/hero"

describe("Hero", () => {
  it("should render the headline", () => {
    render(<Hero />)
    expect(screen.getByText("Plan. Script.")).toBeInTheDocument()
    expect(screen.getByText("Go Viral.")).toBeInTheDocument()
  })

  it("should render the description", () => {
    render(<Hero />)
    expect(screen.getByText(/IG Reels and TikTok/)).toBeInTheDocument()
  })

  it("should render stats cards", () => {
    render(<Hero />)
    expect(screen.getByText("10x faster")).toBeInTheDocument()
    expect(screen.getByText("6 stages")).toBeInTheDocument()
    expect(screen.getByText("IG + TikTok")).toBeInTheDocument()
    expect(screen.getByText("Free tier")).toBeInTheDocument()
  })

  it("should have Get Started link", () => {
    render(<Hero />)
    const link = screen.getByRole("link", { name: /start creating free/i })
    expect(link).toHaveAttribute("href", "/auth/signin")
  })

  it("should have See Features anchor", () => {
    render(<Hero />)
    const link = screen.getByRole("link", { name: /see features/i })
    expect(link).toHaveAttribute("href", "#features")
  })

  it("should render the badge", () => {
    render(<Hero />)
    expect(screen.getByText(/Pre-production OS/)).toBeInTheDocument()
  })
})
