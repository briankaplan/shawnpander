import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

const SPOTIFY_AUTH_URL = 'https://accounts.spotify.com/authorize'
const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID
const REDIRECT_URI = `${process.env.NEXT_PUBLIC_SITE_URL}/api/spotify/callback`
const SCOPES = [
  'user-read-currently-playing',
  'user-modify-playback-state',
  'user-read-playback-state',
  'streaming',
  'user-read-email',
  'user-read-private'
]

export async function GET() {
  const state = Math.random().toString(36).substring(7)

  const params = new URLSearchParams({
    response_type: 'code',
    client_id: CLIENT_ID!,
    scope: SCOPES.join(' '),
    redirect_uri: REDIRECT_URI,
    state: state
  })

  // Store state in a cookie for validation when the user returns
  cookies().set('spotify_auth_state', state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 3600 // 1 hour
  })

  return redirect(`${SPOTIFY_AUTH_URL}?${params.toString()}`)
}