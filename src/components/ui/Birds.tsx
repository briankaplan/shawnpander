'use client'

import { useEffect, useRef } from 'react'

interface Bird {
  x: number
  y: number
  size: number
  speed: number
  angle: number
}

export const Birds = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const birdsRef = useRef<Bird[]>([])
  
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Initialize birds
    birdsRef.current = Array.from({ length: 12 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: 0.2 + Math.random() * 0.3, // Very small size
      speed: 0.2 + Math.random() * 0.4, // Slower speed
      angle: Math.random() * Math.PI * 2
    }))

    const drawBird = (bird: Bird) => {
      if (!ctx) return
      
      ctx.save()
      ctx.translate(bird.x, bird.y)
      ctx.rotate(bird.angle + Math.PI / 2)
      
      // Simple "M" shape bird
      ctx.beginPath()
      ctx.moveTo(0, -3 * bird.size)
      ctx.lineTo(-5 * bird.size, 0)
      ctx.lineTo(0, 2 * bird.size)
      ctx.lineTo(5 * bird.size, 0)
      ctx.lineTo(0, -3 * bird.size)
      
      ctx.fillStyle = 'rgba(0, 0, 0, 0.6)'
      ctx.fill()
      
      ctx.restore()
    }

    const animate = () => {
      if (!ctx || !canvas) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      birdsRef.current.forEach(bird => {
        // Update position
        bird.x += Math.cos(bird.angle) * bird.speed
        bird.y += Math.sin(bird.angle) * bird.speed

        // Wrap around screen
        if (bird.x > canvas.width + 20) bird.x = -20
        if (bird.x < -20) bird.x = canvas.width + 20
        if (bird.y > canvas.height + 20) bird.y = -20
        if (bird.y < -20) bird.y = canvas.height + 20

        // Gentle direction changes
        if (Math.random() < 0.005) {
          bird.angle += (Math.random() - 0.5) * 0.2
        }

        drawBird(bird)
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none opacity-40"
    />
  )
} 