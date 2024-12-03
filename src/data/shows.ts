export interface Show {
  id: string
  date: string
  time: string
  title: string
  venue: {
    name: string
    address: string
  }
  description: string
  ticketUrl: string
}

export const upcomingShows: Show[] = [
  {
    id: 'vinyl-release',
    date: 'December 9, 2024',
    time: '6:00 PM',
    title: 'Saxon Pub Vinyl Release',
    venue: {
      name: 'The Saxon Pub',
      address: '1320 S Lamar Blvd, Austin, TX 78704'
    },
    description: "Come hang with me at The Saxon Pub to celebrate my new vinyl release. It's gonna be a laid-back evening of music and stories in one of my favorite spots. Let's make it a night to remember.",
    ticketUrl: 'https://thesaxonpub.com'
  },
  {
    id: 'armadillo-bazaar',
    date: 'December 15, 2024',
    time: '7:00 PM',
    title: 'Armadillo Christmas Bazaar with HappyLand',
    venue: {
      name: 'Palmer Events Center',
      address: '900 Barton Springs Rd, Austin, TX 78704'
    },
    description: "Join me and my band, HappyLand, at the Armadillo Christmas Bazaar. It's the perfect mix of live music, cool art, and holiday vibes. We'll be bringing the good energy—don't miss it.",
    ticketUrl: 'https://armadillobazaar.com'
  },
  {
    id: 'happyland-saxon',
    date: 'December 16, 2024',
    time: '6:00 PM',
    title: 'Saxon Pub with HappyLand',
    venue: {
      name: 'The Saxon Pub',
      address: '1320 S Lamar Blvd, Austin, TX 78704'
    },
    description: "Wrap up your weekend with me and HappyLand back at The Saxon Pub. Great music, chill atmosphere, and a few surprises—it's gonna be a vibe.",
    ticketUrl: 'https://thesaxonpub.com'
  }
] 