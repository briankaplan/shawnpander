'use client'

import React, { useState, useEffect } from 'react'
import { useAlbumMetadata } from '@/hooks/useAlbumMetadata'
import { useSpotifyAuth } from '@/hooks/useSpotifyAuth'
import { useMusicPlatform } from '@/contexts/MusicPlatformContext'

interface VinylProps {
  selectedAlbumId: string
}

const Vinyl: React.FC<VinylProps> = ({ selectedAlbumId }) => {
  const { metadata, loading } = useAlbumMetadata(selectedAlbumId)
  const { isAuthenticated, login } = useSpotifyAuth()
  const { isPlaying, togglePlayPause } = useMusicPlatform()
  const [rotation, setRotation] = useState(0)

  useEffect(() => {
    let animationFrame: number

    const animate = () => {
      if (isPlaying) {
        setRotation((prev) => (prev + 1) % 360)
        animationFrame = requestAnimationFrame(animate)
      }
    }

    if (isPlaying) {
      animationFrame = requestAnimationFrame(animate)
    }

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [isPlaying])

  const handlePlay = () => {
    if (!isAuthenticated) {
      login()
      return
    }

    togglePlayPause()
  }

  if (loading || !metadata) {
    return <div>Loading...</div>
  }

  return (
    <div className="vinyl-container">
      <div
        className="vinyl"
        style={{
          transform: `rotate(${rotation}deg)`,
        }}
        onClick={handlePlay}
      >
        <img
          src={metadata.artwork}
          alt={metadata.name}
          className="vinyl-artwork"
        />
      </div>
    </div>
  )
}

export default Vinyl