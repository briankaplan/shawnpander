'use client'

import { VinylPlayer } from '@/components/sections/Vinyl'
import { Discography } from '@/components/sections/Discography'
import { useState } from 'react'
import { mockAlbums } from '@/lib/mockAlbums'
import Image from 'next/image'
import type { SpotifyAlbum } from '@/types/music'
import { cn } from '@/lib/utils'

export default function MusicPage() {
  const [selectedAlbum, setSelectedAlbum] = useState<SpotifyAlbum>(mockAlbums[0])

  return (
    <main className="min-h-screen bg-black">
      <div className="opacity-0 animate-fade-in">
        {/* Hero Section */}
        <section className="relative h-[60vh] flex items-center justify-center">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-b from-[#2D0808] via-[#3D0A0A] to-black" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(234,88,12,0.3),transparent_70%)]" />
          </div>

          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Album Cover */}
              <div className="relative aspect-square max-w-md mx-auto opacity-0 scale-95 animate-fade-in">
                <Image
                  src={selectedAlbum.image}
                  alt={selectedAlbum.title}
                  fill
                  className={cn(
                    "object-cover rounded-lg shadow-2xl",
                    "transition-transform duration-300 hover:scale-105"
                  )}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>

              {/* Album Details */}
              <div className="text-center md:text-left space-y-6 opacity-0 translate-y-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                <h1 className="text-4xl md:text-6xl font-bold text-white">{selectedAlbum.title}</h1>
                <p className="text-xl md:text-2xl text-orange-200/70">{selectedAlbum.year}</p>

                {/* Streaming Links */}
                <div className="flex flex-wrap gap-4 justify-center md:justify-start mt-8">
                  {selectedAlbum.streamingLinks?.spotify && (
                    <a
                      href={selectedAlbum.streamingLinks.spotify}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-black/30 backdrop-blur-sm px-6 py-3 rounded-full flex items-center gap-3 text-orange-200/70 hover:text-orange-400 transition-all duration-300 transform hover:scale-105"
                    >
                      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                      </svg>
                      <span>Spotify</span>
                    </a>
                  )}
                  {selectedAlbum.streamingLinks?.appleMusic && (
                    <a
                      href={selectedAlbum.streamingLinks.appleMusic}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-black/30 backdrop-blur-sm px-6 py-3 rounded-full flex items-center gap-3 text-orange-200/70 hover:text-orange-400 transition-all duration-300 transform hover:scale-105"
                    >
                      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M23.997 6.124c0-.738-.065-1.47-.24-2.19-.317-1.31-1.062-2.31-2.18-3.043C21.003.517 20.373.285 19.7.164c-.517-.093-1.038-.137-1.563-.132-.04-.003-.083-.01-.124-.013H5.988c-.152.01-.303.017-.455.026C4.786.07 4.043.15 3.34.428 2.004.958 1.04 1.88.475 3.208c-.192.448-.292.925-.363 1.408-.056.392-.088.785-.1 1.18 0 .032-.007.062-.01.093v12.223c.01.14.017.283.027.424.05.815.154 1.624.497 2.373.65 1.42 1.738 2.353 3.234 2.802.42.127.856.187 1.293.228.555.053 1.11.06 1.667.06h11.03c.525 0 1.048-.034 1.57-.1.823-.106 1.597-.35 2.296-.81.84-.553 1.472-1.287 1.88-2.208.186-.42.293-.87.37-1.324.113-.675.138-1.358.137-2.04-.002-3.8 0-7.595-.003-11.393zm-6.423 3.99v5.712c0 .417-.058.827-.244 1.206-.29.59-.76.962-1.388 1.14-.35.1-.706.157-1.07.173-.95.045-1.773-.6-1.943-1.536-.142-.773.227-1.624 1.038-2.022.323-.16.67-.25 1.018-.324.378-.082.758-.153 1.134-.24.274-.063.457-.23.51-.516.014-.063.02-.13.02-.193 0-1.815 0-3.63-.002-5.443 0-.062-.01-.125-.026-.185-.04-.15-.15-.243-.304-.234-.16.01-.318.035-.475.066-.76.15-1.52.303-2.28.456l-2.326.47-1.374.278c-.016.003-.032.01-.048.013-.277.077-.377.203-.39.49-.002.042 0 .086 0 .13-.002 2.602 0 5.204-.003 7.805 0 .42-.047.836-.215 1.227-.278.64-.77 1.04-1.434 1.233-.35.1-.71.16-1.075.172-.96.036-1.755-.6-1.92-1.544-.14-.812.23-1.685 1.154-2.075.357-.15.73-.232 1.108-.31.287-.06.575-.116.86-.177.383-.083.583-.323.6-.714v-.15c0-2.96 0-5.922.002-8.882 0-.123.013-.25.042-.37.07-.285.273-.448.546-.518.255-.066.515-.112.774-.165.733-.15 1.466-.296 2.2-.444l2.27-.46c.67-.134 1.34-.27 2.01-.403.22-.043.443-.088.664-.106.31-.025.523.17.554.482.008.073.012.148.012.223.002 1.91.002 3.822 0 5.732z"/>
                      </svg>
                      <span>Apple Music</span>
                    </a>
                  )}
                  {selectedAlbum.streamingLinks?.amazonMusic && (
                    <a
                      href={selectedAlbum.streamingLinks.amazonMusic}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-black/30 backdrop-blur-sm px-6 py-3 rounded-full flex items-center gap-3 text-orange-200/70 hover:text-orange-400 transition-all duration-300 transform hover:scale-105"
                    >
                      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm6.85 17.14c-.12.17-.32.27-.54.27-.1 0-.19-.02-.28-.05-1.78-.76-3.67-1.15-5.61-1.15-1.93 0-3.82.39-5.61 1.15-.09.04-.18.05-.28.05-.22 0-.42-.1-.54-.27-.19-.27-.13-.64.13-.84 2.02-.87 4.18-1.31 6.3-1.31s4.28.44 6.3 1.31c.26.2.32.57.13.84zm1.61-3.53c-.16.22-.41.34-.67.34-.11 0-.22-.02-.33-.07-2.07-.89-4.27-1.35-6.52-1.35s-4.45.46-6.52 1.35c-.11.05-.22.07-.33.07-.26 0-.51-.12-.67-.34-.23-.31-.16-.75.15-.98 2.34-1.02 4.83-1.53 7.37-1.53s5.03.51 7.37 1.53c.31.23.38.67.15.98z"/>
                      </svg>
                      <span>Amazon Music</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Vinyl Player Section */}
        <VinylPlayer selectedAlbumId={selectedAlbum.id} />

        {/* Discography Section */}
        <Discography 
          selectedAlbumId={selectedAlbum.id}
          onAlbumSelect={setSelectedAlbum}
        />

        {/* Background Gradient */}
        <div className="fixed inset-0 pointer-events-none bg-gradient-to-t from-black via-transparent to-black z-0" />
      </div>
    </main>
  )
}