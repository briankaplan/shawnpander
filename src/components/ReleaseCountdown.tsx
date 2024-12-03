'use client'

import { useEffect, useState } from 'react'
import { upcomingReleases, type Release } from '@/config/releases'

function getTimeUntil(date: string) {
  const diff = new Date(date).getTime() - new Date().getTime()
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  
  return { days, hours, minutes }
}

export function ReleaseCountdown() {
  const [nextRelease, setNextRelease] = useState<Release | null>(null)
  const [timeUntil, setTimeUntil] = useState({ days: 0, hours: 0, minutes: 0 })

  useEffect(() => {
    // Find next release
    const now = new Date()
    const upcoming = upcomingReleases
      .filter(release => new Date(release.releaseDate) > now)
      .sort((a, b) => new Date(a.releaseDate).getTime() - new Date(b.releaseDate).getTime())[0]
    
    setNextRelease(upcoming || null)

    // Update countdown
    const timer = setInterval(() => {
      if (upcoming) {
        setTimeUntil(getTimeUntil(upcoming.releaseDate))
      }
    }, 1000 * 60) // Update every minute

    return () => clearInterval(timer)
  }, [])

  if (!nextRelease) return null

  return (
    <div className="text-center space-y-4">
      <h3 className="text-2xl font-bold text-orange-500">
        {nextRelease.type === 'album' ? 'Album Release' : 'Single Release'}
      </h3>
      <p className="text-xl text-white">{nextRelease.title}</p>
      <div className="flex justify-center gap-4">
        <div className="text-center">
          <span className="text-3xl font-bold text-orange-400">{timeUntil.days}</span>
          <p className="text-sm text-white/60">days</p>
        </div>
        <div className="text-center">
          <span className="text-3xl font-bold text-orange-400">{timeUntil.hours}</span>
          <p className="text-sm text-white/60">hours</p>
        </div>
        <div className="text-center">
          <span className="text-3xl font-bold text-orange-400">{timeUntil.minutes}</span>
          <p className="text-sm text-white/60">minutes</p>
        </div>
      </div>
      <p className="text-white/80">{nextRelease.description}</p>
    </div>
  )
} 