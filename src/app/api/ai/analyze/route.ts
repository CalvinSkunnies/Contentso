import { NextRequest, NextResponse } from "next/server"
import { getModel, isGeminiConfigured } from "@/lib/gemini"
import { getSystemPrompt } from "@/lib/prompts"

export async function POST(request: NextRequest) {
  try {
    if (!isGeminiConfigured()) {
      return NextResponse.json(
        { error: "Gemini API key not configured" },
        { status: 500 }
      )
    }

    const { script, platform } = await request.json() as {
      script: string
      platform: "ig" | "tiktok"
    }

    const model = getModel()
    if (!model) {
      return NextResponse.json({ error: "Failed to initialize Gemini" }, { status: 500 })
    }

    const prompt = `${getSystemPrompt("scriptAnalyzer")}

Script to analyze:
"""
${script}
"""

Platform: ${platform === "ig" ? "Instagram Reels" : "TikTok"}

Return ONLY valid JSON with this structure:
{
  "hookScore": number,
  "pacingScore": number,
  "viralScore": number,
  "clarityScore": number,
  "overallScore": number,
  "suggestions": ["suggestion1", "suggestion2", "suggestion3"]
}`

    const result = await model.generateContent(prompt)
    const text = result.response.text()

    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      return NextResponse.json(
        { error: "Failed to parse analysis result" },
        { status: 500 }
      )
    }

    const analysis = JSON.parse(jsonMatch[0])

    return NextResponse.json(analysis)
  } catch (error) {
    console.error("Gemini analyze error:", error)
    return NextResponse.json(
      { error: "Analysis failed. Please try again." },
      { status: 500 }
    )
  }
}
