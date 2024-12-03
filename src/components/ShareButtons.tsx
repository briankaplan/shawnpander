'use client'

import { Share2, Twitter, Facebook, Link } from 'lucide-react'
import { StreamingLinks, type ServiceType } from './StreamingLinks'

interface ShareButtonsProps {
  track: {
    title: string
    url: string
    streamingLinks: Record<ServiceType, string>
  }
  activeService?: ServiceType
}

export function ShareButtons({ track, activeService }: ShareButtonsProps) {
  const shareText = `Check out "${track.title}" by Shawn Pander`
  
  const shareViaTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(track.url)}`)
  }

  const shareViaFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(track.url)}`)
  }

  const copyLink = async () => {
    await navigator.clipboard.writeText(track.url)
    // Show toast notification
  }

  return (
    <div className="space-y-6">
      <StreamingLinks links={track.streamingLinks} activeService={activeService} />
      <div className="flex gap-2">
        <button onClick={shareViaTwitter}>
          <Twitter className="w-5 h-5" />
        </button>
        <button onClick={shareViaFacebook}>
          <Facebook className="w-5 h-5" />
        </button>
        <button onClick={copyLink}>
          <Link className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}