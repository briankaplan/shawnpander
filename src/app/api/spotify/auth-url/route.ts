import { NextResponse } from 'next/server'
import spotifyApi from '@/lib/spotify'

const scopes = [
  'user-read-private',
  'user-read-email',
  'user-read-playback-state',
  'user-modify-playback-state',
  'streaming',
  'user-read-currently-playing'
]

export async function GET() {
  const state = Math.random().toString(36).substring(7)
  const authUrl = spotifyApi.createAuthorizeURL(scopes, state)

  return NextResponse.json({ url: authUrl })
} 