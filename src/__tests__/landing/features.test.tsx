import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { Features } from "@/components/landing/features"

describe("Features", () => {
  it("should render section heading", () => {
    render(<Features />)
    expect(screen.getByText(/Everything you need/)).toBeInTheDocument()
  })

  it("should render all 6 feature cards", () => {
    render(<Features />)
    expect(screen.getByText("Drag & Drop Calendar")).toBeInTheDocument()
    expect(screen.getByText("AI Script Studio")).toBeInTheDocument()
    expect(screen.getByText("Pipeline Board")).toBeInTheDocument()
    expect(screen.getByText("Trend Radar")).toBeInTheDocument()
    expect(screen.getByText("Ideas Board")).toBeInTheDocument()
    expect(screen.getByText("Analytics & Streaks")).toBeInTheDocument()
  })

  it("should render feature descriptions", () => {
    render(<Features />)
    expect(screen.getByText(/Color-coded by platform/)).toBeInTheDocument()
    expect(screen.getByText(/Kanban from Idea/)).toBeInTheDocument()
  })
})
