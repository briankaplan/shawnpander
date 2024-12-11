import { ShowsSection } from '@/components/sections/Shows'
import { MusicSection } from '@/components/sections/Music'
import { AboutSection } from '@/components/sections/About'

export default function HomePage() {
  return (
    <main className="flex-1">
      <div className="space-y-16 py-16">
        <ShowsSection />
        <MusicSection />
        <AboutSection />
      </div>
    </main>
  )
}