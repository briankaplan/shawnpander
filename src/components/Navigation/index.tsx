'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { StreamingLink } from '@/components/StreamingLinks'

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Prevent hydration mismatch by not rendering until mounted
  if (!isMounted) {
    return (
      <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="relative w-16 h-16" />
          </div>
        </div>
      </nav>
    )
  }

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-colors duration-300',
        isScrolled ? 'bg-black/80 backdrop-blur-lg' : 'bg-transparent'
      )}
      style={{
        transform: isScrolled ? 'none' : 'translateY(-100px)',
      }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="relative w-16 h-16 opacity-0 scale-90" style={{ 
              opacity: 1,
              transform: 'scale(1) translateZ(0)',
              transition: 'opacity 0.3s ease, transform 0.3s ease' 
            }}>
              <Image
                src="/images/albums/logo.webp"
                alt="Band Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-white hover:text-orange-500 transition-colors">
              Home
            </Link>
            <Link href="#vinyl" className="text-white hover:text-orange-500 transition-colors">
              Vinyl
            </Link>
            <Link href="#shows" className="text-white hover:text-orange-500 transition-colors">
              Shows
            </Link>
            <Link href="#press" className="text-white hover:text-orange-500 transition-colors">
              Press
            </Link>
            <Link href="#contact" className="text-white hover:text-orange-500 transition-colors">
              Contact
            </Link>
            <Link
              href="/tips"
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-full transition-colors"
            >
              Tip Shawn
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMounted && (
        <div
          className={cn(
            'fixed inset-0 z-40 md:hidden transition-all duration-300 overflow-y-auto',
            isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          )}
          style={{ top: '64px' }}
        >
          <div className="bg-black/95 backdrop-blur-lg min-h-[calc(100vh-64px)]">
            <div className="container mx-auto px-4 py-8 flex flex-col min-h-[calc(100vh-64px)]">
              {/* Album Promo Section */}
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Forever & For Now</h2>
                <p className="text-lg md:text-xl text-orange-200/70 mb-6">Available December 22nd</p>
                <div className="flex flex-col gap-3">
                  <StreamingLink
                    service="spotify"
                    href={`https://open.spotify.com/artist/${process.env.NEXT_PUBLIC_SPOTIFY_ARTIST_ID}`}
                  />
                  <StreamingLink
                    service="apple"
                    href="https://music.apple.com/search?term=shawn+pander"
                  />
                  <StreamingLink
                    service="amazon"
                    href="https://music.amazon.com/search/shawn+pander"
                  />
                </div>
              </div>

              {/* Navigation Links */}
              <div className="flex flex-col space-y-4 flex-1">
                <Link
                  href="/"
                  className="text-white hover:text-orange-500 transition-colors text-xl text-center"
                  onClick={() => setIsOpen(false)}
                >
                  Home
                </Link>
                <Link
                  href="#vinyl"
                  className="text-white hover:text-orange-500 transition-colors text-xl text-center"
                  onClick={() => setIsOpen(false)}
                >
                  Vinyl
                </Link>
                <Link
                  href="#shows"
                  className="text-white hover:text-orange-500 transition-colors text-xl text-center"
                  onClick={() => setIsOpen(false)}
                >
                  Shows
                </Link>
                <Link
                  href="#press"
                  className="text-white hover:text-orange-500 transition-colors text-xl text-center"
                  onClick={() => setIsOpen(false)}
                >
                  Press
                </Link>
                <Link
                  href="#contact"
                  className="text-white hover:text-orange-500 transition-colors text-xl text-center"
                  onClick={() => setIsOpen(false)}
                >
                  Contact
                </Link>
                <Link
                  href="/tips"
                  className="text-green-500 hover:text-green-400 transition-colors text-xl text-center font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  Tip Shawn
                </Link>
              </div>

              {/* Newsletter Signup */}
              <div className="mt-8">
                <h3 className="text-lg font-bold text-white mb-3">Stay Updated</h3>
                <form className="flex flex-col gap-3">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/40"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors"
                  >
                    Sign Up
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}