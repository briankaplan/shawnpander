'use client'

import { motion } from 'framer-motion'

export function LoadingSpinner() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/90 backdrop-blur-sm">
      <motion.div
        className="w-16 h-16 border-4 border-orange-500 rounded-full border-t-transparent"
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </div>
  )
}