'use client'

import { motion } from 'framer-motion'

export function AlbumSkeleton() {
  return (
    <div className="flex gap-4 items-center p-4 rounded-lg bg-black/20 backdrop-blur-sm border border-white/10">
      {/* Album Art Skeleton */}
      <div className="relative w-24 h-24 flex-shrink-0 bg-white/5 rounded-lg overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
          animate={{
            x: ['-100%', '100%']
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>
      
      {/* Album Info Skeleton */}
      <div className="flex-1 space-y-2">
        <div className="h-6 w-3/4 bg-white/5 rounded">
          <motion.div
            className="h-full bg-gradient-to-r from-transparent via-white/10 to-transparent"
            animate={{
              x: ['-100%', '100%']
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </div>
        <div className="h-4 w-1/2 bg-white/5 rounded">
          <motion.div
            className="h-full bg-gradient-to-r from-transparent via-white/10 to-transparent"
            animate={{
              x: ['-100%', '100%']
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "linear",
              delay: 0.1
            }}
          />
        </div>
      </div>
    </div>
  )
}

export function AlbumListSkeleton() {
  return (
    <div className="space-y-4">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
        >
          <AlbumSkeleton />
        </motion.div>
      ))}
    </div>
  )
} 