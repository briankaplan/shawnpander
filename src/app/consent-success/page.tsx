'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'

export default function ConsentSuccessPage() {
  return (
    <div className="min-h-screen bg-black py-20">
      <div className="max-w-lg mx-auto px-4">
        <Card className="p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-green-500/10 flex items-center justify-center">
              <svg
                className="w-8 h-8 text-green-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>

            <h1 className="text-2xl font-bold text-white mb-4">
              Consent Submitted Successfully
            </h1>

            <p className="text-white/60 mb-8">
              Thank you for signing up to receive messages from Shawn Pander.
              You&apos;ll start receiving updates about new music, shows, and other
              announcements.
            </p>

            <div className="space-y-4">
              <div className="bg-zinc-900/50 rounded-lg p-4">
                <h2 className="text-sm font-medium text-white mb-2">
                  Important Information
                </h2>
                <ul className="text-sm text-white/60 space-y-2">
                  <li>• Message and data rates may apply</li>
                  <li>• Reply STOP at any time to unsubscribe</li>
                  <li>• Reply HELP for assistance</li>
                  <li>• Messages sent via automated system</li>
                </ul>
              </div>

              <div className="bg-zinc-900/50 rounded-lg p-4">
                <h2 className="text-sm font-medium text-white mb-2">
                  What to Expect
                </h2>
                <ul className="text-sm text-white/60 space-y-2">
                  <li>• New music releases and updates</li>
                  <li>• Concert and tour announcements</li>
                  <li>• Behind-the-scenes content</li>
                  <li>• Exclusive fan opportunities</li>
                </ul>
              </div>
            </div>

            <div className="mt-8">
              <Link href="/">
                <Button variant="primary" size="lg" fullWidth>
                  Return to Homepage
                </Button>
              </Link>
            </div>

            <p className="text-sm text-white/40 mt-6">
              For support, contact{' '}
              <a
                href="mailto:support@shawnpander.com"
                className="text-orange-500 hover:text-orange-400"
              >
                support@shawnpander.com
              </a>
            </p>
          </motion.div>
        </Card>
      </div>
    </div>
  )
}