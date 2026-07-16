import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { ContentCard } from "@/components/calendar/content-card"
import type { ContentItem } from "@/lib/calendar-types"

const mockItem: ContentItem = {
  id: "test-1",
  title: "Morning routine tips",
  platform: "ig",
  status: "idea",
  day: 1,
  content: "Start with a hook about waking up at 5am",
  media: "https://example.com/video.mp4",
  notes: "Use trending sound",
}

const mockItemTikTok: ContentItem = {
  id: "test-2",
  title: "Dance challenge",
  platform: "tiktok",
  status: "filmed",
  day: 2,
}

describe("ContentCard", () => {
  it("should render title", () => {
    render(<ContentCard item={mockItem} />)
    expect(screen.getByText("Morning routine tips")).toBeInTheDocument()
  })

  it("should show platform badge", () => {
    render(<ContentCard item={mockItem} />)
    expect(screen.getByText("Reels")).toBeInTheDocument()
  })

  it("should show TikTok badge", () => {
    render(<ContentCard item={mockItemTikTok} />)
    expect(screen.getByText("TikTok")).toBeInTheDocument()
  })

  it("should show status", () => {
    render(<ContentCard item={mockItem} />)
    expect(screen.getByText("Idea")).toBeInTheDocument()
  })

  it("should show content preview when provided", () => {
    render(<ContentCard item={mockItem} />)
    expect(screen.getByText(/Start with a hook/)).toBeInTheDocument()
  })

  it("should show media reference when provided", () => {
    render(<ContentCard item={mockItem} />)
    expect(screen.getByText(/https:\/\/example\.com\/video\.mp4/)).toBeInTheDocument()
  })

  it("should show notes when provided", () => {
    render(<ContentCard item={mockItem} />)
    expect(screen.getByText("Use trending sound")).toBeInTheDocument()
  })

  it("should not show optional fields when absent", () => {
    render(<ContentCard item={mockItemTikTok} />)
    expect(screen.queryByText(/Start with a hook/)).not.toBeInTheDocument()
    expect(screen.queryByText(/https:\/\/example\.com/)).not.toBeInTheDocument()
    expect(screen.queryByText("Use trending sound")).not.toBeInTheDocument()
  })

  it("should show delete button when onDelete provided", () => {
    render(<ContentCard item={mockItem} onDelete={() => {}} />)
    expect(screen.getByRole("button")).toBeInTheDocument()
  })
})
