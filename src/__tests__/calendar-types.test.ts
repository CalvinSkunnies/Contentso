import { describe, it, expect } from "vitest"
import { getWeekDates, generateId, PLATFORM_CONFIG, STATUS_CONFIG, DAY_LABELS } from "@/lib/calendar-types"

describe("getWeekDates", () => {
  it("should return 7 days", () => {
    const days = getWeekDates()
    expect(days).toHaveLength(7)
  })

  it("should start on Sunday", () => {
    const days = getWeekDates(new Date("2026-07-15"))
    expect(days[0].label).toBe("Sun")
    expect(days[0].day).toBe(0)
  })

  it("should have correct labels", () => {
    const days = getWeekDates()
    expect(days.map((d) => d.label)).toEqual(DAY_LABELS)
  })

  it("should have date objects", () => {
    const days = getWeekDates()
    days.forEach((d) => {
      expect(d.date).toBeInstanceOf(Date)
      expect(d.dateStr).toBeTruthy()
    })
  })

  it("should use reference date when provided", () => {
    const ref = new Date("2026-07-15")
    const days = getWeekDates(ref)
    const start = days[0].date
    expect(start.getDay()).toBe(0)
    expect(days[6].date.getDay()).toBe(6)
  })
})

describe("generateId", () => {
  it("should generate unique ids", () => {
    const id1 = generateId()
    const id2 = generateId()
    expect(id1).not.toBe(id2)
  })

  it("should include timestamp", () => {
    const id = generateId()
    expect(id).toContain("content_")
  })
})

describe("PLATFORM_CONFIG", () => {
  it("should have config for ig", () => {
    expect(PLATFORM_CONFIG.ig.label).toBe("Reels")
  })

  it("should have config for tiktok", () => {
    expect(PLATFORM_CONFIG.tiktok.label).toBe("TikTok")
  })
})

describe("STATUS_CONFIG", () => {
  it("should have all 6 statuses", () => {
    expect(Object.keys(STATUS_CONFIG)).toHaveLength(6)
    expect(STATUS_CONFIG.idea.label).toBe("Idea")
    expect(STATUS_CONFIG.posted.label).toBe("Posted")
  })
})
