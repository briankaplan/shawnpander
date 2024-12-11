'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useShows } from '@/contexts/ShowsContext'
import { ShowListItem } from '@/components/ui/ShowListItem'
import { CardSkeleton } from '@/components/ui/Skeleton'

export function ShowsSection() {
  const { upcomingShows, pastShows, loading, error } = useShows()
  const [showPastShows, setShowPastShows] = useState(false)

  if (loading) {
    return (
      <section className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <CardSkeleton 
              key={i}
              hasImage={false}
              hasTitle={true}
              hasDescription={true}
            />
          ))}
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center text-white/60">
          <p>Failed to load shows. Please try again later.</p>
        </div>
      </section>
    )
  }

  if (upcomingShows.length === 0 && pastShows.length === 0) {
    return (
      <section className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center text-white/60">
          <p>No shows at the moment. Check back soon!</p>
        </div>
      </section>
    )
  }

  return (
    <section className="container mx-auto px-4 md:px-6 lg:px-8">
      <div className="space-y-8">
        {/* Upcoming Shows */}
        {upcomingShows.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">Upcoming Shows</h2>
            <div className="space-y-4">
              {upcomingShows.map(show => (
                <ShowListItem key={show.id} show={show} />
              ))}
            </div>
          </div>
        )}

        {/* Past Shows */}
        {pastShows.length > 0 && (
          <div className="space-y-4">
            <button
              onClick={() => setShowPastShows(!showPastShows)}
              className="flex items-center gap-2 text-orange-500/60 hover:text-orange-500 transition-colors group"
            >
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${
                  showPastShows ? 'rotate-180' : ''
                }`}
              />
              <span className="text-lg font-medium">
                {showPastShows ? 'Hide' : 'Show'} Past Shows ({pastShows.length})
              </span>
            </button>

            <AnimatePresence>
              {showPastShows && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="space-y-4 overflow-hidden"
                >
                  {pastShows.map((show, index) => (
                    <motion.div
                      key={show.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <ShowListItem show={show} />
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </section>
  )
}