import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

interface ContentUpdate {
  type: 'header' | 'shows' | 'news'
  content: string
  style?: Record<string, string>
}

export async function validateAndFormatContent(userMessage: string): Promise<ContentUpdate> {
  const prompt = `
    As a website content manager, analyze this text message and format it for the website:
    "${userMessage}"
    
    Determine:
    1. The type of content (header, shows, news)
    2. The formatted content
    3. Any suggested styling (colors, emphasis, etc.)
    
    Respond in JSON format with these fields:
    {
      "type": "header|shows|news",
      "content": "formatted content",
      "style": { suggested style properties }
    }
  `

  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      {
        role: 'system',
        content: 'You are a helpful website content manager that formats and validates content updates.'
      },
      {
        role: 'user',
        content: prompt
      }
    ],
    response_format: { type: 'json_object' }
  })

  const result = JSON.parse(response.choices[0].message.content || '{}')
  return result as ContentUpdate
}

export async function generateConfirmationMessage(update: ContentUpdate): Promise<string> {
  const prompt = `
    Create a friendly confirmation message for this website update:
    ${JSON.stringify(update, null, 2)}
    
    The message should:
    1. Confirm what will be updated
    2. Show how it will look
    3. Ask for confirmation
    
    Keep it casual and friendly, like texting a friend.
  `

  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      {
        role: 'system',
        content: 'You are a friendly website assistant helping to confirm content updates.'
      },
      {
        role: 'user',
        content: prompt
      }
    ]
  })

  return response.choices[0].message.content || 'Would you like to confirm this update?'
}

export async function validateUserConfirmation(userResponse: string): Promise<boolean> {
  const prompt = `
    Analyze this response to determine if it's a confirmation or rejection:
    "${userResponse}"
    
    Respond with just "true" for confirmation or "false" for rejection.
  `

  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      {
        role: 'system',
        content: 'You are a confirmation validator that only responds with true or false.'
      },
      {
        role: 'user',
        content: prompt
      }
    ]
  })

  return response.choices[0].message.content?.toLowerCase().includes('true') || false
}

export async function suggestContentImprovements(content: string): Promise<string> {
  const prompt = `
    Review this website content and suggest improvements:
    "${content}"
    
    Consider:
    1. Clarity and readability
    2. Engagement
    3. Call to action
    4. SEO friendliness
    
    Provide specific suggestions in a friendly, casual tone.
  `

  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      {
        role: 'system',
        content: 'You are a helpful content improvement assistant.'
      },
      {
        role: 'user',
        content: prompt
      }
    ]
  })

  return response.choices[0].message.content || 'Your content looks good!'
}