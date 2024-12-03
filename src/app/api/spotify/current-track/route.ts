import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import spotifyApi from '@/lib/spotify'

export async function GET() {
  try {
    const accessToken = cookies().get('spotify_access_token')?.value

    if (!accessToken) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      )
    }

    spotifyApi.setAccessToken(accessToken)
    const state = await spotifyApi.getMyCurrentPlaybackState()

    if (!state.body || !state.body.item) {
      return NextResponse.json({ track: null })
    }

    return NextResponse.json({
      track: {
        id: state.body.item.id,
        name: state.body.item.name,
        artist: state.body.item.artists[0].name,
        albumId: state.body.item.album.id,
        albumArt: state.body.item.album.images[0].url,
        duration: state.body.item.duration_ms,
        isPlaying: state.body.is_playing,
        progress: state.body.progress_ms
      }
    })

  } catch (error) {
    console.error('Failed to get current track:', error)
    return NextResponse.json(
      { error: 'Failed to get current track' },
      { status: 500 }
    )
  }
} 