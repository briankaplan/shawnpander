import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Paths that don't require authentication
const publicPaths = [
  '/',
  '/music',
  '/api/spotify/auth',
  '/api/spotify/callback',
  '/error',
  '/terms',
  '/consent',
  '/consent-form',
  '/consent-success'
]

export function middleware(request: NextRequest) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname

  // Check if the path is public
  if (publicPaths.some(publicPath => path.startsWith(publicPath))) {
    return NextResponse.next()
  }

  // Check for authentication
  const hasSpotifyToken = request.cookies.get('spotify_access_token')
  const hasAdminToken = request.cookies.get('admin_token')

  // Admin paths require admin token
  if (path.startsWith('/admin') && !hasAdminToken) {
    const errorUrl = new URL('/error', request.url)
    errorUrl.searchParams.set('message', 'Unauthorized')
    return NextResponse.redirect(errorUrl)
  }

  // Protected paths require Spotify token
  if (!hasSpotifyToken) {
    const authUrl = new URL('/api/spotify/auth', request.url)
    return NextResponse.redirect(authUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public directory files
     */
    '/((?!_next/static|_next/image|favicon.ico|public/|images/|icons/).*)'
  ]
}