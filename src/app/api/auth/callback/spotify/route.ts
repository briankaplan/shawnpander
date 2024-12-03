import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  const error = searchParams.get('error')

  if (error) {
    console.error('Spotify auth error:', error)
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}?error=${error}`)
  }

  if (!code) {
    console.error('No code provided')
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}?error=no_code`)
  }

  try {
    const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${Buffer.from(
          `${process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
        ).toString('base64')}`,
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: process.env.SPOTIFY_REDIRECT_URI!,
      }),
    })

    const data = await tokenResponse.json()

    if (!tokenResponse.ok) {
      console.error('Token response error:', data)
      throw new Error(data.error_description || 'Failed to get access token')
    }

    const params = new URLSearchParams({
      access_token: data.access_token,
      refresh_token: data.refresh_token,
      expires_in: data.expires_in.toString()
    })

    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL}#${params.toString()}`
    )
  } catch (error) {
    console.error('Spotify auth error:', error)
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL}?error=token_error`
    )
  }
} 