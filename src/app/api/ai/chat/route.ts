import { NextRequest, NextResponse } from "next/server"
import { getModel, isGeminiConfigured } from "@/lib/gemini"
import { getSystemPrompt } from "@/lib/prompts"
import type { PromptType } from "@/lib/prompts"

export async function POST(request: NextRequest) {
  try {
    if (!isGeminiConfigured()) {
      return NextResponse.json(
        { error: "Gemini API key not configured. Add GOOGLE_GEMINI_API_KEY to .env.local" },
        { status: 500 }
      )
    }

    const { message, type, history } = await request.json() as {
      message: string
      type?: PromptType
      history?: { role: "user" | "model"; content: string }[]
    }

    const model = getModel()
    if (!model) {
      return NextResponse.json({ error: "Failed to initialize Gemini" }, { status: 500 })
    }

    const systemPrompt = type ? getSystemPrompt(type) : getSystemPrompt("contentCoach")

    const chat = model.startChat({
      history: [
        { role: "user", parts: [{ text: systemPrompt }] },
        { role: "model", parts: [{ text: "Understood. I'll follow these guidelines." }] },
        ...(history?.map((h) => ({
          role: h.role as "user" | "model",
          parts: [{ text: h.content }],
        })) ?? []),
      ],
    })

    const result = await chat.sendMessage(message)
    const response = result.response.text()

    return NextResponse.json({ response })
  } catch (error) {
    console.error("Gemini chat error:", error)
    return NextResponse.json(
      { error: "AI request failed. Please try again." },
      { status: 500 }
    )
  }
}
