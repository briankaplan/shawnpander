'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, Share2, ChevronDown, Bell, Ticket } from 'lucide-react'
import type { Show } from '@/types/shows'
import { formatDate } from '@/lib/utils'
import { toast } from 'sonner'
import { RemindMeModal } from '@/components/ui/RemindMeModal'

interface ShowListItemProps {
  show: Show
}

function formatISODate(date: Date) {
  return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
}

function parseShowTime(timeStr: string) {
  // Handle "6:00 PM" format
  const [time, period] = timeStr.split(' ')
  let [hours, minutes] = time.split(':').map(Number)
  
  // Convert to 24-hour format
  if (period === 'PM' && hours !== 12) {
    hours += 12
  } else if (period === 'AM' && hours === 12) {
    hours = 0
  }
  
  return { hours, minutes }
}

export function ShowListItem({ show }: ShowListItemProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const { day, month } = formatDate(show.date)
  const [isReminderModalOpen, setIsReminderModalOpen] = useState(false)

  const addToCalendar = () => {
    try {
      // Parse the show date and time
      const eventDate = new Date(show.date)
      const { hours, minutes } = parseShowTime(show.time)
      
      // Set the start time
      eventDate.setHours(hours, minutes, 0, 0)
      
      // Create end time (3 hours after start)
      const endDate = new Date(eventDate)
      endDate.setHours(endDate.getHours() + 3)

      // Format dates for iCal
      const startDate = formatISODate(eventDate)
      const endDateStr = formatISODate(endDate)

      // Create iCal content with proper formatting
      const icsContent = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//hacksw/handcal//NONSGML v1.0//EN',
        'CALSCALE:GREGORIAN',
        'BEGIN:VEVENT',
        `DTSTART:${startDate}`,
        `DTEND:${endDateStr}`,
        `SUMMARY:${show.title}`,
        `LOCATION:${show.venue.name}\\n${show.venue.address}`,
        `DESCRIPTION:${show.description.replace(/\n/g, '\\n')}`,
        'STATUS:CONFIRMED',
        `URL:${show.ticketUrl}`,
        `ORGANIZER;CN=Concert:mailto:noreply@example.com`,
        'BEGIN:VALARM',
        'TRIGGER:-PT2H',
        'ACTION:DISPLAY',
        'DESCRIPTION:Reminder: Concert starting in 2 hours',
        'END:VALARM',
        'END:VEVENT',
        'END:VCALENDAR'
      ].join('\r\n')

      // Create and trigger download with proper MIME type
      const blob = new Blob([icsContent], { 
        type: 'text/calendar;charset=utf-8' 
      })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${show.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.ics`
      a.click()
      window.URL.revokeObjectURL(url)
      
      toast.success('Event added to calendar')
    } catch (error) {
      console.error('Failed to create calendar event:', error)
      toast.error('Failed to create calendar event')
    }
  }

  const shareShow = async () => {
    const shareData = {
      title: show.title,
      text: `Join me at ${show.title} on ${show.date} at ${show.venue.name}!\n\n${show.description}`,
      url: show.ticketUrl
    }

    try {
      if (navigator.share && navigator.canShare(shareData)) {
        await navigator.share(shareData)
        toast.success('Thanks for sharing!')
      } else {
        // Enhanced clipboard fallback
        const shareText = `${shareData.title}\n\nDate: ${show.date}\nTime: ${show.time}\nVenue: ${show.venue.name}\n\n${show.description}\n\nGet tickets: ${show.ticketUrl}`
        
        await navigator.clipboard.writeText(shareText)
        
        // Show success message with share options
        toast.success(
          <div className="space-y-2">
            <p>Link copied to clipboard!</p>
            <div className="flex gap-2">
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                  `Check out ${show.title} at ${show.venue.name}!`
                )}&url=${encodeURIComponent(show.ticketUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm px-2 py-1 bg-black/20 rounded hover:bg-black/30 transition-colors"
              >
                Share on Twitter
              </a>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(show.ticketUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm px-2 py-1 bg-black/20 rounded hover:bg-black/30 transition-colors"
              >
                Share on Facebook
              </a>
            </div>
          </div>,
          {
            duration: 5000,
          }
        )
      }
    } catch (error) {
      if (error instanceof Error) {
        // Don't show error for user cancellation
        if (error.name !== 'AbortError') {
          console.error('Error sharing:', error)
          toast.error('Failed to share event')
        }
      }
    }
  }

  const setReminder = () => {
    // This would integrate with a notification service
    // For now, we'll just show a toast
    toast.success('Reminder set! We\'ll notify you before the show')
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-black/20 backdrop-blur-sm rounded-lg border border-white/10"
      >
        <div className="flex items-start p-6 gap-6">
          {/* Date Box */}
          <div className="flex-shrink-0 w-24 h-24 bg-gradient-to-br from-orange-500/10 to-orange-600/10 rounded-lg flex flex-col items-center justify-center text-center border border-orange-500/20">
            <span className="text-4xl font-bold text-orange-500">{day}</span>
            <span className="text-sm uppercase tracking-wider text-orange-500/70">{month}</span>
          </div>

          {/* Show Info */}
          <div className="flex-1">
            <h3 className="text-xl font-bold text-white">{show.title}</h3>
            <p className="text-white/60 mt-1">{show.venue.name}</p>
            <p className="text-white/40 text-sm">{show.time}</p>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <button
                onClick={addToCalendar}
                className="p-2 rounded-full hover:bg-orange-500/10 text-orange-500/60 hover:text-orange-500 transition-colors"
                title="Add to Calendar"
              >
                <Calendar className="w-5 h-5" />
              </button>
              <button
                onClick={() => setIsReminderModalOpen(true)}
                className="p-2 rounded-full hover:bg-orange-500/10 text-orange-500/60 hover:text-orange-500 transition-colors"
                title="Set Reminder"
              >
                <Bell className="w-5 h-5" />
              </button>
              <button
                onClick={shareShow}
                className="p-2 rounded-full hover:bg-orange-500/10 text-orange-500/60 hover:text-orange-500 transition-colors"
                title="Share"
              >
                <Share2 className="w-5 h-5" />
              </button>
            </div>

            <div className="h-8 w-[1px] bg-orange-500/20" /> {/* Divider */}

            <div className="flex items-center gap-3">
              <a
                href={show.ticketUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors"
              >
                <Ticket className="w-5 h-5" />
                <span className="font-medium">Get Tickets</span>
              </a>
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className={`p-2 rounded-full hover:bg-orange-500/10 text-orange-500/60 hover:text-orange-500 transition-all ${
                  isExpanded ? 'rotate-180' : ''
                }`}
              >
                <ChevronDown className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Expandable Description */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="px-6 pb-6 pt-2">
                <div className="p-4 bg-orange-500/5 rounded-lg border border-orange-500/10">
                  <p className="text-white/80">{show.description}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <RemindMeModal
        show={show}
        isOpen={isReminderModalOpen}
        onClose={() => setIsReminderModalOpen(false)}
      />
    </>
  )
} 