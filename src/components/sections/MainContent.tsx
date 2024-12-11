'use client'

import { MusicSection } from '@/components/sections/Music'
import { ShowsSection } from '@/components/sections/Shows'
import { PressSection } from '@/components/sections/Press'
import { ConnectSection } from '@/components/sections/Connect'
import { Hero } from '@/components/sections/Hero'
import { CONFIG } from '@/config'

export function MainContent() {
  const { sections } = CONFIG.site

  return (
    <main>
      <Hero />
      {sections.music.enabled && <MusicSection />}
      {sections.shows.enabled && <ShowsSection />}
      {sections.press.enabled && <PressSection />}
      {sections.connect.enabled && <ConnectSection />}
    </main>
  )
}