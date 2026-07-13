import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"

describe("Card", () => {
  it("should render with children", () => {
    render(<Card><p>Content</p></Card>)
    expect(screen.getByText("Content")).toBeInTheDocument()
  })

  it("should apply glass class", () => {
    render(<Card data-testid="card">Card</Card>)
    expect(screen.getByTestId("card").className).toContain("glass")
  })
})

describe("CardHeader", () => {
  it("should render children", () => {
    render(<CardHeader><h3>Header</h3></CardHeader>)
    expect(screen.getByText("Header")).toBeInTheDocument()
  })
})

describe("CardTitle", () => {
  it("should render text", () => {
    render(<CardTitle>Title</CardTitle>)
    expect(screen.getByText("Title")).toBeInTheDocument()
  })
})

describe("CardDescription", () => {
  it("should render description text", () => {
    render(<CardDescription>Description</CardDescription>)
    expect(screen.getByText("Description")).toBeInTheDocument()
  })

  it("should have muted styling", () => {
    render(<CardDescription data-testid="desc">Desc</CardDescription>)
    expect(screen.getByTestId("desc").className).toContain("muted")
  })
})

describe("CardContent", () => {
  it("should render children", () => {
    render(<CardContent><span>Content</span></CardContent>)
    expect(screen.getByText("Content")).toBeInTheDocument()
  })
})

describe("CardFooter", () => {
  it("should render children", () => {
    render(<CardFooter><button>Action</button></CardFooter>)
    expect(screen.getByRole("button", { name: /action/i })).toBeInTheDocument()
  })
})
