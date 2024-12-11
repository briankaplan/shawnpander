import { NextResponse } from 'next/server'
import { MUSIC_CONFIG } from '@/config/music'

export async function POST(request: Request) {
  try {
    const { refresh_token } = await request.json()

    const params = new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token,
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
      throw new Error(data.error_description || 'Failed to refresh token')
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Token refresh error:', error)
    return NextResponse.json(
      { error: 'Failed to refresh token' },
      { status: 500 }
    )
  }
} 