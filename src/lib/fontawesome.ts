import { config, library } from '@fortawesome/fontawesome-svg-core'
import { faFacebook, faInstagram, faSpotify, faYoutube } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons'

// Configure FontAwesome
config.autoAddCss = false

// Add icons to library
library.add(
  faFacebook,
  faInstagram,
  faSpotify,
  faYoutube,
  faEnvelope,
  faPhone
)

export default config 