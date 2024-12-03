'use client'

import { useState } from 'react'
import { Mail, Phone } from 'lucide-react'

export function NewsletterSignup() {
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [preference, setPreference] = useState<'email' | 'sms'>('email')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const endpoint = preference === 'email' ? '/api/newsletter' : '/api/sms'
    const value = preference === 'email' ? email : phone

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ [preference]: value })
      })
      
      if (!response.ok) throw new Error('Failed to subscribe')
      // Show success message
    } catch (error) {
      // Show error message
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex gap-4">
        <button
          type="button"
          onClick={() => setPreference('email')}
          className={preference === 'email' ? 'active' : ''}
        >
          <Mail /> Email Updates
        </button>
        <button
          type="button"
          onClick={() => setPreference('sms')}
          className={preference === 'sms' ? 'active' : ''}
        >
          <Phone /> SMS Updates
        </button>
      </div>

      {preference === 'email' ? (
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="w-full px-4 py-2 rounded"
        />
      ) : (
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Enter your phone number"
          className="w-full px-4 py-2 rounded"
        />
      )}

      <button type="submit" className="w-full bg-orange-500 text-white py-2 rounded">
        Get Updates
      </button>
    </form>
  )
} 