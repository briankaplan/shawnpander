'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { StreamingLink } from '@/components/ui/StreamingLink'

export default function DynamicHeader() {
  return (
    <header className="relative w-full h-screen overflow-hidden">
      {/* Background with Sun Image and Gradient */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#2D0808] via-[#3D0A0A] to-black opacity-90" />
        <Image
          src="/images/background/sun.jpg"
          alt="Background"
          fill
          className="object-cover opacity-40 mix-blend-overlay"
          priority
        />
      </div>

      {/* Animated Circles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[
          { size: 220, color: '#2D0808', delay: 0 },
          { size: 200, color: '#3D0A0A', delay: 0.2 },
          { size: 180, color: '#4D0C0C', delay: 0.4 }
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
              filter: `blur(${80 - i * 10}px)`,
              transform: 'translate(-50%, -50%)'
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: [0, 0.8, 0.4],
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

      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center px-4">
        <motion.div
          className="w-full max-w-[280px] aspect-square relative mb-12"
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Image
            src="/images/songs/lets-just-groove.jpg"
            alt="Let's Just Groove"
            fill
            className="object-contain rounded-lg shadow-2xl"
            priority
          />
        </motion.div>

        <motion.div
          className="text-center space-y-6 max-w-3xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
            Let's Just Groove
          </h1>
          <p className="text-2xl md:text-3xl text-orange-200/70 mb-4 font-light">
            New single dropping December 3rd
          </p>

          {/* Streaming Links */}
          <motion.div
            className="flex gap-8 justify-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            <StreamingLink 
              service="spotify"
              href="https://open.spotify.com/artist/5msMT1CsExJLdv96xtMwXE"
            />
            <StreamingLink 
              service="apple"
              href="https://music.apple.com/artist/shawn-pander"
            />
            <StreamingLink 
              service="amazon"
              href="https://music.amazon.com/artists/shawn-pander"
            />
          </motion.div>
        </motion.div>
      </div>
    </header>
  )
}