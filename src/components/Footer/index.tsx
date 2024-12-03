'use client'

import Link from 'next/link'
import { StylizedLogo } from '@/components/ui/StylizedLogo'
import { cn } from '@/lib/utils'

const links = [
  { href: '/', label: 'Home' },
  { href: '/music', label: 'Music' },
  { href: '/tips', label: 'Tips' },
  { href: '/terms', label: 'Terms' },
]

const socialLinks = [
  { href: 'https://spotify.com', label: 'Spotify', icon: 'spotify' },
  { href: 'https://instagram.com', label: 'Instagram', icon: 'instagram' },
  { href: 'https://twitter.com', label: 'Twitter', icon: 'twitter' },
]

export function Footer() {
  return (
    <footer className="bg-black text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <StylizedLogo size="sm" animated={false} />
              <span className="text-white font-bold text-lg">Band Tips</span>
            </Link>
            <p className="text-zinc-400 text-sm">
              Support your favorite band with tips and receive exclusive updates
            </p>
          </div>

          <div>
            <h3 className="font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {links.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-zinc-400 hover:text-white transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">Follow Us</h3>
            <ul className="space-y-2">
              {socialLinks.map(({ href, label }) => (
                <li key={href}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-400 hover:text-white transition-colors"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">Newsletter</h3>
            <form className="space-y-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
              <button
                className={cn(
                  "w-full px-4 py-2 bg-orange-600 text-white rounded-lg",
                  "hover:bg-orange-700 active:scale-95",
                  "transition-all duration-200"
                )}
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-zinc-800 text-center text-zinc-400 text-sm">
          <p>© {new Date().getFullYear()} Band Tips. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}