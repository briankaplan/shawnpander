'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { ExternalLink } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Silhouette } from '@/components/ui/Silhouette'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpotify, faAppleMusic, faAmazon } from '@fortawesome/free-brands-svg-icons'

// ... rest of the imports and interface remain the same ...

// In the component, replace the Streaming Links section with:

{/* Streaming Links */}
{streamingLinks && (
  <div className="flex flex-wrap gap-4 justify-center md:justify-start">
    {streamingLinks.spotify && (
      <a
        href={streamingLinks.spotify}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 px-6 py-3 bg-black/30 backdrop-blur-sm rounded-full text-green-200/70 hover:text-green-400 transition-all duration-300 hover:scale-105"
      >
        <FontAwesomeIcon icon={faSpotify} className="h-4 w-4" />
        <ExternalLink size={16} />
      </a>
    )}
    {streamingLinks.appleMusic && (
      <a
        href={streamingLinks.appleMusic}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 px-6 py-3 bg-black/30 backdrop-blur-sm rounded-full text-pink-200/70 hover:text-pink-400 transition-all duration-300 hover:scale-105"
      >
        <FontAwesomeIcon icon={faAppleMusic} className="h-4 w-4" />
        <ExternalLink size={16} />
      </a>
    )}
    {streamingLinks.amazonMusic && (
      <a
        href={streamingLinks.amazonMusic}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 px-6 py-3 bg-black/30 backdrop-blur-sm rounded-full text-orange-200/70 hover:text-orange-400 transition-all duration-300 hover:scale-105"
      >
        <FontAwesomeIcon icon={faAmazon} className="h-4 w-4" />
        <ExternalLink size={16} />
      </a>
    )}
  </div>
)}