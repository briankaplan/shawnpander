import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import spotifyApi from '@/lib/spotify'

export async function POST(request: Request) {
  try {
    const { trackId } = await request.json()
    const accessToken = cookies().get('spotify_access_token')?.value

    if (!accessToken) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      )
    }

    spotifyApi.setAccessToken(accessToken)

    // Get available devices
    const devices = await spotifyApi.getMyDevices()
    const deviceId = devices.body.devices[0]?.id

    if (!deviceId) {
      return NextResponse.json(
        { error: 'No active device found' },
        { status: 400 }
      )
    }

    // Start playback
    await spotifyApi.play({
      device_id: deviceId,
      uris: [`spotify:track:${trackId}`]
    })

    return NextResponse.json({ success: true })

  } catch (error) {
    console.error('Failed to play track:', error)
    return NextResponse.json(
      { error: 'Failed to play track' },
      { status: 500 }
    )
  }
} 