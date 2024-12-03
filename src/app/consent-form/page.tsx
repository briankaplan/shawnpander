'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { FormInput } from '@/components/ui/FormInput'
import { Card } from '@/components/ui/Card'
import { validatePhoneNumber } from '@/hooks/useAuth'

export default function ConsentFormPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    phone: '',
    agree: false
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!validatePhoneNumber(formData.phone)) {
      setError('Please enter a valid phone number')
      return
    }

    if (!formData.agree) {
      setError('You must agree to receive messages')
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/consent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      if (!response.ok) {
        throw new Error('Failed to submit consent')
      }

      // Show success page
      router.push('/consent-success')

    } catch (error) {
      setError('Failed to submit consent. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-black py-20">
      <div className="max-w-lg mx-auto px-4">
        <Card className="p-8">
          <h1 className="text-2xl font-bold text-white mb-6">
            Consent to Receive Messages
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <FormInput
              label="Phone Number"
              type="tel"
              name="phone"
              placeholder="123-456-7890"
              value={formData.phone}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                phone: e.target.value
              }))}
              error={error || undefined}
            />

            <div className="space-y-2">
              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={formData.agree}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    agree: e.target.checked
                  }))}
                  className="mt-1 rounded border-zinc-700 bg-zinc-900/50 text-orange-500 focus:ring-orange-500/20"
                />
                <span className="text-sm text-white/80 group-hover:text-white/90">
                  I agree to receive messages from Shawn Pander as outlined in the{' '}
                  <a
                    href="/terms"
                    target="_blank"
                    className="text-orange-500 hover:text-orange-400 underline"
                  >
                    terms and conditions
                  </a>
                  . Message and data rates may apply. You can opt out at any time by replying STOP.
                </span>
              </label>
              {error && (
                <p className="text-sm text-red-500 mt-1">{error}</p>
              )}
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              isLoading={isSubmitting}
            >
              Submit
            </Button>

            <p className="text-sm text-white/40 text-center mt-6">
              By submitting this form, you consent to receive text messages from
              Shawn Pander, including updates about new music, shows, and other
              announcements. Message and data rates may apply. You can opt out at
              any time by replying STOP.
            </p>
          </form>
        </Card>
      </div>
    </div>
  )
}