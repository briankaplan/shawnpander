'use client'

import { useState, useEffect, useCallback } from 'react'
import { useAnimation, AnimationControls } from 'framer-motion'
import { usePlayback } from './usePlayback'
import { useMusicPlatform } from '@/contexts/MusicPlatformContext'

interface VinylAnimations extends Record<string, AnimationControls> {
  tonearm: AnimationControls
  vinyl: AnimationControls
  label: AnimationControls
  reflection: AnimationControls
  grooves: AnimationControls
  dust: AnimationControls
  shadow: AnimationControls
  surface: AnimationControls
  platter: AnimationControls
}

export function useVinylPlayer(selectedAlbumId: string) {
  const { isPlaying, track } = usePlayback()
  const { canPlayInline } = useMusicPlatform()
  const [rotation, setRotation] = useState(0)
  const [isChangingTrack, setIsChangingTrack] = useState(false)
  const [showDetails, setShowDetails] = useState(false)

  // Initialize all animation controls
  const animations = Object.fromEntries(
    ['tonearm', 'vinyl', 'label', 'reflection', 'grooves', 'dust', 'shadow', 'surface', 'platter']
      .map(key => [key, useAnimation()])
  ) as VinylAnimations

  // Vinyl rotation and effects animation
  useEffect(() => {
    let animationFrame: number

    const animate = () => {
      setRotation(prev => (prev + 1) % 360)
      animationFrame = requestAnimationFrame(animate)
    }

    if (isPlaying && canPlayInline && !isChangingTrack) {
      animate()
      
      // Add subtle reflection animation
      animations.reflection.start({
        opacity: [0.3, 0.5, 0.3],
        transition: { duration: 2, repeat: Infinity }
      })

      // Add groove shimmer effect
      animations.grooves.start({
        backgroundPosition: ['0% 0%', '100% 100%'],
        transition: { duration: 3, repeat: Infinity }
      })

      // Add floating dust particles
      animations.dust.start({
        opacity: [0, 1, 0],
        y: [-10, 10],
        x: [-10, 10],
        scale: [0.8, 1.2],
        transition: {
          duration: 4,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut'
        }
      })

      // Add dynamic shadow
      animations.shadow.start({
        scale: [1, 1.02, 1],
        opacity: [0.2, 0.3, 0.2],
        transition: {
          duration: 2,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut'
        }
      })

      // Add surface noise animation
      animations.surface.start({
        backgroundPosition: ['0% 0%', '100% 100%'],
        transition: {
          duration: 20,
          repeat: Infinity,
          ease: 'linear'
        }
      })

      // Add subtle warping effect
      animations.vinyl.start({
        scale: [1, 1.001, 1],
        transition: {
          duration: 4,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut'
        }
      })

      // Add platter rotation
      animations.platter.start({
        rotate: 360,
        transition: {
          duration: 2,
          repeat: Infinity,
          ease: 'linear'
        }
      })
    } else {
      // Stop all effect animations
      animations.reflection.stop()
      animations.grooves.stop()
      animations.dust.stop()
      animations.shadow.stop()
      animations.surface.stop()
      animations.vinyl.stop()
      animations.platter.stop()
    }

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [isPlaying, canPlayInline, isChangingTrack, animations])

  // Enhanced track change animation
  const handleTrackChange = useCallback(async () => {
    setIsChangingTrack(true)

    try {
      // Lift tonearm with realistic physics
      await animations.tonearm.start({
        rotate: [-25, -45],
        transition: {
          type: 'spring',
          stiffness: 100,
          damping: 15,
          restDelta: 0.001
        }
      })

      // Slow down vinyl with realistic physics
      await Promise.all([
        animations.vinyl.start({
          rotate: rotation,
          transition: {
            type: 'spring',
            stiffness: 20,
            damping: 30,
            restDelta: 0.001
          }
        }),
        animations.platter.start({
          rotate: 0,
          transition: {
            duration: 2,
            ease: 'easeOut'
          }
        })
      ])

      // Add record change animation
      await Promise.all([
        animations.vinyl.start({
          opacity: 0,
          y: 20,
          transition: { duration: 0.3 }
        }),
        animations.label.start({
          scale: 0.9,
          opacity: 0,
          transition: { duration: 0.3 }
        })
      ])

      // Bring in new record
      await Promise.all([
        animations.vinyl.start({
          opacity: 1,
          y: 0,
          transition: {
            type: 'spring',
            stiffness: 300,
            damping: 25
          }
        }),
        animations.label.start({
          scale: 1,
          opacity: 1,
          transition: {
            type: 'spring',
            stiffness: 400,
            damping: 25
          }
        })
      ])

      if (isPlaying) {
        // Lower tonearm with realistic physics
        await animations.tonearm.start({
          rotate: -25,
          transition: {
            type: 'spring',
            stiffness: 100,
            damping: 15,
            restDelta: 0.001
          }
        })
      }
    } finally {
      setIsChangingTrack(false)
    }
  }, [isPlaying, rotation, animations])

  useEffect(() => {
    if (track?.id) {
      handleTrackChange()
    }
  }, [track?.id, handleTrackChange])

  return {
    rotation,
    isChangingTrack,
    showDetails,
    setShowDetails,
    animations,
    handleTrackChange
  }
}