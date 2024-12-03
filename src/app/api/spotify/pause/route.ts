import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import spotifyApi from '@/lib/spotify'

export async function POST() {
  try {
    const accessToken = cookies().get('spotify_access_token')?.value

    if (!accessToken) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      )
    }

    spotifyApi.setAccessToken(accessToken)
    await spotifyApi.pause()

    return NextResponse.json({ success: true })

  } catch (error) {
    console.error('Failed to pause playback:', error)
    return NextResponse.json(
      { error: 'Failed to pause playback' },
      { status: 500 }
    )
  }
} 