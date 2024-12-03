import { NextRequest, NextResponse } from 'next/server'
import { kv } from '@vercel/kv'
import { verify } from 'jsonwebtoken'

interface SessionData {
  phone: string
  role: 'admin'
  createdAt: string
}

export async function GET(request: NextRequest) {
  return NextResponse.json({ message: 'Session service coming soon' }, { status: 503 })
}

export async function DELETE(request: NextRequest) {
  try {
    // Get token from cookie
    const authToken = request.cookies.get('auth_token')
    if (!authToken?.value) {
      return NextResponse.json(
        { error: 'No session token' },
        { status: 401 }
      )
    }

    // Delete session from KV store
    const sessionKey = `session:${authToken.value}`
    await kv.del(sessionKey)

    // Create response with cleared cookie
    const response = NextResponse.json({ message: 'Session terminated' })
    response.cookies.delete('auth_token')

    return response

  } catch (error) {
    console.error('Error terminating session:', error)
    return NextResponse.json(
      { error: 'Failed to terminate session' },
      { status: 500 }
    )
  }
}

// Helper function to validate admin session
export async function validateSession(token: string): Promise<boolean> {
  try {
    // Verify JWT
    verify(token, process.env.NEXTAUTH_SECRET!)

    // Check session in KV store
    const sessionKey = `session:${token}`
    const session = await kv.get<SessionData>(sessionKey)

    if (!session) return false

    // Verify admin phone number
    const adminPhone = process.env.ADMIN_PHONE_NUMBER?.replace(/[^\d+]/g, '')
    if (session.phone !== adminPhone) return false

    // Check session age
    const sessionAge = Date.now() - new Date(session.createdAt).getTime()
    const maxAge = 7 * 24 * 60 * 60 * 1000 // 7 days in milliseconds

    if (sessionAge > maxAge) {
      // Delete expired session
      await kv.del(sessionKey)
      return false
    }

    return true

  } catch {
    return false
  }
}

// Helper function to create new session
export async function createSession(phone: string): Promise<string | null> {
  try {
    // Create session token
    const token = require('crypto').randomBytes(32).toString('hex')
    
    // Store session in KV
    const sessionKey = `session:${token}`
    const session: SessionData = {
      phone,
      role: 'admin',
      createdAt: new Date().toISOString()
    }

    await kv.set(sessionKey, JSON.stringify(session), {
      ex: 7 * 24 * 60 * 60 // 7 days in seconds
    })

    return token

  } catch {
    return null
  }
}

// Helper function to get session data
export async function getSessionData(token: string): Promise<SessionData | null> {
  try {
    const sessionKey = `session:${token}`
    const session = await kv.get<SessionData>(sessionKey)
    return session

  } catch {
    return null
  }
}