import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  const state = searchParams.get('state')
  const error = searchParams.get('error')

  if (error) {
    console.error('Apple Music auth error:', error)
    return NextResponse.redirect('/error?message=apple_music_auth_error')
  }

  if (!code || !state) {
    return NextResponse.redirect('/error?message=missing_params')
  }

  try {
    // Handle successful authentication
    return NextResponse.redirect('/')
  } catch (err) {
    console.error('Apple Music callback error:', err)
    return NextResponse.redirect('/error?message=auth_failed')
  }
} 