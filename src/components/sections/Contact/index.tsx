'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, Send, Facebook, Instagram, Youtube, ExternalLink } from 'lucide-react'

interface SocialLink {
  id: string
  name: string
  icon: typeof Facebook
  href: string
  color: string
}

const socialLinks: SocialLink[] = [
  {
    id: 'instagram',
    name: 'Instagram',
    icon: Instagram,
    href: 'https://instagram.com/shawnpander',
    color: 'hover:text-pink-500'
  },
  {
    id: 'facebook',
    name: 'Facebook',
    icon: Facebook,
    href: 'https://facebook.com/shawnpander',
    color: 'hover:text-blue-600'
  },
  {
    id: 'youtube',
    name: 'YouTube',
    icon: Youtube,
    href: 'https://youtube.com/shawnpander',
    color: 'hover:text-red-600'
  }
]

export function Contact() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
    status: '' as '' | 'sending' | 'success' | 'error'
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormState(prev => ({ ...prev, status: 'sending' }))

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formState.name,
          email: formState.email,
          message: formState.message
        })
      })

      if (!response.ok) throw new Error('Failed to send message')

      setFormState(prev => ({
        ...prev,
        status: 'success',
        name: '',
        email: '',
        message: ''
      }))

      setTimeout(() => {
        setFormState(prev => ({ ...prev, status: '' }))
      }, 3000)

    } catch (error) {
      setFormState(prev => ({ ...prev, status: 'error' }))
      setTimeout(() => {
        setFormState(prev => ({ ...prev, status: '' }))
      }, 3000)
    }
  }

  return (
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-white mb-4">Connect</h2>
        <p className="text-xl text-orange-200/70">Let's Stay in Touch</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12 items-start">
        {/* Contact Form */}
        <motion.div
          className="bg-black/40 backdrop-blur-sm rounded-xl p-8 border border-orange-500/20"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-white mb-6">Send a Message</h3>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-white/80 mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                required
                value={formState.name}
                onChange={e => setFormState(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-4 py-3 rounded-lg bg-black/60 border border-orange-500/20 text-white placeholder:text-white/40 focus:outline-none focus:border-orange-500/40"
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                required
                value={formState.email}
                onChange={e => setFormState(prev => ({ ...prev, email: e.target.value }))}
                className="w-full px-4 py-3 rounded-lg bg-black/60 border border-orange-500/20 text-white placeholder:text-white/40 focus:outline-none focus:border-orange-500/40"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-white/80 mb-2">
                Message
              </label>
              <textarea
                id="message"
                required
                rows={4}
                value={formState.message}
                onChange={e => setFormState(prev => ({ ...prev, message: e.target.value }))}
                className="w-full px-4 py-3 rounded-lg bg-black/60 border border-orange-500/20 text-white placeholder:text-white/40 focus:outline-none focus:border-orange-500/40"
                placeholder="Your message..."
              />
            </div>
            <button
              type="submit"
              disabled={formState.status === 'sending'}
              className="w-full px-6 py-3 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-medium transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Send size={18} />
              {formState.status === 'sending' ? 'Sending...' : 'Send Message'}
            </button>
            {formState.status === 'success' && (
              <p className="text-green-500 text-center">Message sent successfully!</p>
            )}
            {formState.status === 'error' && (
              <p className="text-red-500 text-center">Failed to send message. Please try again.</p>
            )}
          </form>
        </motion.div>

        {/* Social Links & Info */}
        <div className="space-y-12">
          <motion.div
            className="bg-black/40 backdrop-blur-sm rounded-xl p-8 border border-orange-500/20"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-white mb-6">Follow Along</h3>
            <div className="grid grid-cols-2 gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-3 p-4 bg-black/40 rounded-lg border border-orange-500/10 hover:border-orange-500/30 text-white/80 ${link.color} transition-all group`}
                >
                  <link.icon className="w-5 h-5" />
                  <span className="font-medium">{link.name}</span>
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="bg-black/40 backdrop-blur-sm rounded-xl p-8 border border-orange-500/20"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-white mb-2">Newsletter</h3>
            <p className="text-white/60 mb-6">
              Subscribe to get updates about new releases, shows, and special announcements.
            </p>
            <form className="flex gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg bg-black/60 border border-orange-500/20 text-white placeholder:text-white/40 focus:outline-none focus:border-orange-500/40"
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-medium transition-colors"
              >
                Subscribe
              </button>
            </form>
          </motion.div>

          <div className="text-center">
            <p className="text-white/60 mb-4">For business inquiries</p>
            <a
              href="mailto:contact@shawnpander.com"
              className="inline-flex items-center gap-2 text-orange-400 hover:text-orange-300"
            >
              <Mail size={18} />
              contact@shawnpander.com
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}