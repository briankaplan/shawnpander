'use client'

import Script from 'next/script'
import { MUSIC_CONFIG } from '@/config/music'

interface MusicKitScriptProps {}

const MusicKitScript: React.FC<MusicKitScriptProps> = () => {
  return (
    <Script
      src={MUSIC_CONFIG.apple.musicKitScript}
      strategy="afterInteractive"
      id="apple-music-kit"
    />
  )
}

export type { MusicKitScriptProps }
export { MusicKitScript }
export default MusicKitScript 