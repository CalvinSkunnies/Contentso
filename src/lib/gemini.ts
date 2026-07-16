import { GoogleGenerativeAI } from "@google/generative-ai"

const apiKey = process.env.GOOGLE_GEMINI_API_KEY

let genAI: GoogleGenerativeAI | null = null

export function getGeminiClient() {
  if (!apiKey) return null
  if (!genAI) {
    genAI = new GoogleGenerativeAI(apiKey)
  }
  return genAI
}

export function getModel() {
  const client = getGeminiClient()
  if (!client) return null
  return client.getGenerativeModel({ model: "gemini-2.0-flash" })
}

export function isGeminiConfigured() {
  return !!apiKey
}
