'use client'

export function MusicLayoutContent({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="relative min-h-screen bg-black">
      {children}

      {/* Music-specific footer content */}
      <footer className="relative z-10 py-8 px-4 text-center text-white/60 text-sm">
        <p>© {new Date().getFullYear()} Shawn Pander. All rights reserved.</p>
        <p className="mt-2">
          Music available on{' '}
          <a 
            href="https://spotify.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-orange-500 hover:text-orange-400 transition-colors"
          >
            Spotify
          </a>
          {', '}
          <a 
            href="https://music.apple.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-orange-500 hover:text-orange-400 transition-colors"
          >
            Apple Music
          </a>
          {' and '}
          <a 
            href="https://soundcloud.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-orange-500 hover:text-orange-400 transition-colors"
          >
            SoundCloud
          </a>
        </p>
      </footer>

      {/* Background noise texture */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-[0.015] z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          filter: 'contrast(320%) brightness(100%)'
        }}
      />
    </div>
  )
}