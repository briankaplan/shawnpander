'use client'

import { motion, useScroll, useTransform, useMotionValue } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useRef } from 'react'
import { THEME_COLORS } from '@/config/theme'
import { Birds } from '@/components/ui/Birds'

export function Silhouette() {
  const containerRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const { scrollY } = useScroll()
  const silhouetteX = useTransform(mouseX, [-500, 500], [50, -50])
  const silhouetteY = useTransform(mouseY, [-500, 500], [25, -25])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect()
      if (!rect) return
      
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2
      
      mouseX.set(x)
      mouseY.set(y)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden">
      {/* Sun Image Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A0404] via-[#250606] to-[#0A0202] opacity-95" />
        <Image
          src="/images/background/sun.jpg"
          alt="Background"
          fill
          className="object-cover opacity-30 mix-blend-soft-light"
          priority
        />
      </div>

      {/* Birds Layer - Now positioned above other elements */}
      <div className="absolute inset-0 z-30">
        <Birds />
      </div>

      {/* Animated Background Circles */}
      <div className="absolute inset-0 pointer-events-none">
        {[
          { size: 220, color: THEME_COLORS.background.from, delay: 0, opacity: 0.9 },
          { size: 200, color: THEME_COLORS.background.via, delay: 0.2, opacity: 0.8 },
          { size: 180, color: THEME_COLORS.accent.teal, delay: 0.4, opacity: 0.15 }
        ].map((circle, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full mix-blend-multiply"
            style={{
              width: `${circle.size}vh`,
              height: `${circle.size}vh`,
              left: '50%',
              top: '50%',
              backgroundColor: circle.color,
              opacity: circle.opacity,
              filter: `blur(${80 - i * 10}px)`,
              transform: 'translate(-50%, -50%)'
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: [0, circle.opacity * 1.2, circle.opacity],
              scale: [0.8, 1.1, 1],
              rotate: [0, 180, 360]
            }}
            transition={{
              duration: 20,
              delay: circle.delay,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Natural Glow Effect */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        style={{ x: silhouetteX, y: silhouetteY }}
      >
        <div className="relative">
          {/* Inner Glow */}
          <div 
            className="absolute inset-[-50px] rounded-full"
            style={{
              background: `radial-gradient(
                circle at center,
                ${THEME_COLORS.accent.primary}20 0%,
                ${THEME_COLORS.accent.teal}10 50%,
                transparent 80%
              )`,
              filter: 'blur(30px)',
              mixBlendMode: 'screen'
            }}
          />
          
          {/* Outer Atmospheric Glow */}
          <div 
            className="absolute inset-[-100px] rounded-full"
            style={{
              background: `radial-gradient(
                circle at center,
                ${THEME_COLORS.accent.teal}10 0%,
                ${THEME_COLORS.accent.secondary}08 60%,
                transparent 90%
              )`,
              filter: 'blur(50px)',
              mixBlendMode: 'overlay'
            }}
          />
        </div>
      </motion.div>

      {/* Silhouette */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ x: silhouetteX, y: silhouetteY }}
      >
        <div className="relative w-[300px] h-[400px]">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <Image
              src="/images/background/sillouette.svg"
              alt="Silhouette"
              fill
              className="object-contain"
              style={{ 
                mixBlendMode: 'multiply',
                filter: 'contrast(1.1) brightness(0.9)'
              }}
            />
          </motion.div>
        </div>
      </motion.div>

      {/* Retro Lines Overlay */}
      <div 
        className="absolute inset-0 opacity-15"
        style={{
          background: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(234,88,12,0.4) 2px,
            rgba(234,88,12,0.4) 4px
          )`,
          mixBlendMode: 'overlay'
        }}
      />
    </div>
  )
}