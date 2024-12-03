'use client'

import { motion } from 'framer-motion'
import { FileText, FileImage, FileArchive, Download, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

interface DownloadItem {
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

const downloads: DownloadItem[] = [
  {
    title: 'Artist Biography',
    description: 'Full artist biography, background, and career highlights.',
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
    description: 'High-resolution promotional photos in various formats.',
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
    title: 'Press Kit',
    description: 'Complete press kit including bio, photos, and press quotes.',
    formats: [
      {
        type: 'Full Kit (ZIP)',
        url: '/downloads/press/press-kit.zip',
        size: '35 MB',
        icon: FileArchive
      },
      {
        type: 'Press Release',
        url: '/downloads/press/press-release.pdf',
        size: '1 MB',
        icon: FileText
      }
    ]
  },
  {
    title: 'Technical Requirements',
    description: 'Stage plot, technical rider, and equipment specifications.',
    formats: [
      {
        type: 'Tech Rider',
        url: '/downloads/tech/tech-rider.pdf',
        size: '3 MB',
        icon: FileText
      },
      {
        type: 'Stage Plot',
        url: '/downloads/tech/stage-plot.pdf',
        size: '2 MB',
        icon: FileText
      },
      {
        type: 'Full Package',
        url: '/downloads/tech/tech-package.zip',
        size: '5 MB',
        icon: FileArchive
      }
    ]
  }
]

export function DownloadsSection() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-orange-950/5 to-black py-32">
      <div className="container mx-auto px-4">
        <div className="mb-12">
          <Link href="/#about" passHref>
            <motion.a
              className="inline-flex items-center gap-2 text-orange-400 hover:text-orange-300 transition-colors"
              whileHover={{ x: -5 }}
            >
              <ArrowLeft className="w-5 h-5" />
              Back to About
            </motion.a>
          </Link>
          <h1 className="text-4xl font-bold text-white mt-6">Press Kit & Downloads</h1>
          <p className="text-white/60 mt-4">
            Download high-resolution photos, press materials, and technical requirements.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8">
          {downloads.map((item, index) => (
            <motion.div
              key={item.title}
              className="bg-black/30 backdrop-blur-sm rounded-lg p-6 border border-white/10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.01, borderColor: 'rgba(249, 115, 22, 0.2)' }}
            >
              <div className="flex flex-col gap-4">
                <div>
                  <h2 className="text-xl font-bold text-white mb-2">{item.title}</h2>
                  <p className="text-white/60 mb-6">{item.description}</p>

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
        </div>

        <motion.div 
          className="mt-12 p-6 bg-black/30 backdrop-blur-sm rounded-lg border border-white/10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <h3 className="text-xl font-bold text-white mb-4">Need Something Else?</h3>
          <p className="text-white/60 mb-4">
            If you need additional materials or have specific requirements, please contact:
          </p>
          <motion.a 
            href="mailto:press@shawnpander.com" 
            className="text-orange-400 hover:text-orange-300 transition-colors inline-block"
            whileHover={{ x: 10 }}
          >
            press@shawnpander.com
          </motion.a>
        </motion.div>
      </div>
    </div>
  )
} 