'use client'

import { useState, useEffect, useCallback } from 'react'
import type { SpotifyAlbum, SpotifyTrack, SpotifyState } from '@/types/music'
import { mockAlbums } from '@/lib/mockAlbums'

interface UseSpotifyDataProps {
  selectedAlbumId?: string
}

export function useSpotifyData({ selectedAlbumId }: UseSpotifyDataProps = {}): SpotifyState {
  const [albums, setAlbums] = useState<SpotifyAlbum[]>([])
  const [currentAlbum, setCurrentAlbum] = useState<SpotifyAlbum | null>(null)
  const [currentTrack, setCurrentTrack] = useState<SpotifyTrack | null>(null)
  const [loading, setLoading] = useState(true)
  const [isPlaying, setIsPlaying] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [progress, setProgress] = useState(0)
  const [volume, setVolumeState] = useState(0.7)
  const [isMuted, setIsMuted] = useState(false)

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        // In a real app, this would fetch from Spotify API
        setAlbums(mockAlbums)
        const initialAlbum = selectedAlbumId 
          ? mockAlbums.find(album => album.id === selectedAlbumId) 
          : mockAlbums[0]
          
        if (initialAlbum) {
          setCurrentAlbum(initialAlbum)
          if (initialAlbum.tracks.length > 0) {
            setCurrentTrack(initialAlbum.tracks[0])
          }
        }
        setLoading(false)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch albums')
        setLoading(false)
      }
    }

    fetchAlbums()
  }, [selectedAlbumId])

  // Update current album when selectedAlbumId changes
  useEffect(() => {
    if (selectedAlbumId) {
      const album = mockAlbums.find(album => album.id === selectedAlbumId)
      if (album) {
        setCurrentAlbum(album)
        if (album.tracks.length > 0) {
          setCurrentTrack(album.tracks[0])
          setProgress(0)
        }
      }
    }
  }, [selectedAlbumId])

  // Simulate progress updates when playing
  useEffect(() => {
    let progressInterval: NodeJS.Timeout | null = null

    if (isPlaying && currentTrack) {
      progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            nextTrack()
            return 0
          }
          return prev + 1
        })
      }, currentTrack.duration / 100)
    }

    return () => {
      if (progressInterval) {
        clearInterval(progressInterval)
      }
    }
  }, [isPlaying, currentTrack])

  const selectAlbum = useCallback((album: SpotifyAlbum) => {
    setCurrentAlbum(album)
    if (album.tracks.length > 0) {
      setCurrentTrack(album.tracks[0])
      setProgress(0)
    }
  }, [])

  const selectTrack = useCallback((track: SpotifyTrack) => {
    setCurrentTrack(track)
    setIsPlaying(true)
    setProgress(0)
  }, [])

  const togglePlay = useCallback(() => {
    setIsPlaying((prev) => !prev)
  }, [])

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => !prev)
  }, [])

  const setVolume = useCallback((newVolume: number) => {
    setVolumeState(newVolume)
    if (newVolume > 0) {
      setIsMuted(false)
    }
  }, [])

  const seekTo = useCallback((position: number) => {
    setProgress(position)
  }, [])

  const nextTrack = useCallback(() => {
    if (!currentAlbum || !currentTrack) return

    const currentIndex = currentAlbum.tracks.findIndex(track => track.id === currentTrack.id)
    if (currentIndex < currentAlbum.tracks.length - 1) {
      setCurrentTrack(currentAlbum.tracks[currentIndex + 1])
      setProgress(0)
    } else if (currentIndex === currentAlbum.tracks.length - 1) {
      // If it's the last track, find the next album
      const albumIndex = albums.findIndex(album => album.id === currentAlbum.id)
      if (albumIndex < albums.length - 1) {
        const nextAlbum = albums[albumIndex + 1]
        setCurrentAlbum(nextAlbum)
        if (nextAlbum.tracks.length > 0) {
          setCurrentTrack(nextAlbum.tracks[0])
          setProgress(0)
        }
      }
    }
  }, [currentAlbum, currentTrack, albums])

  const previousTrack = useCallback(() => {
    if (!currentAlbum || !currentTrack) return

    const currentIndex = currentAlbum.tracks.findIndex(track => track.id === currentTrack.id)
    if (currentIndex > 0) {
      setCurrentTrack(currentAlbum.tracks[currentIndex - 1])
      setProgress(0)
    } else if (currentIndex === 0) {
      // If it's the first track, find the previous album
      const albumIndex = albums.findIndex(album => album.id === currentAlbum.id)
      if (albumIndex > 0) {
        const prevAlbum = albums[albumIndex - 1]
        setCurrentAlbum(prevAlbum)
        if (prevAlbum.tracks.length > 0) {
          setCurrentTrack(prevAlbum.tracks[prevAlbum.tracks.length - 1])
          setProgress(0)
        }
      }
    }
  }, [currentAlbum, currentTrack, albums])

  return {
    albums,
    currentAlbum,
    currentTrack,
    loading,
    isPlaying,
    error,
    progress,
    volume,
    isMuted,
    selectAlbum,
    selectTrack,
    togglePlay,
    toggleMute,
    setVolume,
    seekTo,
    nextTrack,
    previousTrack
  }
}