import { NextRequest, NextResponse } from 'next/server'
import { kv } from '@vercel/kv'
import { sign } from 'jsonwebtoken'

interface AuthRequest {
  phone: string
  code: string
}

export async function POST(request: NextRequest) {
  return NextResponse.json({ message: 'Auth service coming soon' }, { status: 503 })
}

// Middleware to ensure required environment variables are set
function validateEnvironment() {
  const required = [
    'ADMIN_PHONE_NUMBER',
    'ADMIN_AUTH_CODE',
    'NEXTAUTH_SECRET'
  ]

  const missing = required.filter(key => !process.env[key])
  
  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`)
  }
}

// Call validation on module load
validateEnvironment()

// Helper function to validate admin session
export async function validateAdminSession(token: string): Promise<boolean> {
  try {
    const sessionKey = `session:${token}`
    const session = await kv.get(sessionKey)
    return !!session
  } catch {
    return false
  }
}

// Helper function to get admin phone number
export function getAdminPhoneNumber(): string | null {
  return process.env.ADMIN_PHONE_NUMBER || null
}

// Helper function to check if a phone number is the admin
export function isAdminPhone(phone: string): boolean {
  const cleanPhone = phone.replace(/[^\d+]/g, '')
  const adminPhone = process.env.ADMIN_PHONE_NUMBER?.replace(/[^\d+]/g, '')
  return cleanPhone === adminPhone
}