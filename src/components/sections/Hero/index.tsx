'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import Image from 'next/image'

export function Hero() {
  return (
    <section className="relative h-[85vh] bg-[#1A0404] flex items-center justify-center overflow-hidden">
      {/* Background Rings and Glow */}
      <div className="absolute inset-0 flex items-center justify-center -translate-y-32">
        {/* Outer Rings */}
        <div className="absolute w-[1400px] h-[1400px] rounded-full border-[3px] border-orange-500/30" />
        <div className="absolute w-[1200px] h-[1200px] rounded-full border-[4px] border-orange-500/40" />
        <div className="absolute w-[1000px] h-[1000px] rounded-full border-[5px] border-orange-500/50" />
        <div className="absolute w-[800px] h-[800px] rounded-full border-[6px] border-orange-500/60" />
        
        {/* Center Glow */}
        <div className="absolute w-[900px] h-[900px] rounded-full bg-gradient-radial from-orange-500/30 via-orange-500/20 to-transparent blur-2xl" />
        <div className="absolute w-[700px] h-[700px] rounded-full bg-gradient-radial from-orange-500/40 via-orange-500/20 to-transparent blur-xl" />
      </div>

      {/* Centered Content Container */}
      <div className="relative w-full max-w-7xl mx-auto px-4 flex flex-col items-center justify-center -translate-y-32">
        {/* Silhouette */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[40%] w-[800px] h-[1000px]">
          <Image
            src="/images/background/Sillouette2.svg"
            alt="Silhouette"
            fill
            className="object-contain"
            style={{ filter: 'brightness(0)' }}
            priority
          />
        </div>

        {/* Text Content */}
        <div className="relative z-10 text-center mt-[200px]">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.9 }}
            className="text-8xl font-bold mb-6 text-[#fff8e7]/90 tracking-tight"
          >
            Forever & For Now
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            className="text-3xl text-[#fff8e7]/60 mb-8 tracking-wide"
          >
            The new album - Available now
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex gap-6 justify-center"
          >
            <Button 
              size="lg" 
              href="#music"
              variant="default"
              className="bg-orange-500 hover:bg-orange-600"
            >
              Listen Now
            </Button>
            <Button 
              size="lg" 
              href="#shows"
              variant="outline"
              className="border-blue-500 text-blue-500 hover:bg-blue-500/10"
            >
              See Live Shows
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#1A0404] to-transparent" />
    </section>
  )
} 