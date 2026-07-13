import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { CTASection } from "@/components/landing/cta-section"

describe("CTASection", () => {
  it("should render call to action heading", () => {
    render(<CTASection />)
    expect(screen.getByText(/Ready to plan your/)).toBeInTheDocument()
    expect(screen.getByText(/best content\?/)).toBeInTheDocument()
  })

  it("should render Get Started button linking to auth", () => {
    render(<CTASection />)
    const link = screen.getByRole("link", { name: /start creating free/i })
    expect(link).toHaveAttribute("href", "/auth/signin")
  })

  it("should display no credit card note", () => {
    render(<CTASection />)
    expect(screen.getByText(/No credit card required/)).toBeInTheDocument()
  })
})
