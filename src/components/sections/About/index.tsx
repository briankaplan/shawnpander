'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { ChevronDown } from 'lucide-react'

export function AboutSection() {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <section className="container mx-auto px-4 md:px-6 lg:px-8">
      {/* Photo and Quotes Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-8">
        {/* Photo */}
        <div className="relative aspect-[3/4] overflow-hidden rounded-2xl">
          <Image
            src="/images/headshot/EXQfhCeR.jpeg"
            alt="Shawn Pander"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
          />
        </div>

        {/* Animated Quotes */}
        <div className="space-y-6 flex flex-col justify-center">
          <motion.blockquote
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-lg p-4"
          >
            <p className="text-white/80 italic mb-2">"... a folk gem that improves with each listen...his music wouldn't be out of place on a modern rock playlist next to John Mayer or Dave Matthews."</p>
            <cite className="text-sm text-orange-500 not-italic">- Texas Music Magazine</cite>
          </motion.blockquote>

          <motion.blockquote
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-lg p-4"
          >
            <p className="text-white/80 italic mb-2">"Shawn Pander has a great voice and [Simplicity] is a great song"</p>
            <cite className="text-sm text-orange-500 not-italic">- Ahmet Ertegun - AOL's "The Biz"</cite>
          </motion.blockquote>

          <motion.blockquote
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-lg p-4"
          >
            <p className="text-white/80 italic mb-2">"No broken arrows... Shawn's aim as a writer is stunningly true and his soulful voice sends his words straight through the heart."</p>
            <cite className="text-sm text-orange-500 not-italic">- Kimmie Rhodes</cite>
          </motion.blockquote>
        </div>
      </div>

      {/* Biography */}
      <div className="mt-16 prose prose-invert prose-orange max-w-none">
        <p>
          Texan born singer-songwriter Shawn Pander has an appeal to his roots-pop acoustic narratives that was come by honestly. A deep appreciation for his own soulful upbringing has given him the empathy to connect with listeners in a sincere and direct way. Pander's blues-jazz-influenced songs strike deeply and precisely, provoking the same type of authentic emotional experience achieved lyrically by some of music's greatest storytellers.
        </p>
        <AnimatePresence>
          {isExpanded && (
            <motion.p
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              In fact, he was destined to tell a good story. Pander's musical journey began as a five-year-old boy. While keeping his father company at work— a used car lot on the outskirts of Houston— Shawn befriended an elderly blues man they called Homeless James, who played guitar along the sidewalk. An odd couple they were, as James dealt young Shawn a strong and very real dose of true Americana roots music. Eventually the business "went under" so Shawn went to say goodbye to his unlikely mentor and that fateful last encounter set him on a lifelong journey as a musician. "If I'm not going to see you again, you'll need this," James said, selflessly handing over his beloved Yamaha SG75 guitar. Now, decades later, Shawn's strives to honor the story that started with James. He still writes most all of his material on that old guitar.
            </motion.p>
          )}
        </AnimatePresence>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2 text-orange-500 hover:text-orange-400 transition-colors mt-2"
        >
          <span>{isExpanded ? 'Read less' : 'Read more'}</span>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="w-4 h-4" />
          </motion.div>
        </button>
      </div>

      {/* Contact Info */}
      <div className="mt-16">
        <div className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-lg p-6">
          <h2 className="text-xl font-bold text-white mb-4">Contact</h2>
          <div className="space-y-3">
            <div>
              <p className="text-white/60">For press inquiries:</p>
              <a href="mailto:press@shawnpander.com" className="text-white hover:text-orange-500 transition-colors">
                press@shawnpander.com
              </a>
            </div>
            <div>
              <p className="text-white/60">For booking:</p>
              <a href="mailto:booking@shawnpander.com" className="text-white hover:text-orange-500 transition-colors">
                booking@shawnpander.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 