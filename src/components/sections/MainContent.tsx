'use client'

import DynamicHeader from './DynamicHeader'
import { MusicSection } from './Music'
import { ShowsSection } from './Shows'
import { AboutSection } from './About'
import { Contact } from './Contact'
import { Announcement } from './Landing/Announcement'

export function MainContent() {
  return (
    <main className="relative z-10 flex min-h-screen flex-col bg-gradient-to-b from-black via-orange-950/5 to-black">
      <DynamicHeader />
      
      <div className="relative z-20 space-y-8">
        <ShowsSection />
        <MusicSection />
        <AboutSection />
        <Announcement />
        <Contact />
      </div>
    </main>
  )
}