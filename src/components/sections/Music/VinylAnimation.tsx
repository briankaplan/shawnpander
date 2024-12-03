'use client'

import { motion, useAnimation } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

interface VinylAnimationProps {
  coverUrl: string
  isPlaying: boolean
  onFlip?: () => void
  currentSide?: 'A' | 'B'
}

export function VinylAnimation({ coverUrl, isPlaying, onFlip, currentSide = 'A' }: VinylAnimationProps) {
  const controls = useAnimation()
  const tonearmControls = useAnimation()
  const rotationRef = useRef(0)

  useEffect(() => {
    if (isPlaying) {
      controls.start({
        rotate: 360,
        transition: {
          duration: 2,
          repeat: Infinity,
          ease: "linear"
        }
      })
      tonearmControls.start({
        rotate: 25,
        transition: {
          type: "spring",
          stiffness: 45,
          damping: 15
        }
      })
    } else {
      controls.stop()
      tonearmControls.start({
        rotate: 0,
        transition: {
          type: "spring",
          stiffness: 45,
          damping: 15
        }
      })
    }
  }, [isPlaying, controls, tonearmControls])

  const handleFlip = async () => {
    if (isPlaying) return

    await controls.start({
      rotateY: 180,
      transition: {
        duration: 0.6,
        ease: "easeInOut"
      }
    })
    onFlip?.()
    await controls.start({
      rotateY: 0,
      transition: {
        duration: 0.6,
        ease: "easeInOut"
      }
    })
  }

  return (
    <div className="vinyl-player relative w-full h-full">
      {/* Base plate */}
      <div className="absolute inset-0 bg-zinc-900 rounded-lg shadow-2xl" />

      {/* Platter */}
      <div className="absolute inset-[10%] bg-zinc-800 rounded-full shadow-inner">
        {/* Vinyl record */}
        <motion.div
          className="absolute inset-0"
          animate={controls}
          style={{ transformOrigin: "center center" }}
        >
          {/* Grooves */}
          <div className="absolute inset-0 rounded-full"
            style={{
              background: "repeating-radial-gradient(circle at center, transparent 0, transparent 2px, rgba(0,0,0,0.2) 3px, rgba(0,0,0,0.2) 4px)"
            }}
          />

          {/* Label */}
          <div className="absolute inset-[30%] rounded-full overflow-hidden">
            <Image
              src={coverUrl}
              alt="Album cover"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className={cn(
                "text-4xl font-bold text-white/20 rotate-90",
                currentSide === 'B' && "rotate-[270deg]"
              )}>
                SIDE {currentSide}
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Tonearm */}
      <motion.div
        className="absolute -top-[5%] -right-[5%] w-[30%] h-[40%] z-10"
        animate={tonearmControls}
        style={{ transformOrigin: "top right" }}
      >
        <div className="absolute top-0 right-0 w-8 h-8 bg-zinc-700 rounded-full shadow-lg" />
        <div className="absolute top-8 right-4 w-2 h-[calc(100%-2rem)] bg-zinc-700 origin-top transform -rotate-45 shadow-lg" />
        <div className="absolute bottom-0 right-0 w-4 h-4 bg-zinc-600 rounded-full shadow-md" />
      </motion.div>

      {/* Flip button */}
      <button
        onClick={handleFlip}
        disabled={isPlaying}
        className={cn(
          "absolute bottom-4 right-4 p-2 rounded-full",
          "bg-orange-500 text-white shadow-lg",
          "hover:bg-orange-600 transition-colors",
          "disabled:opacity-50 disabled:cursor-not-allowed"
        )}
      >
        Flip Record
      </button>
    </div>
  )
} 