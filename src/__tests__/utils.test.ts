import { describe, it, expect } from "vitest"
import { cn } from "@/lib/utils"

describe("cn", () => {
  it("should merge class names", () => {
    expect(cn("px-4", "py-2")).toBe("px-4 py-2")
  })

  it("should handle conditional classes", () => {
    expect(cn("base", false && "hidden", "visible")).toBe("base visible")
  })

  it("should handle undefined values", () => {
    expect(cn("a", undefined, "b")).toBe("a b")
  })

  it("should handle tailwind conflicts (later wins)", () => {
    expect(cn("px-4", "px-6")).toBe("px-6")
  })

  it("should handle arrays of classes", () => {
    expect(cn(["a", "b"], "c")).toBe("a b c")
  })

  it("should handle object syntax", () => {
    expect(cn({ "text-red": true, "text-blue": false })).toBe("text-red")
  })
})
