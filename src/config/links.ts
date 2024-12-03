import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { 
  faSpotify, 
  faApple, 
  faAmazon,
  faInstagram, 
  faFacebook, 
  faXTwitter 
} from '@fortawesome/free-brands-svg-icons'

interface DSPLink {
  name: string
  icon: IconDefinition
  url: string
  hoverColor: string
}

interface SocialLink {
  name: string
  icon: IconDefinition
  url: string
  hoverColor: string
}

export const dspLinks: DSPLink[] = [
  {
    name: 'Spotify',
    icon: faSpotify,
    url: 'https://open.spotify.com/artist/shawnpander',
    hoverColor: 'hover:text-green-500'
  },
  {
    name: 'Apple Music',
    icon: faApple,
    url: 'https://music.apple.com/artist/shawnpander',
    hoverColor: 'hover:text-red-500'
  },
  {
    name: 'Amazon Music',
    icon: faAmazon,
    url: 'https://music.amazon.com/artists/shawnpander',
    hoverColor: 'hover:text-blue-500'
  }
]

export const socialLinks: SocialLink[] = [
  {
    name: 'Instagram',
    icon: faInstagram,
    url: 'https://instagram.com/shawnpander',
    hoverColor: 'hover:text-orange-400'
  },
  {
    name: 'Facebook',
    icon: faFacebook,
    url: 'https://facebook.com/shawnpander',
    hoverColor: 'hover:text-orange-400'
  },
  {
    name: 'Twitter',
    icon: faXTwitter,
    url: 'https://twitter.com/shawnpander',
    hoverColor: 'hover:text-orange-400'
  }
]

// Latest album DSP links (if different from artist links)
export const latestAlbumLinks = {
  spotify: 'https://open.spotify.com/album/forever-and-for-now',
  appleMusic: 'https://music.apple.com/album/forever-and-for-now',
  amazonMusic: 'https://music.amazon.com/albums/forever-and-for-now'
} 