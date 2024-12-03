import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import spotifyApi from '@/lib/spotify'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  const error = searchParams.get('error')

  if (error || !code) {
    return NextResponse.redirect(new URL('/?error=spotify_auth_failed', request.url))
  }

  try {
    const data = await spotifyApi.authorizationCodeGrant(code)
    const { access_token, refresh_token, expires_in } = data.body

    // Store tokens in cookies
    const cookieStore = cookies()
    cookieStore.set('spotify_access_token', access_token, {
      maxAge: expires_in,
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      sameSite: 'lax'
    })
    cookieStore.set('spotify_refresh_token', refresh_token, {
      maxAge: 30 * 24 * 60 * 60, // 30 days
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      sameSite: 'lax'
    })

    return NextResponse.redirect(new URL('/?success=true', request.url))
  } catch (error) {
    console.error('Spotify auth error:', error)
    return NextResponse.redirect(new URL('/?error=spotify_auth_failed', request.url))
  }
}