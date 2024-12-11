import { NextResponse } from 'next/server'
import { MUSIC_CONFIG } from '@/config/music'
import { checkRateLimit } from '@/lib/rateLimiter'
import { TokenStorage } from '@/lib/tokenStorage'

export async function POST(request: Request) {
  try {
    // Check rate limit
    const ip = request.headers.get('x-forwarded-for') || 'anonymous'
    const rateLimit = await checkRateLimit(`spotify_token_${ip}`)
    
    if (!rateLimit.success) {
      return NextResponse.json(
        { error: 'Too many requests' },
        { 
          status: 429,
          headers: rateLimit.headers
        }
      )
    }

    const { code } = await request.json()

    const params = new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: MUSIC_CONFIG.spotify.redirectUri,
    })

    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${Buffer.from(
          `${MUSIC_CONFIG.spotify.clientId}:${process.env.SPOTIFY_CLIENT_SECRET}`
        ).toString('base64')}`,
      },
      body: params,
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error_description || 'Failed to exchange token')
    }

    // Save token
    await TokenStorage.saveToken({
      accessToken: data.access_token,
      refreshToken: data.refresh_token,
      expiresAt: Date.now() + data.expires_in * 1000
    })

    return NextResponse.json(data, {
      headers: rateLimit.headers
    })
  } catch (error) {
    console.error('Token exchange error:', error)
    return NextResponse.json(
      { error: 'Failed to exchange token' },
      { status: 500 }
    )
  }
} 