'use client'

import { useEffect, useRef } from 'react'
import { motion, useAnimation, useInView } from 'framer-motion'

const BIRD_COUNT = 5
const BIRD_SIZE = 20
const BIRD_SPEED = 2

interface Bird {
  id: number
  x: number
  y: number
  direction: number
}

interface BirdControls {
  [key: string]: {
    x: number
    y: number
    rotate: number
  }
}

export function Birds() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef)
  const controls = useAnimation()
  const birdsRef = useRef<Bird[]>([])
  const birdControlsRef = useRef<BirdControls>({})

  useEffect(() => {
    if (!isInView) return

    birdsRef.current = Array.from({ length: BIRD_COUNT }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      direction: Math.random() * Math.PI * 2
    }))

    let animationFrameId: number

    const animate = () => {
      birdsRef.current.forEach(bird => {
        bird.x += Math.cos(bird.direction) * BIRD_SPEED
        bird.y += Math.sin(bird.direction) * BIRD_SPEED

        if (bird.x < -BIRD_SIZE) bird.x = window.innerWidth + BIRD_SIZE
        if (bird.x > window.innerWidth + BIRD_SIZE) bird.x = -BIRD_SIZE
        if (bird.y < -BIRD_SIZE) bird.y = window.innerHeight + BIRD_SIZE
        if (bird.y > window.innerHeight + BIRD_SIZE) bird.y = -BIRD_SIZE

        bird.direction += (Math.random() - 0.5) * 0.1

        birdControlsRef.current[bird.id] = {
          x: bird.x,
          y: bird.y,
          rotate: (bird.direction * 180) / Math.PI
        }
      })

      controls.start(birdControlsRef.current)
      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [isInView, controls])

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none">
      {Array.from({ length: BIRD_COUNT }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-5 h-5 text-white/10"
          initial={{ x: 0, y: 0 }}
          animate={i.toString()}
        >
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 4l-8 8h16l-8-8z" />
          </svg>
        </motion.div>
      ))}
    </div>
  )
} 