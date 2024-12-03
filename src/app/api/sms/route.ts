import { NextRequest, NextResponse } from 'next/server'
import twilio from 'twilio'
import { type ReadonlyHeaders } from 'next/dist/server/web/spec-extension/adapters/headers'
import OpenAI from 'openai'
import { processPhotoMessage } from '@/lib/services/photoProcessor'

// Validate Twilio credentials
if (!process.env.TWILIO_ACCOUNT_SID || !process.env.TWILIO_AUTH_TOKEN || !process.env.TWILIO_PHONE_NUMBER) {
  throw new Error('Missing Twilio credentials in environment variables');
}

const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
)

export async function POST(request: NextRequest) {
  try {
    const headersList: ReadonlyHeaders = request.headers
    const twilioSignature = headersList.get('x-twilio-signature') || ''

    const data = await request.formData()
    const mediaUrl = data.get('MediaUrl0') as string
    const messageBody = data.get('Body') as string
    const from = data.get('From') as string

    if (!from) {
      return NextResponse.json({ error: 'Missing sender information' }, { status: 400 })
    }

    if (!mediaUrl) {
      await sendSMS(from, "Please send a photo!")
      return NextResponse.json({ message: 'No photo received' })
    }

    const metadata = await processPhotoMessage({
      mediaUrl,
      messageBody,
      from
    })

    await sendSMS(from, "Thanks! I've processed your photo.")
    return NextResponse.json({ success: true, metadata })
  } catch (error) {
    console.error('Error processing SMS:', error)
    return NextResponse.json({ error: 'Failed to process message' }, { status: 500 })
  }
}

async function sendSMS(to: string, body: string) {
  return twilioClient.messages.create({
    body,
    to,
    from: process.env.TWILIO_PHONE_NUMBER
  })
}

export async function GET() {
  return new NextResponse(
    `<?xml version="1.0" encoding="UTF-8"?><Response><Message>SMS endpoint working</Message></Response>`,
    {
      headers: { 'Content-Type': 'application/xml' }
    }
  )
}