'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const links = [
  { href: '#home', label: 'Home' },
  { href: '#music', label: 'Music' },
  { href: '#shows', label: 'Shows' },
  { href: '#press', label: 'Press' },
  { href: '#contact', label: 'Contact' }
]

export default function NavigationContent() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      {/* Main Navigation Bar */}
      <div className="flex items-center justify-between h-24">
        {/* Logo */}
        <Link href="#home" className="flex items-center relative z-10">
          <div className="relative w-56 h-16">
            <Image
              src="/images/albums/logo.webp"
              alt="Shawn Pander"
              fill
              className="object-contain"
              sizes="(max-width: 768px) 192px, 224px"
              priority
            />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center">
          <nav className="flex items-center space-x-10 mr-8">
            {links.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-white hover:text-orange-400 transition-colors text-lg font-medium tracking-wide"
              >
                {label}
              </Link>
            ))}
          </nav>
          <Link
            href="/tips"
            className="px-6 py-2.5 bg-green-500 hover:bg-green-400 text-white font-medium rounded-full shadow-lg transition-colors"
          >
            Tip Shawn
          </Link>
        </div>

        {/* Mobile Controls */}
        <div className="flex md:hidden items-center gap-4">
          <Link
            href="/tips"
            className="px-4 py-2 bg-green-500 hover:bg-green-400 text-white text-sm font-medium rounded-full shadow-lg transition-colors"
          >
            Tip Shawn
          </Link>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-12 h-12 bg-orange-500 hover:bg-orange-400 rounded-full shadow-lg transition-colors focus:outline-none"
          >
            <span className="sr-only">Menu</span>
            <div className="w-6 mx-auto">
              <span className={`block h-0.5 w-full bg-white rounded transition-all ${isOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
              <span className={`block h-0.5 w-full bg-white rounded my-1.5 transition-all ${isOpen ? 'opacity-0' : ''}`} />
              <span className={`block h-0.5 w-full bg-white rounded transition-all ${isOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="fixed inset-x-0 top-24 bottom-0 z-50 bg-black/95 backdrop-blur-lg md:hidden">
          <div className="flex flex-col items-center py-12 px-6 h-full">
            <nav className="flex flex-col items-center space-y-8">
              {links.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setIsOpen(false)}
                  className="text-3xl font-bold text-white hover:text-orange-400 transition-colors"
                >
                  {label}
                </Link>
              ))}
            </nav>
            <div className="mt-auto">
              <button className="px-8 py-3 bg-orange-500 hover:bg-orange-400 text-white font-medium rounded-full transition-colors">
                Newsletter
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 