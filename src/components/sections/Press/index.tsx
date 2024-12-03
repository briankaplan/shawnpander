'use client'

import { motion } from 'framer-motion'
import { FileText, Image as ImageIcon, FileImage, FileArchive } from 'lucide-react'
import Image from 'next/image'

interface PressItem {
  title: string
  description: string
  formats: {
    type: string
    url: string
    size: string
    icon: any
  }[]
  preview?: string
}

const pressKit: PressItem[] = [
  {
    title: 'Artist Biography',
    description: 'Texan born singer-songwriter Shawn Pander has an appeal to his roots-pop acoustic narratives that was come by honestly...',
    preview: `Texan born singer-songwriter Shawn Pander has an appeal to his roots-pop acoustic narratives that was come by honestly. A deep appreciation for his own soulful upbringing has given him the empathy to connect with listeners in a sincere and direct way. Pander's blues-jazz-influenced songs strike deeply and precisely, provoking the same type of authentic emotional experience achieved lyrically by some of music's greatest storytellers.

In fact, he was destined to tell a good story. Pander's musical journey began as a five-year-old boy. While keeping his father company at work— a used car lot on the outskirts of Houston— Shawn befriended an elderly blues man they called Homeless James, who played guitar along the sidewalk...`,
    formats: [
      {
        type: 'PDF',
        url: '/downloads/bio/shawn-pander-bio.pdf',
        size: '2 MB',
        icon: FileText
      },
      {
        type: 'Word',
        url: '/downloads/bio/shawn-pander-bio.docx',
        size: '1.5 MB',
        icon: FileText
      },
      {
        type: 'Text',
        url: '/downloads/bio/shawn-pander-bio.txt',
        size: '1 KB',
        icon: FileText
      }
    ]
  },
  {
    title: 'Press Photos',
    description: 'High-resolution promotional photos in various formats, including both color and black & white versions.',
    formats: [
      {
        type: 'High Res',
        url: '/downloads/photos/press-photos-high.zip',
        size: '25 MB',
        icon: FileArchive
      },
      {
        type: 'Web Ready',
        url: '/downloads/photos/press-photos-web.zip',
        size: '8 MB',
        icon: FileArchive
      },
      {
        type: 'Selected JPG',
        url: '/downloads/photos/press-photo-main.jpg',
        size: '5 MB',
        icon: FileImage
      }
    ]
  },
  {
    title: 'Press Quotes & Reviews',
    description: 'Collection of press quotes, reviews, and testimonials from industry professionals.',
    formats: [
      {
        type: 'PDF',
        url: '/downloads/press/press-quotes.pdf',
        size: '1.5 MB',
        icon: FileText
      },
      {
        type: 'Text',
        url: '/downloads/press/press-quotes.txt',
        size: '1 KB',
        icon: FileText
      }
    ]
  },
  {
    title: 'Technical Requirements',
    description: 'Stage plot, technical rider, and equipment specifications.',
    formats: [
      {
        type: 'PDF',
        url: '/downloads/tech/tech-rider.pdf',
        size: '3 MB',
        icon: FileText
      },
      {
        type: 'ZIP',
        url: '/downloads/tech/tech-package.zip',
        size: '5 MB',
        icon: FileArchive
      }
    ]
  }
]

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

export function PressSection() {
  return (
    <section id="press" className="w-full py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-white mb-8">Press & Downloads</h2>

        <div className="mb-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div 
            className="relative aspect-[4/3] rounded-lg overflow-hidden"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Image
              src="/images/press/shawn-pander-press.jpg"
              alt="Shawn Pander"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </motion.div>
          
          <div className="flex flex-col justify-center space-y-8">
            {quotes.map((quote, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  delay: index * 0.2,
                  duration: 0.6,
                  ease: [0.21, 1.02, 0.73, 0.97] // Smooth easing
                }}
              >
                <motion.blockquote 
                  className="text-xl text-white/80 italic mb-4"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  "{quote.text}"
                </motion.blockquote>
                <motion.cite 
                  className="text-orange-400 block pl-4 border-l-2 border-orange-500"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2 + 0.3 }}
                >
                  - {quote.author}
                </motion.cite>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div 
          className="grid grid-cols-1 gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          {pressKit.map((item, index) => (
            <motion.div
              key={item.title}
              className="bg-black/30 backdrop-blur-sm rounded-lg p-6 border border-white/10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + index * 0.1 }}
              whileHover={{ scale: 1.01, borderColor: 'rgba(249, 115, 22, 0.2)' }}
            >
              <div className="flex flex-col gap-4">
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-white/60 mb-4">{item.description}</p>
                  
                  {item.preview && (
                    <motion.div 
                      className="mb-6 p-4 bg-black/20 rounded-lg text-white/80 text-sm leading-relaxed"
                      whileHover={{ backgroundColor: 'rgba(0,0,0,0.3)' }}
                    >
                      {item.preview}
                      <div className="mt-2 text-orange-400 hover:text-orange-300 transition-colors cursor-pointer">
                        Read more...
                      </div>
                    </motion.div>
                  )}

                  <div className="flex flex-wrap gap-4">
                    {item.formats.map((format) => (
                      <motion.a
                        key={format.type}
                        href={format.url}
                        download
                        className="flex items-center gap-3 px-4 py-2 bg-black/40 text-white rounded-lg transition-colors border border-white/10"
                        whileHover={{ 
                          scale: 1.05,
                          backgroundColor: 'rgba(0,0,0,0.6)',
                          borderColor: 'rgba(249, 115, 22, 0.5)'
                        }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <format.icon className="w-4 h-4 text-orange-400" />
                        <span>{format.type}</span>
                        <span className="text-white/40 text-sm">({format.size})</span>
                      </motion.a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="mt-8 p-6 bg-black/30 backdrop-blur-sm rounded-lg border border-white/10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <h3 className="text-xl font-bold text-white mb-4">Media Inquiries</h3>
          <p className="text-white/60 mb-4">
            For additional press materials, interview requests, or other media inquiries, please contact:
          </p>
          <motion.a 
            href="mailto:press@shawnpander.com" 
            className="text-orange-400 hover:text-orange-300 transition-colors inline-block"
            whileHover={{ scale: 1.05, x: 10 }}
            whileTap={{ scale: 0.98 }}
          >
            press@shawnpander.com
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}