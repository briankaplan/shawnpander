'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { Silhouette } from '@/components/ui/Silhouette'

export default function DynamicHeader() {
  const { scrollY } = useScroll()
  const opacity = useTransform(scrollY, [0, 200], [1, 0])
  const scale = useTransform(scrollY, [0, 200], [1, 0.95])
  const height = useTransform(scrollY, [0, 200], ['100vh', '0vh'])

  return (
    <motion.header 
      style={{ height }}
      className="relative w-full overflow-hidden"
    >
      {/* Background with silhouette */}
      <motion.div
        style={{ opacity, scale }}
        className="absolute inset-0"
      >
        <Silhouette />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 h-full flex flex-col items-center justify-center text-center"
      >
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-7xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white to-orange-200"
        >
          Forever & For Now
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl md:text-2xl text-orange-200/70"
        >
          The new album - Available now
        </motion.p>
      </motion.div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black pointer-events-none" />
    </motion.header>
  )
}