'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface NavigationProps {
  className?: string
}

const navigation = [
  { name: 'Music', href: '/#music' },
  { name: 'Shows', href: '/#shows' },
  { name: 'About', href: '/#about' },
  { name: 'Downloads', href: '/downloads' },
  { name: 'Contact', href: '/#contact' }
]

export function Navigation({ className }: NavigationProps) {
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setIsVisible(currentScrollY < lastScrollY || currentScrollY < 100)
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  return (
    <nav className={`${className} bg-black/20 backdrop-blur-sm ${
      isVisible ? 'translate-y-0' : '-translate-y-full'
    } transition-transform duration-300`}>
      <div className="max-w-6xl mx-auto px-4">
        <ul className="flex justify-center space-x-8">
          {navigation.map((item) => (
            <li key={item.name}>
              <Link href={item.href} className="px-4 py-4 text-white/70 hover:text-white transition-colors">
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
} 