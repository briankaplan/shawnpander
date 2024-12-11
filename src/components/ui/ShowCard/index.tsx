'use client'

import { motion } from 'framer-motion'
import { Calendar, MapPin, ExternalLink } from 'lucide-react'
import type { Show } from '@/types/shows'

interface ShowCardProps {
  show: Show
}

export function ShowCard({ show }: ShowCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-black/20 backdrop-blur-sm rounded-lg p-6 border border-white/10"
    >
      <div className="flex flex-col gap-4">
        <h3 className="text-xl font-bold text-white">{show.title}</h3>
        
        <div className="flex items-center gap-2 text-white/60">
          <Calendar className="w-4 h-4" />
          <span>{show.date} at {show.time}</span>
        </div>
        
        <div className="flex items-start gap-2 text-white/60">
          <MapPin className="w-4 h-4 mt-1" />
          <div>
            <p className="font-medium text-white">{show.venue.name}</p>
            <p>{show.venue.address}</p>
          </div>
        </div>
        
        <p className="text-white/80">{show.description}</p>
        
        <a
          href={show.ticketUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <span>Get Tickets</span>
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </motion.div>
  )
} 