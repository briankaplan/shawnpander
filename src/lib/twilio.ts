import twilio from 'twilio'
import { validateAndFormatContent, generateConfirmationMessage, validateUserConfirmation } from './openai'

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
)

interface MessageContext {
  userId: string
  phoneNumber: string
  pendingUpdate?: {
    type: 'header' | 'shows' | 'news'
    content: string
    style?: Record<string, string>
  }
}

// In-memory store for message context (in production, use a database)
const messageContexts = new Map<string, MessageContext>()

export async function handleIncomingMessage(
  from: string,
  body: string
): Promise<string> {
  try {
    const userId = from.replace(/[^\d]/g, '') // Clean phone number to use as userId
    let context = messageContexts.get(userId)

    // Initialize context if it doesn't exist
    if (!context) {
      context = {
        userId,
        phoneNumber: from
      }
      messageContexts.set(userId, context)
    }

    // If there's a pending update, treat this as a confirmation response
    if (context.pendingUpdate) {
      const isConfirmed = await validateUserConfirmation(body)
      
      if (isConfirmed) {
        // Update the site content (implement this based on your storage solution)
        await updateSiteContent(context.pendingUpdate)
        
        // Clear the pending update
        context.pendingUpdate = undefined
        messageContexts.set(userId, context)
        
        return "Great! I've updated the site with your changes. They should be live now! 🎉"
      } else {
        // Clear the pending update
        context.pendingUpdate = undefined
        messageContexts.set(userId, context)
        
        return "No problem! I've cancelled those changes. Let me know if you want to make any other updates! 👍"
      }
    }

    // Process new content update request
    const formattedContent = await validateAndFormatContent(body)
    
    // Store the pending update
    context.pendingUpdate = formattedContent
    messageContexts.set(userId, context)
    
    // Generate and send confirmation message
    const confirmationMessage = await generateConfirmationMessage(formattedContent)
    return confirmationMessage

  } catch (error) {
    console.error('Error handling message:', error)
    return "Sorry, I ran into an issue processing your message. Could you try rephrasing it? 🤔"
  }
}

export async function sendMessage(to: string, body: string): Promise<void> {
  try {
    await client.messages.create({
      to,
      from: process.env.TWILIO_PHONE_NUMBER,
      body
    })
  } catch (error) {
    console.error('Error sending message:', error)
    throw new Error('Failed to send message')
  }
}

async function updateSiteContent(update: MessageContext['pendingUpdate']) {
  if (!update) return

  try {
    // Fetch current content
    const response = await fetch('/api/content', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.CONTENT_API_KEY}`
      },
      body: JSON.stringify({
        type: update.type,
        content: update.content,
        style: update.style
      })
    })

    if (!response.ok) {
      throw new Error('Failed to update content')
    }

    // Trigger revalidation of affected pages
    await fetch('/api/revalidate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.REVALIDATION_TOKEN}`
      },
      body: JSON.stringify({
        paths: ['/', '/shows', '/news']
      })
    })

  } catch (error) {
    console.error('Error updating site content:', error)
    throw new Error('Failed to update site content')
  }
}

// Utility function to clean and validate phone numbers
export function formatPhoneNumber(phoneNumber: string): string {
  const cleaned = phoneNumber.replace(/[^\d]/g, '')
  if (cleaned.length !== 10 && cleaned.length !== 11) {
    throw new Error('Invalid phone number format')
  }
  return cleaned.length === 10 ? `+1${cleaned}` : `+${cleaned}`
}

// Utility function to validate message content
export function validateMessageContent(content: string): boolean {
  // Basic validation
  if (!content || content.trim().length === 0) {
    return false
  }
  
  // Check for reasonable length
  if (content.length > 1000) {
    return false
  }
  
  // Check for any malicious content (expand based on requirements)
  const blacklistedPatterns = [
    /<script>/i,
    /javascript:/i,
    /data:/i,
    /vbscript:/i
  ]
  
  return !blacklistedPatterns.some(pattern => pattern.test(content))
}

// Utility function to handle errors gracefully
export function handleError(error: unknown): string {
  console.error('Error:', error)
  
  if (error instanceof Error) {
    switch (error.message) {
      case 'Invalid phone number format':
        return "Hmm, that phone number doesn't look quite right. Could you check it and try again? 📱"
      case 'Failed to update content':
        return "I couldn't update the site right now. Let's try again in a few minutes! 🔄"
      case 'Failed to send message':
        return "I had trouble sending the message. Can you try again? 📤"
      default:
        return "Something went wrong. Let's try that again! 🔧"
    }
  }
  
  return "Oops! Something unexpected happened. Let's try again! 🔄"
}