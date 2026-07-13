import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { WhyContenso } from "@/components/landing/why-contenso"

describe("WhyContenso (FAQ)", () => {
  it("should render section heading", () => {
    render(<WhyContenso />)
    expect(screen.getByText((content) => content.includes("Frequently Asked"))).toBeInTheDocument()
  })

  it("should render all 6 FAQ questions", () => {
    render(<WhyContenso />)
    expect(screen.getByText("What is Contenso and who is it for?")).toBeInTheDocument()
    expect(
      screen.getByText("How is Contenso different from just using Google Sheets or Notion?")
    ).toBeInTheDocument()
    expect(screen.getByText("Does Contenso actually post videos for me?")).toBeInTheDocument()
    expect(screen.getByText("Can I use Contenso if I\u2019m a beginner creator?")).toBeInTheDocument()
    expect(screen.getByText("What platforms are supported?")).toBeInTheDocument()
    expect(screen.getByText("Is my content and data private?")).toBeInTheDocument()
  })

  it("should expand first FAQ by default", () => {
    render(<WhyContenso />)
    expect(screen.getByText(/pre-production OS/)).toBeInTheDocument()
  })

  it("should toggle FAQ on click", async () => {
    const user = userEvent.setup()
    render(<WhyContenso />)

    const question = screen.getByText("Does Contenso actually post videos for me?")
    await user.click(question)

    expect(screen.getByText(/handles everything before you hit record/)).toBeInTheDocument()
  })
})
