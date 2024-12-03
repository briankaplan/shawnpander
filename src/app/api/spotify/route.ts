import { NextRequest, NextResponse } from 'next/server'
import SpotifyWebApi from 'spotify-web-api-node'

export async function GET(request: NextRequest) {
  return NextResponse.json({ message: 'Spotify integration coming soon' }, { status: 503 })
}