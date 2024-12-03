import { config } from '@fortawesome/fontawesome-svg-core'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faFacebook, faInstagram, faSpotify, faYoutube } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons'

// Prevent FontAwesome from adding its CSS since we're doing it manually
config.autoAddCss = false

// Add icons to the library
library.add(
  faFacebook,
  faInstagram,
  faSpotify,
  faYoutube,
  faEnvelope,
  faPhone
) 