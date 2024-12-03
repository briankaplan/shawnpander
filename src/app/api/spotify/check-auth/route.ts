import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import spotifyApi from '@/lib/spotify'

export async function GET() {
  const cookieStore = cookies()
  const accessToken = cookieStore.get('spotify_access_token')?.value
  const refreshToken = cookieStore.get('spotify_refresh_token')?.value

  if (!accessToken) {
    return NextResponse.json({ isAuthenticated: false })
  }

  try {
    // Try to use the access token
    spotifyApi.setAccessToken(accessToken)
    await spotifyApi.getMe()

    return NextResponse.json({
      isAuthenticated: true,
      accessToken
    })
  } catch (error) {
    // Token might be expired, try to refresh
    if (refreshToken) {
      try {
        spotifyApi.setRefreshToken(refreshToken)
        const data = await spotifyApi.refreshAccessToken()
        const { access_token, expires_in } = data.body

        // Update cookie with new access token
        cookieStore.set('spotify_access_token', access_token, {
          maxAge: expires_in,
          secure: process.env.NODE_ENV === 'production',
          httpOnly: true,
          sameSite: 'lax'
        })

        return NextResponse.json({
          isAuthenticated: true,
          accessToken: access_token
        })
      } catch (refreshError) {
        console.error('Failed to refresh token:', refreshError)
      }
    }

    return NextResponse.json({ isAuthenticated: false })
  }
} 