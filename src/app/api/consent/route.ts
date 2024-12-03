import { NextRequest, NextResponse } from 'next/server'
import { kv } from '@vercel/kv'
import { validatePhoneNumber } from '@/hooks/useAuth'

interface ConsentRecord {
  phone: string
  timestamp: string
  userAgent: string
  ipAddress: string
  status: 'active' | 'stopped'
}

export async function POST(request: NextRequest) {
  return NextResponse.json({ message: 'Consent service coming soon' }, { status: 503 })
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const phone = searchParams.get('phone')

    if (!phone) {
      return NextResponse.json(
        { error: 'Phone number is required' },
        { status: 400 }
      )
    }

    // Clean phone number
    const cleanPhone = phone.replace(/[^\d+]/g, '')

    // Check if phone number has active consent
    const hasConsent = await kv.sismember('consent:active_subscribers', cleanPhone)

    if (!hasConsent) {
      return NextResponse.json({
        hasConsent: false,
        message: 'No active consent record found for this number'
      })
    }

    // Get latest consent record
    const pattern = `consent:${cleanPhone}:*`
    const keys = await kv.keys(pattern)
    
    if (keys.length === 0) {
      return NextResponse.json({
        hasConsent: true,
        message: 'Consent record exists but details are not available'
      })
    }

    // Sort keys to get the latest
    const latestKey = keys.sort().pop()
    const record = await kv.get(latestKey!)

    return NextResponse.json({
      hasConsent: true,
      record: JSON.parse(record as string)
    })

  } catch (error) {
    console.error('Error checking consent:', error)
    return NextResponse.json(
      { error: 'Failed to check consent status' },
      { status: 500 }
    )
  }
}

// Helper function to validate environment variables
function validateEnvironment() {
  const required = [
    'TWILIO_ACCOUNT_SID',
    'TWILIO_AUTH_TOKEN',
    'TWILIO_PHONE_NUMBER',
    'KV_URL',
    'KV_REST_API_URL',
    'KV_REST_API_TOKEN'
  ]

  const missing = required.filter(key => !process.env[key])
  
  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`)
  }
}

// Call validation on module load
validateEnvironment()