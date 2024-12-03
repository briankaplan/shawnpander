import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import spotifyApi from '@/lib/spotify'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const trackId = searchParams.get('trackId')
    const accessToken = cookies().get('spotify_access_token')?.value

    if (!accessToken || !trackId) {
      return NextResponse.json(
        { error: 'Invalid request' },
        { status: 400 }
      )
    }

    spotifyApi.setAccessToken(accessToken)
    
    // Get track details
    const track = await spotifyApi.getTrack(trackId)
    const { name, artists } = track.body

    // Use a lyrics API (you'll need to implement or use a service)
    const lyrics = await fetchLyrics(name, artists[0].name)

    return NextResponse.json({ lyrics })

  } catch (error) {
    console.error('Failed to get lyrics:', error)
    return NextResponse.json(
      { error: 'Failed to get lyrics' },
      { status: 500 }
    )
  }
}

async function fetchLyrics(title: string, artist: string): Promise<string> {
  // Implement lyrics fetching logic here
  // You could use services like Genius API, Musixmatch, etc.
  return 'Lyrics not available'
} 