'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Ticket, MapPin } from 'lucide-react'

interface Show {
  id: string
  date: string
  time: string
  venue: string
  city: string
  ticketLink?: string
  description?: string
  isSoldOut?: boolean
}

const shows: Show[] = [
  {
    id: '1',
    date: 'Dec 15',
    time: '9:00 PM',
    venue: 'The Continental Club',
    city: 'Austin, TX',
    ticketLink: '#',
    description: 'Special Performance'
  },
  {
    id: '2',
    date: 'Dec 22',
    time: '8:00 PM',
    venue: 'House of Blues',
    city: 'Houston, TX',
    ticketLink: '#',
    description: 'Album Release Show'
  }
]

export function Shows() {
  const [expandedId, setExpandedId] = useState<string | null>(null)

  return (
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="text-5xl font-bold text-white mb-4">Shows</h2>
        <p className="text-xl text-orange-400">Catch a Live Show</p>
      </div>

      <div className="space-y-6">
        {shows.map((show) => (
          <motion.div
            key={show.id}
            className="bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-orange-500/20 hover:border-orange-500/40 transition-all cursor-pointer group"
            onClick={() => setExpandedId(expandedId === show.id ? null : show.id)}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="grid md:grid-cols-4 gap-6 items-center">
              <div className="text-center md:text-left">
                <div className="text-3xl font-bold text-orange-400">{show.date}</div>
                <div className="text-white/60">{show.time}</div>
              </div>
              <div className="col-span-2">
                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-orange-400 transition-colors">
                  {show.venue}
                </h3>
                <div className="flex items-center gap-2 text-white/60">
                  <MapPin className="text-orange-500" size={16} />
                  <span>{show.city}</span>
                </div>
              </div>
              <div className="text-center md:text-right">
                {show.ticketLink && !show.isSoldOut ? (
                  <a
                    href={show.ticketLink}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-full transition-colors shadow-lg shadow-orange-500/20"
                  >
                    <Ticket size={18} />
                    Get Tickets
                  </a>
                ) : (
                  <span className="text-red-500 font-medium">Sold Out</span>
                )}
              </div>
            </div>

            {/* Expanded Content */}
            <motion.div
              initial={false}
              animate={{ height: expandedId === show.id ? 'auto' : 0, opacity: expandedId === show.id ? 1 : 0 }}
              className="overflow-hidden"
            >
              {show.description && (
                <div className="pt-6 mt-6 border-t border-white/10">
                  <div className="text-white/80">{show.description}</div>
                </div>
              )}
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  )
} 