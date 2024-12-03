'use client'

import Image from 'next/image'
import { ExternalLink } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { SpotifyAlbum } from '@/types/music'

interface AlbumGridProps {
  albums: SpotifyAlbum[]
  selectedAlbumId: string
  onAlbumSelect: (album: SpotifyAlbum) => void
}

export function AlbumGrid({ albums, selectedAlbumId, onAlbumSelect }: AlbumGridProps) {
  const isUpcoming = (album: SpotifyAlbum) => {
    if (!album.releaseDate) return false
    return new Date(album.releaseDate) > new Date()
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mt-12">
      {albums.map((album, index) => {
        const upcoming = isUpcoming(album)
        const selected = album.id === selectedAlbumId

        return (
          <div
            key={album.id}
            className={cn(
              "group cursor-pointer relative",
              "transition-all duration-300",
              "opacity-0 translate-y-4 animate-fade-in",
              "hover:scale-105 active:scale-95"
            )}
            style={{ animationDelay: `${index * 0.1}s` }}
            onClick={() => onAlbumSelect(album)}
          >
            {/* Album Cover */}
            <div className={cn(
              "relative aspect-square rounded-lg overflow-hidden",
              "border-2",
              selected 
                ? "border-orange-500 shadow-lg shadow-orange-500/20" 
                : "border-transparent hover:border-orange-500/50"
            )}>
              <Image
                src={album.image}
                alt={album.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
              />
              <div className={cn(
                "absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent",
                "opacity-0 group-hover:opacity-100 transition-opacity",
                "flex flex-col justify-end p-4"
              )}>
                <h3 className="text-lg font-bold text-white mb-1">{album.title}</h3>
                <p className="text-sm text-white/80">{album.year}</p>
                {album.streamingLinks && (
                  <div className="flex gap-2 mt-2">
                    {Object.entries(album.streamingLinks).map(([platform, url]) => (
                      <a
                        key={platform}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-orange-400 hover:text-orange-300 transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ExternalLink size={16} />
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Status Badge */}
            {upcoming && (
              <div className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
                Coming Soon
              </div>
            )}

            {/* Album Info (Mobile) */}
            <div className="mt-2 md:hidden">
              <h3 className="text-sm font-medium text-white">{album.title}</h3>
              <p className="text-xs text-white/60">{album.year}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}