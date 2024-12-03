import OpenAI from 'openai'
import { generateImagePrompt } from './contentManager'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function generateImage(description: string) {
  try {
    // First, optimize the prompt for DALL-E
    const optimizedPrompt = await generateImagePrompt(description)

    // Generate image with DALL-E
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: optimizedPrompt,
      n: 1,
      size: "1024x1024",
      quality: "standard",
      response_format: "url",
    })

    return response.data[0].url
  } catch (error) {
    console.error('Error generating image:', error)
    return null
  }
} 