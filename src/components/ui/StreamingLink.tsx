'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpotify, faApple, faAmazon } from '@fortawesome/free-brands-svg-icons'
import { ExternalLink } from 'lucide-react'

type ServiceType = 'spotify' | 'apple' | 'amazon'

interface StreamingLinkProps {
  service: ServiceType
  href: string
}

const serviceConfig = {
  spotify: {
    icon: faSpotify,
    label: 'Spotify',
    textColor: 'text-green-200/70 hover:text-green-400'
  },
  apple: {
    icon: faApple,
    label: 'Apple Music',
    textColor: 'text-pink-200/70 hover:text-pink-400'
  },
  amazon: {
    icon: faAmazon,
    label: 'Amazon Music',
    textColor: 'text-orange-200/70 hover:text-orange-400'
  }
}

export function StreamingLink({ service, href }: StreamingLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex items-center gap-3 px-6 py-3 bg-black/30 backdrop-blur-sm rounded-full ${serviceConfig[service].textColor} transition-all duration-300 hover:scale-105`}
    >
      <FontAwesomeIcon icon={serviceConfig[service].icon} className="h-6 w-6" />
      <span>{serviceConfig[service].label}</span>
      <ExternalLink size={16} />
    </a>
  )
} 