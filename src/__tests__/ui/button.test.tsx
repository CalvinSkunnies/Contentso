import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Button } from "@/components/ui/button"

describe("Button", () => {
  it("should render children", () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole("button", { name: /click me/i })).toBeInTheDocument()
  })

  it("should apply default variant classes", () => {
    render(<Button>Default</Button>)
    const button = screen.getByRole("button")
    expect(button.className).toContain("rounded-xl")
  })

  it("should apply outline variant", () => {
    render(<Button variant="outline">Outline</Button>)
    const button = screen.getByRole("button")
    expect(button.className).toContain("border")
  })

  it("should apply ghost variant", () => {
    render(<Button variant="ghost">Ghost</Button>)
    const button = screen.getByRole("button")
    expect(button.className).toContain("hover:bg-[var(--card)]/80")
  })

  it("should apply size classes", () => {
    render(<Button size="lg">Large</Button>)
    const button = screen.getByRole("button")
    expect(button.className).toContain("h-12")
  })

  it("should be disabled when disabled prop is set", () => {
    render(<Button disabled>Disabled</Button>)
    expect(screen.getByRole("button")).toBeDisabled()
  })

  it("should fire onClick when clicked", async () => {
    const user = userEvent.setup()
    let clicked = false
    render(<Button onClick={() => { clicked = true }}>Click</Button>)
    await user.click(screen.getByRole("button"))
    expect(clicked).toBe(true)
  })

  it("should not fire onClick when disabled", async () => {
    const user = userEvent.setup()
    let clicked = false
    render(<Button disabled onClick={() => { clicked = true }}>Click</Button>)
    await user.click(screen.getByRole("button"))
    expect(clicked).toBe(false)
  })
})
