'use client'

import { motion } from 'framer-motion'
import { Download, Mail } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const quotes = [
  {
    text: "... a folk gem that improves with each listen...his music wouldn't be out of place on a modern rock playlist next to John Mayer or Dave Matthews.",
    author: "Texas Music Magazine"
  },
  {
    text: "Shawn Pander has a great voice and [Simplicity] is a great song",
    author: "Ahmet Ertegun - AOL's \"The Biz\""
  },
  {
    text: "No broken arrows... Shawn's aim as a writer is stunningly true and his soulful voice sends his words straight through the heart.",
    author: "Kimmie Rhodes"
  }
]

export function AboutSection() {
  return (
    <section id="about" className="w-full py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-white mb-8">About Shawn</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Bio and Image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden mb-6">
              <Image
                src="/images/press/shawn-pander-press.jpg"
                alt="Shawn Pander"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
            <div className="prose prose-invert">
              <p className="text-white/80 leading-relaxed">
                Texan born singer-songwriter Shawn Pander has an appeal to his roots-pop acoustic narratives that was come by honestly. A deep appreciation for his own soulful upbringing has given him the empathy to connect with listeners in a sincere and direct way.
              </p>
              <p className="text-white/80 leading-relaxed">
                Pander's blues-jazz-influenced songs strike deeply and precisely, provoking the same type of authentic emotional experience achieved lyrically by some of music's greatest storytellers.
              </p>
            </div>
          </motion.div>

          {/* Quotes */}
          <div className="space-y-8">
            {quotes.map((quote, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  delay: index * 0.2,
                  duration: 0.6,
                  ease: [0.21, 1.02, 0.73, 0.97]
                }}
              >
                <motion.blockquote 
                  className="text-xl text-white/80 italic mb-4"
                  whileHover={{ scale: 1.02 }}
                >
                  "{quote.text}"
                </motion.blockquote>
                <motion.cite 
                  className="text-orange-400 block pl-4 border-l-2 border-orange-500"
                >
                  - {quote.author}
                </motion.cite>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Media Inquiries and Downloads */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div 
            className="p-6 bg-black/30 backdrop-blur-sm rounded-lg border border-white/10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <h3 className="text-xl font-bold text-white mb-4">Media Inquiries</h3>
            <p className="text-white/60 mb-4">
              For press materials, interview requests, or other media inquiries, please contact:
            </p>
            <motion.a 
              href="mailto:press@shawnpander.com" 
              className="inline-flex items-center gap-2 text-orange-400 hover:text-orange-300 transition-colors"
              whileHover={{ x: 10 }}
            >
              <Mail className="w-5 h-5" />
              press@shawnpander.com
            </motion.a>
          </motion.div>

          <motion.div 
            className="p-6 bg-black/30 backdrop-blur-sm rounded-lg border border-white/10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            <h3 className="text-xl font-bold text-white mb-4">Press Kit & Downloads</h3>
            <p className="text-white/60 mb-4">
              Access high-resolution photos, technical requirements, and other press materials.
            </p>
            <Link href="/downloads" passHref>
              <motion.a 
                className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Download className="w-5 h-5" />
                Access Downloads
              </motion.a>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
} 