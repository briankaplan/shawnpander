import { NextRequest, NextResponse } from 'next/server'

interface ContentItem {
  content: string
  style?: Record<string, string>
  updatedAt: string
}

const staticContent: Record<string, ContentItem> = {
  header: {
    content: 'Forever & For Now',
    style: {
      color: 'text-teal-500',
      fontSize: 'text-6xl md:text-8xl',
      fontWeight: 'font-bold'
    },
    updatedAt: new Date().toISOString()
  },
  subtitle: {
    content: 'Experience the Sound',
    style: {
      color: 'text-zinc-400',
      fontSize: 'text-xl md:text-2xl',
      fontWeight: 'normal'
    },
    updatedAt: new Date().toISOString()
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type')

    if (!type) {
      return NextResponse.json(
        { error: 'Content type is required' },
        { status: 400 }
      )
    }

    const content = staticContent[type]

    if (!content) {
      return NextResponse.json(
        { error: 'Content not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ data: content })

  } catch (error) {
    console.error('Error fetching content:', error)
    return NextResponse.json(
      { error: 'Failed to fetch content' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  )
}