import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { VinylPlayer } from '../index'
import '@testing-library/jest-dom'
import type { Track } from '@/types/music'

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, className, style, animate, ...props }: any) => (
      <div 
        className={className}
        style={{
          ...style,
          transform: animate?.rotate ? `rotate(${animate.rotate}deg)` : undefined
        }}
        {...props}
      >
        {children}
      </div>
    ),
    button: ({ children, className, ...props }: any) => (
      <button className={className} {...props}>{children}</button>
    ),
  },
  AnimatePresence: ({ children }: any) => children,
}))

// Mock the VinylBackground component
jest.mock('@/components/ui/VinylBackground', () => ({
  VinylBackground: ({ children, animate, ...props }: any) => (
    <div data-testid="vinyl-record" data-animate={animate} {...props}>{children}</div>
  ),
}))

// Mock the Progress component
jest.mock('@/components/ui/Progress', () => ({
  Progress: ({ value, onChange, 'data-testid': testId }: any) => (
    <div 
      data-testid={testId}
      data-value={value}
      onClick={() => onChange?.(50)}
    />
  ),
}))

// Mock track data
const mockTracks: Track[] = [
  {
    id: 1,
    title: "Cold Days in June",
    duration: "3:45"
  },
  {
    id: 2,
    title: "Human Condition",
    duration: "4:12"
  }
]

// Mock useSpotifyData hook
jest.mock('@/hooks/useSpotifyData', () => ({
  useSpotifyData: () => ({
    albums: [{
      id: 'album1',
      name: 'Forever & For Now',
      tracks: mockTracks
    }],
    currentAlbum: {
      id: 'album1',
      name: 'Forever & For Now',
      tracks: mockTracks
    },
    loading: false,
    error: null,
    selectAlbum: jest.fn()
  })
}))

// Mock useVinylPlayer hook
const mockTogglePlay = jest.fn()
const mockPlayTrack = jest.fn()
const mockSeekTo = jest.fn()
const mockSetVolume = jest.fn()
const mockToggleMute = jest.fn()

let mockIsPlaying = false
let mockOnPlayStateChange: ((playing: boolean) => void) | null = null
let mockError: string | null = null

const mockUseVinylPlayer = jest.fn((props: any) => {
  mockOnPlayStateChange = props?.onPlayStateChange || null
  if (props?.onError && mockError) {
    props.onError(mockError)
  }
  return {
    currentTrack: mockTracks[0],
    isPlaying: mockIsPlaying,
    progress: 0,
    volume: 1,
    muted: false,
    togglePlay: () => {
      mockIsPlaying = !mockIsPlaying
      mockOnPlayStateChange?.(mockIsPlaying)
      mockTogglePlay()
    },
    playTrack: mockPlayTrack,
    seekTo: mockSeekTo,
    setVolume: mockSetVolume,
    toggleMute: mockToggleMute,
    error: mockError
  }
})

jest.mock('@/hooks/useVinylPlayer', () => ({
  useVinylPlayer: (props: any) => mockUseVinylPlayer(props)
}))

describe('VinylPlayer', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockIsPlaying = false
    mockOnPlayStateChange = null
    mockError = null
  })

  it('renders the vinyl player with initial track', async () => {
    render(<VinylPlayer />)
    
    await waitFor(() => {
      expect(screen.getByTestId('vinyl-record')).toBeInTheDocument()
      const trackElements = screen.getAllByText('Cold Days in June')
      const trackButton = trackElements.find(el => 
        el.closest('button')?.getAttribute('data-testid') === 'track-button-1'
      )
      expect(trackButton).toBeInTheDocument()
    })
  })

  it('toggles play/pause when clicking the play button', async () => {
    mockIsPlaying = true
    render(<VinylPlayer />)
    
    const playButton = screen.getByTestId('play-pause-button')
    await fireEvent.click(playButton)
    
    expect(mockTogglePlay).toHaveBeenCalled()
    const tonearm = screen.getByTestId('tonearm')
    expect(tonearm).toHaveStyle('transform: rotate(25deg)')
  })

  it('changes track when clicking on a different track', async () => {
    render(<VinylPlayer />)
    
    const newTrack = screen.getByText('Human Condition').closest('button')
    expect(newTrack).toBeInTheDocument()
    await fireEvent.click(newTrack!)
    
    expect(mockPlayTrack).toHaveBeenCalledWith(mockTracks[1])
  })

  it('updates progress bar when playing', async () => {
    render(<VinylPlayer />)
    
    await waitFor(() => {
      const progressBar = screen.getByTestId('track-progress')
      expect(progressBar).toHaveAttribute('data-value', '0')
    })
  })

  it('allows seeking through the track', async () => {
    render(<VinylPlayer />)
    
    await waitFor(() => {
      const progressBar = screen.getByTestId('track-progress')
      fireEvent.click(progressBar)
      expect(mockSeekTo).toHaveBeenCalledWith(50)
    })
  })

  it('handles errors gracefully', async () => {
    mockError = 'preview error'
    
    render(<VinylPlayer />)
    
    await waitFor(() => {
      expect(screen.getByText('Preview not available. Listen on Spotify.')).toBeInTheDocument()
    })
  })

  it('updates volume when using the volume slider', async () => {
    render(<VinylPlayer />)
    
    await waitFor(() => {
      const volumeSlider = screen.getByTestId('volume-slider')
      fireEvent.click(volumeSlider)
      expect(mockSetVolume).toHaveBeenCalledWith(0.5)
    })
  })

  it('rotates tonearm when playing', async () => {
    mockIsPlaying = true
    render(<VinylPlayer />)
    
    const playButton = screen.getByTestId('play-pause-button')
    await fireEvent.click(playButton)
    
    expect(mockTogglePlay).toHaveBeenCalled()
    const tonearm = screen.getByTestId('tonearm')
    expect(tonearm).toHaveStyle('transform: rotate(25deg)')
  })
})