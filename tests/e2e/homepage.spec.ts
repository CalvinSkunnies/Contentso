import { test, expect } from "@playwright/test"

test.describe("Landing Page", () => {
  test("should load the homepage with correct title", async ({ page }) => {
    await page.goto("/")
    await expect(page).toHaveTitle(/Contentso/)
  })

  test("should display the hero section", async ({ page }) => {
    await page.goto("/")
    await expect(page.getByText("Plan. Script. Go Viral.")).toBeVisible()
  })

  test("should have a working Get Started button", async ({ page }) => {
    await page.goto("/")
    await page.getByRole("link", { name: /Start Creating Free/i }).first().click()
    await expect(page).toHaveURL(/\/auth\/signin/)
  })

  test("should display features section", async ({ page }) => {
    await page.goto("/")
    await page.getByText("Drag & Drop Calendar").waitFor()
    await expect(page.getByText("AI Script Studio")).toBeVisible()
  })

  test("should open FAQ accordion on click", async ({ page }) => {
    await page.goto("/")
    const faq = page.getByText("What is Contenso and who is it for?")
    await faq.click()
    await expect(page.getByText(/pre-production OS/)).toBeVisible()
  })

  test("should toggle theme between dark and light", async ({ page }) => {
    await page.goto("/")
    const html = page.locator("html")
    const button = page.getByRole("button", { name: /Toggle theme/i })

    // default is dark
    await expect(html).toHaveClass(/dark/)

    // click to switch to light
    await button.click()
    await expect(html).not.toHaveClass(/dark/)

    // click to switch back to dark
    await button.click()
    await expect(html).toHaveClass(/dark/)
  })

  test("should navigate to external links in footer", async ({ page }) => {
    await page.goto("/")
    const githubLink = page.getByRole("link", { name: /GitHub/i })
    await expect(githubLink).toHaveAttribute("href", /github.com/)
  })
})

test.describe("Auth Page", () => {
  test("should display sign-in page with Google button", async ({ page }) => {
    await page.goto("/auth/signin")
    await expect(page.getByText("Continue with Google")).toBeVisible()
  })

  test("should redirect to sign-in when accessing dashboard unauthenticated", async ({ page }) => {
    await page.goto("/dashboard")
    await expect(page).toHaveURL(/\/auth\/signin/)
  })
})
