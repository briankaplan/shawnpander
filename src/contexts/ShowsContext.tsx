'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import type { Show } from '@/types/shows'
import { upcomingShows as initialShows } from '@/data/shows'

interface ShowsContextType {
  shows: Show[]
  upcomingShows: Show[]
  pastShows: Show[]
  loading: boolean
  error: Error | null
}

const ShowsContext = createContext<ShowsContextType | null>(null)

function isShowPast(date: string): boolean {
  const showDate = new Date(date)
  showDate.setHours(23, 59, 59, 999) // End of show day
  return showDate < new Date()
}

export function ShowsProvider({ children }: { children: React.ReactNode }) {
  const [shows, setShows] = useState<Show[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  // Initial load of shows
  useEffect(() => {
    const fetchShows = async () => {
      try {
        setShows(initialShows)
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to load shows'))
      } finally {
        setLoading(false)
      }
    }

    fetchShows()
  }, [])

  // Automatically sort shows into upcoming and past
  const { upcomingShows, pastShows } = shows.reduce<{
    upcomingShows: Show[]
    pastShows: Show[]
  }>(
    (acc, show) => {
      if (isShowPast(show.date)) {
        acc.pastShows.push(show)
      } else {
        acc.upcomingShows.push(show)
      }
      return acc
    },
    { upcomingShows: [], pastShows: [] }
  )

  // Sort upcoming shows by date (ascending)
  upcomingShows.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  
  // Sort past shows by date (descending)
  pastShows.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  // Check for shows moving to past every minute
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date()
      const hasChanges = shows.some(show => {
        const showDate = new Date(show.date)
        return showDate < now && !isShowPast(show.date)
      })

      if (hasChanges) {
        // Force re-render by creating a new array
        setShows([...shows])
        toast.info('Show schedule has been updated')
      }
    }, 60000) // Check every minute

    return () => clearInterval(interval)
  }, [shows])

  return (
    <ShowsContext.Provider
      value={{
        shows,
        upcomingShows,
        pastShows,
        loading,
        error
      }}
    >
      {children}
    </ShowsContext.Provider>
  )
}

export function useShows() {
  const context = useContext(ShowsContext)
  if (!context) {
    throw new Error('useShows must be used within a ShowsProvider')
  }
  return context
} 