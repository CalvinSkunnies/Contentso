import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { Comparison } from "@/components/landing/comparison"

describe("Comparison", () => {
  it("should render section heading", () => {
    render(<Comparison />)
    expect(screen.getByText(/Contenso vs/)).toBeInTheDocument()
  })

  it("should render all tools in comparison", () => {
    render(<Comparison />)
    expect(screen.getByText("Contenso")).toBeInTheDocument()
    expect(screen.getByText("Google Sheets")).toBeInTheDocument()
    expect(screen.getByText("Notion")).toBeInTheDocument()
    expect(screen.getByText("Later")).toBeInTheDocument()
    expect(screen.getByText("Trello")).toBeInTheDocument()
  })

  it("should render feature rows", () => {
    render(<Comparison />)
    expect(screen.getByText("AI Hook Generator")).toBeInTheDocument()
    expect(screen.getByText("AI Script Writer (per platform)")).toBeInTheDocument()
    expect(screen.getByText("Drag & Drop Calendar")).toBeInTheDocument()
    expect(screen.getByText("Purpose-built for Short-Form")).toBeInTheDocument()
  })

  it("should render legend", () => {
    render(<Comparison />)
    expect(screen.getByText(/Built-in \/ Native/)).toBeInTheDocument()
    expect(screen.getByText(/Not available/)).toBeInTheDocument()
  })
})
