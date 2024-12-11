'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'

const links = [
  { href: '#home', label: 'Home' },
  { href: '#shows', label: 'Shows' },
  { href: '#music', label: 'Music' },
  { href: '#press', label: 'Press' },
  { href: '#contact', label: 'Contact' }
]

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav 
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        scrolled 
          ? 'py-3 bg-black/85 backdrop-blur-xl border-b border-white/5' 
          : 'py-6 bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="#home" className="relative z-50">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="relative w-[180px] h-[40px]"
            >
              <Image
                src="/images/background/logo.svg"
                alt="Shawn Pander"
                fill
                className="object-contain"
                style={{ 
                  filter: 'brightness(0) saturate(100%) invert(51%) sepia(14%) saturate(2169%) hue-rotate(158deg) brightness(87%) contrast(84%)'
                }}
                priority
              />
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-12">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group relative px-4 py-2"
              >
                <span className="relative z-10 text-base text-white/70 font-medium tracking-[0.15em] uppercase group-hover:text-white transition-colors duration-300">
                  {link.label}
                </span>
                <motion.div
                  className="absolute inset-0 bg-white/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  layoutId="navHover"
                />
              </Link>
            ))}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-3 bg-gradient-to-r from-[#3a83ac] to-[#3a83ac]/80 text-white rounded-full text-[15px] font-medium tracking-[0.15em] uppercase hover:from-[#3a83ac]/90 hover:to-[#3a83ac]/70 transition-all duration-300 shadow-lg shadow-[#3a83ac]/20"
            >
              Get Notified
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className="relative z-50 p-2 -mr-2 text-white md:hidden"
            whileTap={{ scale: 0.95 }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={isOpen ? 'close' : 'menu'}
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                transition={{ duration: 0.2 }}
              >
                {isOpen ? <X size={28} /> : <Menu size={28} />}
              </motion.div>
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-gradient-to-b from-black/95 to-black/90 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col items-center justify-center h-full gap-8">
              {links.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: 1, 
                    y: 0,
                    transition: { delay: i * 0.1 } 
                  }}
                >
                  <Link
                    href={link.href}
                    className="text-3xl text-white/70 hover:text-white transition-colors duration-300 tracking-[0.15em] uppercase"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  transition: { delay: links.length * 0.1 } 
                }}
                className="px-10 py-4 bg-gradient-to-r from-[#3a83ac] to-[#3a83ac]/80 text-white rounded-full text-lg font-medium tracking-[0.15em] uppercase hover:from-[#3a83ac]/90 hover:to-[#3a83ac]/70 transition-all duration-300 shadow-lg shadow-[#3a83ac]/20 mt-4"
              >
                Get Notified
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}