import { NextResponse } from 'next/server'
import { SpotifyService } from '@/services/spotifyService'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  const state = searchParams.get('state')
  const error = searchParams.get('error')

  if (error) {
    console.error('Spotify auth error:', error)
    return NextResponse.redirect('/error?message=spotify_auth_error')
  }

  if (!code || !state) {
    return NextResponse.redirect('/error?message=missing_params')
  }

  try {
    const spotify = SpotifyService.getInstance()
    await spotify.handleCallback(code, state)
    return NextResponse.redirect('/')
  } catch (err) {
    console.error('Spotify callback error:', err)
    return NextResponse.redirect('/error?message=auth_failed')
  }
} 