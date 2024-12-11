'use client'

import { CONFIG } from '@/config'
import { motion } from 'framer-motion'

export function ConnectSection() {
  const { social } = CONFIG.site

  return (
    <section id="connect" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-white mb-12 text-center">Connect</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {Object.entries(social).map(([platform, url]) => (
            <motion.a
              key={platform}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-6 bg-black/20 backdrop-blur-sm rounded-lg hover:bg-black/30 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <h3 className="text-xl font-bold text-white capitalize mb-2">
                {platform === 'appleMusic' ? 'Apple Music' : platform}
              </h3>
              <p className="text-white/60">Follow on {platform === 'appleMusic' ? 'Apple Music' : platform}</p>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
} 