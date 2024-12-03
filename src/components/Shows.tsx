'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { 
  Clock, 
  MapPin, 
  ChevronDown, 
  Share2, 
  CalendarPlus, 
  Calendar as CalIcon, 
  Apple, 
  Mail, 
  Download,
  AlertCircle
} from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import { upcomingShows } from '@/data/shows'
import { toast } from 'sonner'

export function Shows() {
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [showCalendarDropdown, setShowCalendarDropdown] = useState<string | null>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowCalendarDropdown(null)
      }
    }

    // Add event listener
    document.addEventListener('mousedown', handleClickOutside)
    
    // Clean up
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return {
      month: date.toLocaleString('default', { month: 'short' }).toUpperCase(),
      day: date.getDate()
    }
  }

  const handleShare = async (show: typeof upcomingShows[0]) => {
    const text = `Check out ${show.title} at ${show.venue.name} on ${show.date} at ${show.time}! ${show.ticketUrl}`
    
    try {
      if (navigator.share) {
        try {
          await navigator.share({
            title: show.title,
            text,
            url: show.ticketUrl
          })
          toast.success('Event shared successfully!')
        } catch (err) {
          // Don't show error for user cancellation
          if (err instanceof Error && err.name === 'AbortError') {
            return
          }
          // Fallback to clipboard if sharing fails
          await navigator.clipboard.writeText(text)
          toast.success('Event details copied to clipboard!')
        }
      } else {
        // Fallback for browsers without share API
        try {
          await navigator.clipboard.writeText(text)
          toast.success('Event details copied to clipboard!')
        } catch (err) {
          console.error('Error copying to clipboard:', err)
          toast.error('Could not copy event details')
        }
      }
    } catch (err) {
      console.error('Share error:', err)
      toast.error('Could not share event')
    }
  }

  const generateICSFile = (show: typeof upcomingShows[0], startDate: Date, endDate: Date) => {
    const formatICSDate = (date: Date) => date.toISOString().replace(/[-:.].*/, '').replace(/-/g, '')
    
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'BEGIN:VEVENT',
      `DTSTART:${formatICSDate(startDate)}`,
      `DTEND:${formatICSDate(endDate)}`,
      `SUMMARY:${show.title}`,
      `DESCRIPTION:${show.description.replace(/\n/g, '\\n')}`,
      `LOCATION:${show.venue.name}, ${show.venue.address}`,
      `URL:${show.ticketUrl}`,
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n')

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${show.title.toLowerCase().replace(/\s+/g, '-')}.ics`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const getCalendarLinks = (show: typeof upcomingShows[0]) => {
    try {
      // Parse the date and time
      const dateParts = show.date.match(/(\w+)\s+(\d+),\s+(\d+)/)
      if (!dateParts) throw new Error('Invalid date format')
      
      const [_, month, day, year] = dateParts
      const [time, period] = show.time.split(' ')
      const [hours, minutes] = time.split(':')
      
      // Create start date
      const startDate = new Date(
        parseInt(year),
        new Date(Date.parse(month + " 1, 2000")).getMonth(),
        parseInt(day),
        period === 'PM' ? parseInt(hours) + 12 : parseInt(hours),
        parseInt(minutes)
      )
      
      if (isNaN(startDate.getTime())) throw new Error('Invalid date')
      
      // End date is 3 hours after start
      const endDate = new Date(startDate.getTime() + (3 * 60 * 60 * 1000))

      const formatDate = (date: Date) => date.toISOString().replace(/[-:.].*/, '').replace(/-/g, '')
      const title = encodeURIComponent(show.title)
      const location = encodeURIComponent(`${show.venue.name}, ${show.venue.address}`)
      const description = encodeURIComponent(show.description)

      return [
        {
          name: 'Google Calendar',
          icon: CalIcon,
          url: `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${formatDate(startDate)}/${formatDate(endDate)}&details=${description}&location=${location}`
        },
        {
          name: 'Download .ics File',
          icon: Download,
          action: () => {
            try {
              generateICSFile(show, startDate, endDate)
              toast.success('Calendar file downloaded!')
            } catch (err) {
              console.error('Error generating calendar file:', err)
              toast.error('Failed to generate calendar file')
            }
          }
        }
      ]
    } catch (err) {
      console.error('Error generating calendar links:', err)
      toast.error('Failed to generate calendar links')
      return []
    }
  }

  if (!upcomingShows?.length) {
    return (
      <div className="text-center text-white/60 py-8">
        No upcoming shows at the moment
      </div>
    )
  }

  return (
    <div className="shows-container">
      <h2 className="text-3xl font-bold text-white mb-8">Upcoming Shows</h2>
      
      <div className="space-y-6">
        {upcomingShows.map((show, index) => {
          const { month, day } = formatDate(show.date)
          return (
            <motion.div
              key={show.id}
              className="bg-black/30 backdrop-blur-sm rounded-lg p-6 border border-white/10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex gap-6">
                {/* Calendar Date Box */}
                <div className="flex-shrink-0 w-20 h-20 bg-orange-500 rounded-lg overflow-hidden flex flex-col items-center justify-center text-white">
                  <div className="text-sm font-bold">{month}</div>
                  <div className="text-2xl font-bold">{day}</div>
                </div>

                <div className="flex-grow">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">{show.title}</h3>
                      <div className="flex items-center gap-4 text-white/60">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <span>{show.time}</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <MapPin className="w-4 h-4 mt-1" />
                          <div>
                            <div className="font-medium">{show.venue.name}</div>
                            <div className="text-sm">{show.venue.address}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleShare(show)}
                        className="p-2 text-white/60 hover:text-white transition-colors"
                        title="Share with friends"
                      >
                        <Share2 className="w-5 h-5" />
                      </button>
                      
                      <div className="relative" ref={dropdownRef}>
                        <button
                          onClick={() => setShowCalendarDropdown(showCalendarDropdown === show.id ? null : show.id)}
                          className="p-2 text-white/60 hover:text-white transition-colors"
                          title="Add to calendar"
                        >
                          <CalendarPlus className="w-5 h-5" />
                        </button>

                        <AnimatePresence>
                          {showCalendarDropdown === show.id && (
                            <motion.div
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              className="absolute right-0 mt-2 py-2 w-56 bg-black/90 backdrop-blur-sm rounded-lg shadow-xl border border-white/10 z-50"
                            >
                              {getCalendarLinks(show).map((calendar) => (
                                calendar.action ? (
                                  <button
                                    key={calendar.name}
                                    onClick={() => {
                                      calendar.action()
                                      setShowCalendarDropdown(null)
                                    }}
                                    className="w-full flex items-center gap-3 px-4 py-2 text-sm text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                                  >
                                    <calendar.icon className="w-4 h-4" />
                                    <span>{calendar.name}</span>
                                  </button>
                                ) : (
                                  <a
                                    key={calendar.name}
                                    href={calendar.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 px-4 py-2 text-sm text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                                    onClick={() => setShowCalendarDropdown(null)}
                                  >
                                    <calendar.icon className="w-4 h-4" />
                                    <span>{calendar.name}</span>
                                  </a>
                                )
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      <a
                        href={show.ticketUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center px-6 py-2 bg-orange-500 text-white font-medium rounded-full hover:bg-orange-600 transition-colors"
                      >
                        Get Tickets
                      </a>
                    </div>
                  </div>

                  {/* Show More Button */}
                  <button
                    onClick={() => setExpandedId(expandedId === show.id ? null : show.id)}
                    className="flex items-center gap-2 text-orange-400 hover:text-orange-300 transition-colors mt-4"
                  >
                    <span>{expandedId === show.id ? 'Show Less' : 'Show Details'}</span>
                    <motion.div
                      animate={{ rotate: expandedId === show.id ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </motion.div>
                  </button>

                  {/* Expandable Description */}
                  <AnimatePresence>
                    {expandedId === show.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-4 text-white/80">
                          {show.description}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
} 