'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { FormInput } from '@/components/ui/FormInput'
import { useForm } from '@/hooks/useForm'

export default function ConsentPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const { values, errors, touched, handleChange, handleBlur, handleSubmit } = useForm({
    initialValues: {
      phone: '',
      agree: false
    },
    validate: (values) => {
      const errors: Record<string, string> = {}
      if (!values.phone) {
        errors.phone = 'Phone number is required'
      } else if (!/^\+?[\d\s-]{10,}$/.test(values.phone)) {
        errors.phone = 'Please enter a valid phone number'
      }
      if (!values.agree) {
        errors.agree = 'You must agree to receive messages'
      }
      return errors
    },
    onSubmit: async (values) => {
      setIsSubmitting(true)
      try {
        const response = await fetch('/api/consent', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(values)
        })

        if (!response.ok) {
          throw new Error('Failed to submit consent')
        }

        setIsSuccess(true)
      } catch (error) {
        console.error('Error submitting consent:', error)
      } finally {
        setIsSubmitting(false)
      }
    }
  })

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full bg-zinc-900/50 border border-zinc-800 rounded-xl p-8 text-center"
        >
          <h1 className="text-2xl font-bold text-white mb-4">Consent Submitted</h1>
          <p className="text-white/60 mb-6">
            Thank you for agreeing to receive messages from Shawn Pander.
          </p>
          <p className="text-sm text-white/40">
            Your phone number: {values.phone}
          </p>
          <p className="text-sm text-white/40">
            Timestamp: {new Date().toLocaleString()}
          </p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-zinc-900/50 border border-zinc-800 rounded-xl p-8"
      >
        <h1 className="text-2xl font-bold text-white mb-6">
          Consent to Receive Messages
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <FormInput
            label="Phone Number"
            name="phone"
            type="tel"
            placeholder="123-456-7890"
            value={values.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.phone ? errors.phone : undefined}
          />

          <div className="space-y-2">
            <label className="flex items-start gap-3 cursor-pointer group">
              <input
                type="checkbox"
                name="agree"
                checked={values.agree}
                onChange={handleChange}
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
                .
              </span>
            </label>
            {touched.agree && errors.agree && (
              <p className="text-sm text-red-500 mt-1">{errors.agree}</p>
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
      </motion.div>
    </div>
  )
}