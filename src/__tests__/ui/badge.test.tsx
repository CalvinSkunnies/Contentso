import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { Badge } from "@/components/ui/badge"

describe("Badge", () => {
  it("should render children", () => {
    render(<Badge>New</Badge>)
    expect(screen.getByText("New")).toBeInTheDocument()
  })

  it("should apply default variant", () => {
    render(<Badge data-testid="badge">Default</Badge>)
    const badge = screen.getByTestId("badge")
    expect(badge.className).toContain("rounded-full")
  })

  it("should apply secondary variant", () => {
    render(<Badge variant="secondary" data-testid="badge">Secondary</Badge>)
    const badge = screen.getByTestId("badge")
    expect(badge.className).toContain("bg-[var(--secondary)]/10")
  })

  it("should apply outline variant", () => {
    render(<Badge variant="outline" data-testid="badge">Outline</Badge>)
    const badge = screen.getByTestId("badge")
    expect(badge.className).toContain("border")
  })

  it("should apply success variant", () => {
    render(<Badge variant="success" data-testid="badge">Success</Badge>)
    const badge = screen.getByTestId("badge")
    expect(badge.className).toContain("text-emerald-500")
  })
})
