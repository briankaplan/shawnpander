'use client'

import React from 'react'
import { useContext } from 'react'
import { MusicPlatformContext } from '@/contexts/MusicPlatformContext'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/effect-coverflow'

interface Album {
  id: string
  title: string
  release_date: string
  cover_url: string
  spotify_id: string
  apple_music_url?: string
  tidal_url?: string
  deezer_url?: string
  tracks: Track[]
  liner_notes?: string
  credits?: string
}

interface Track {
  id: string
  title: string
  duration: string
  spotify_uri: string
  side: 'A' | 'B'
  position: number
}

// Local data for now
const albums: Album[] = [
  {
    id: '1',
    title: 'Forever & For Now',
    release_date: '2023-12-22',
    cover_url: '/images/albums/Forever_and_for_now.webp',
    spotify_id: '5msMT1CsExJLdv96xtMwXE',
    apple_music_url: 'https://music.apple.com/artist/shawn-pander',
    tracks: [
      {
        id: '1',
        title: "Let's Just Groove",
        duration: '3:45',
        spotify_uri: 'spotify:track:xxx',
        side: 'A',
        position: 1
      },
      // Add more tracks as needed
    ],
    liner_notes: 'Coming December 22nd',
    credits: 'Produced by Shawn Pander'
  }
]

export default function Discography() {
  const { setCurrentAlbum, currentAlbum } = useContext(MusicPlatformContext)

  return (
    <div className="jukebox-container">
      <Swiper
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={3}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        className="album-swiper"
      >
        {albums.map((album) => (
          <SwiperSlide 
            key={album.id}
            onClick={() => setCurrentAlbum(album)}
            className={`cursor-pointer transition-all duration-300 ${
              currentAlbum?.id === album.id ? 'scale-110' : ''
            }`}
          >
            <img 
              src={album.cover_url} 
              alt={album.title}
              className="w-full h-full object-cover rounded-lg"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
} 