'use client'

export function Silhouette() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="relative w-[40vh] h-[40vh] opacity-0 scale-95 animate-fade-in"
          style={{
            animation: 'fade-in 1s ease-out forwards',
            animationDelay: '0.5s'
          }}
        >
          {/* Silhouette */}
          <div 
            className="absolute inset-0"
            style={{
              background: `url('/images/albums/header.webp')`,
              backgroundSize: 'contain',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              filter: 'brightness(0) contrast(1)',
              opacity: 0.8,
              mixBlendMode: 'multiply'
            }}
          />
          
          {/* Retro Sun Effect */}
          <div 
            className="absolute inset-0"
            style={{
              background: `radial-gradient(circle at center, rgba(234,88,12,0.4) 0%, transparent 70%)`,
              mixBlendMode: 'screen'
            }}
          />
          
          {/* Horizontal Lines */}
          <div 
            className="absolute inset-0"
            style={{
              background: `repeating-linear-gradient(
                0deg,
                transparent,
                transparent 2px,
                rgba(234,88,12,0.1) 2px,
                rgba(234,88,12,0.1) 4px
              )`,
              mixBlendMode: 'overlay'
            }}
          />
        </div>
      </div>
    </div>
  )
}