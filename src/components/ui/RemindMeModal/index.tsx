'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bell, X, Check } from 'lucide-react'
import { toast } from 'sonner'
import type { Show } from '@/types/shows'

interface RemindMeModalProps {
  show: Show
  isOpen: boolean
  onClose: () => void
}

type ReminderOption = {
  id: string
  label: string
  value: number // hours before show
}

const reminderOptions: ReminderOption[] = [
  { id: '1day', label: '1 day before', value: 24 },
  { id: '2hours', label: '2 hours before', value: 2 },
  { id: '30min', label: '30 minutes before', value: 0.5 },
]

export function RemindMeModal({ show, isOpen, onClose }: RemindMeModalProps) {
  const [email, setEmail] = useState('')
  const [selectedOptions, setSelectedOptions] = useState<string[]>([])
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // This would be replaced with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Mock API call structure for future implementation
      /*
      await fetch('/api/reminders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          showId: show.id,
          email,
          reminders: selectedOptions.map(id => 
            reminderOptions.find(opt => opt.id === id)?.value
          )
        })
      })
      */

      toast.success('Reminders set successfully!')
      onClose()
    } catch (error) {
      toast.error('Failed to set reminders. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-zinc-900 border border-zinc-800 rounded-xl w-full max-w-md overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-zinc-800">
              <div className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-orange-500" />
                <h2 className="text-lg font-semibold text-white">Set Reminders</h2>
              </div>
              <button
                onClick={onClose}
                className="p-1 rounded-lg hover:bg-white/5 transition-colors"
              >
                <X className="w-5 h-5 text-white/60" />
              </button>
            </div>

            {/* Content */}
            <form onSubmit={handleSubmit} className="p-4 space-y-4">
              <div>
                <h3 className="font-medium text-white mb-1">{show.title}</h3>
                <p className="text-sm text-white/60">
                  {show.date} at {show.time}
                </p>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm text-white/80 mb-1">
                  Email for reminders
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="w-full px-3 py-2 bg-black/20 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-orange-500/50"
                />
              </div>

              <div>
                <p className="block text-sm text-white/80 mb-2">
                  When should we remind you?
                </p>
                <div className="space-y-2">
                  {reminderOptions.map(option => (
                    <label
                      key={option.id}
                      className="flex items-center gap-2 cursor-pointer group"
                    >
                      <div
                        className={`w-5 h-5 rounded border ${
                          selectedOptions.includes(option.id)
                            ? 'bg-orange-500 border-orange-500'
                            : 'border-white/20 group-hover:border-white/40'
                        } flex items-center justify-center transition-colors`}
                      >
                        {selectedOptions.includes(option.id) && (
                          <Check className="w-3 h-3 text-white" />
                        )}
                      </div>
                      <input
                        type="checkbox"
                        className="sr-only"
                        checked={selectedOptions.includes(option.id)}
                        onChange={e => {
                          setSelectedOptions(
                            e.target.checked
                              ? [...selectedOptions, option.id]
                              : selectedOptions.filter(id => id !== option.id)
                          )
                        }}
                      />
                      <span className="text-sm text-white/80 group-hover:text-white transition-colors">
                        {option.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading || !email || selectedOptions.length === 0}
                  className="w-full px-4 py-2 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-500/50 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors"
                >
                  {loading ? 'Setting reminders...' : 'Set Reminders'}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
} 