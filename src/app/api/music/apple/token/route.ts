import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

export async function GET() {
  try {
    const privateKey = process.env.APPLE_MUSIC_PRIVATE_KEY!
    const keyId = process.env.APPLE_MUSIC_KEY_ID!
    const teamId = process.env.APPLE_MUSIC_TEAM_ID!

    const token = jwt.sign({}, privateKey, {
      algorithm: 'ES256',
      expiresIn: '180d',
      issuer: teamId,
      header: {
        alg: 'ES256',
        kid: keyId
      }
    })

    return NextResponse.json({ token })
  } catch (error) {
    console.error('Failed to generate Apple Music token:', error)
    return NextResponse.json(
      { error: 'Failed to generate token' },
      { status: 500 }
    )
  }
} 