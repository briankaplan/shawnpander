import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import spotifyApi from '@/lib/spotify'

export async function POST(request: Request) {
  try {
    const { position } = await request.json()
    const accessToken = cookies().get('spotify_access_token')?.value

    if (!accessToken) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      )
    }

    spotifyApi.setAccessToken(accessToken)
    await spotifyApi.seek(position)

    return NextResponse.json({ success: true })

  } catch (error) {
    console.error('Failed to seek:', error)
    return NextResponse.json(
      { error: 'Failed to seek' },
      { status: 500 }
    )
  }
} 