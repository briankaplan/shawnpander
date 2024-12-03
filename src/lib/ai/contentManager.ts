import OpenAI from 'openai'
import type { HeaderContent } from '@/types/content'
import { SYSTEM_PROMPTS } from './prompts'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

interface AIContentUpdate {
  type: 'header' | 'shows' | 'music' | 'custom'
  action: 'create' | 'update' | 'delete'
  content: Partial<HeaderContent>
  suggestions?: {
    images?: string[]
    description?: string[]
    tags?: string[]
  }
}

export async function interpretContentRequest(prompt: string): Promise<AIContentUpdate> {
  const response = await openai.chat.completions.create({
    model: process.env.OPENAI_MODEL || "gpt-4",
    messages: [
      {
        role: "system",
        content: SYSTEM_PROMPTS.contentManager
      },
      {
        role: "user",
        content: prompt
      }
    ],
    functions: [
      {
        name: "updateContent",
        description: "Update website content based on the request",
        parameters: {
          type: "object",
          properties: {
            type: {
              type: "string",
              enum: ["header", "shows", "music", "custom"]
            },
            action: {
              type: "string",
              enum: ["create", "update", "delete"]
            },
            content: {
              type: "object",
              properties: {
                title: { type: "string" },
                description: { type: "string" },
                type: { type: "string" },
                image: { type: "string" },
                venue: { type: "string" },
                location: { type: "string" },
                date: { type: "string" },
                time: { type: "string" },
                ticketUrl: { type: "string" },
                streamingLinks: {
                  type: "object",
                  properties: {
                    spotify: { type: "string" },
                    appleMusic: { type: "string" },
                    amazonMusic: { type: "string" }
                  }
                },
              }
            },
            suggestions: {
              type: "object",
              properties: {
                images: {
                  type: "array",
                  items: { type: "string" }
                },
                description: {
                  type: "array",
                  items: { type: "string" }
                },
                tags: {
                  type: "array",
                  items: { type: "string" }
                }
              }
            }
          },
          required: ["type", "action", "content"]
        }
      }
    ],
    function_call: { name: "updateContent" }
  })

  const functionCall = response.choices[0].message.function_call
  return JSON.parse(functionCall!.arguments) as AIContentUpdate
}

export async function generateImagePrompt(description: string): Promise<string> {
  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: SYSTEM_PROMPTS.imagePrompt
      },
      {
        role: "user",
        content: `Generate a DALL-E prompt for: ${description}`
      }
    ]
  })

  return response.choices[0].message.content || description
} 