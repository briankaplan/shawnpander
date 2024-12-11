import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { SpotifyService } from '@/services/spotifyService'
import { AppleMusicService } from '@/services/appleMusicService'

export async function GET(
  request: Request,
  { params }: { params: { platform: string } }
) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  const state = searchParams.get('state')
  const error = searchParams.get('error')

  if (error) {
    console.error(`${params.platform} auth error:`, error)
    return NextResponse.redirect('/error?message=auth_failed')
  }

  if (!code || !state) {
    return NextResponse.redirect('/error?message=missing_params')
  }

  try {
    let service
    switch (params.platform) {
      case 'spotify':
        service = SpotifyService.getInstance()
        await service.handleCallback(code, state)
        break
      case 'apple':
        service = AppleMusicService.getInstance()
        await service.handleCallback(code, state)
        break
      default:
        throw new Error('Invalid platform')
    }

    // Store auth state in a cookie
    cookies().set(`${params.platform}_auth`, 'true', {
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7 // 1 week
    })

    return NextResponse.redirect('/')
  } catch (err) {
    console.error('Auth callback error:', err)
    return NextResponse.redirect('/error?message=auth_failed')
  }
} 