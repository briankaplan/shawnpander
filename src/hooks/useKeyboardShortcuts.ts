import { useEffect, useCallback } from 'react'

interface KeyboardShortcutsProps {
  onPlayPause?: () => void
  onNextTrack?: () => void
  onPrevTrack?: () => void
  onVolumeUp?: () => void
  onVolumeDown?: () => void
  onMute?: () => void
  onFlipVinyl?: () => void
  sections?: string[]
  onNavigate?: (section: string) => void
}

export function useKeyboardShortcuts({
  onPlayPause,
  onNextTrack,
  onPrevTrack,
  onVolumeUp,
  onVolumeDown,
  onMute,
  onFlipVinyl,
  sections = [],
  onNavigate
}: KeyboardShortcutsProps) {
  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    // Don't trigger shortcuts when typing in input fields
    if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
      return
    }

    // Music Player Controls
    switch (event.key.toLowerCase()) {
      case ' ':
        event.preventDefault()
        onPlayPause?.()
        break
      case 'arrowright':
        if (event.ctrlKey || event.metaKey) {
          event.preventDefault()
          onNextTrack?.()
        }
        break
      case 'arrowleft':
        if (event.ctrlKey || event.metaKey) {
          event.preventDefault()
          onPrevTrack?.()
        }
        break
      case 'arrowup':
        if (event.ctrlKey || event.metaKey) {
          event.preventDefault()
          onVolumeUp?.()
        }
        break
      case 'arrowdown':
        if (event.ctrlKey || event.metaKey) {
          event.preventDefault()
          onVolumeDown?.()
        }
        break
      case 'm':
        if (event.ctrlKey || event.metaKey) {
          event.preventDefault()
          onMute?.()
        }
        break
      case 'f':
        if (event.ctrlKey || event.metaKey) {
          event.preventDefault()
          onFlipVinyl?.()
        }
        break
    }

    // Section Navigation
    if (event.key >= '1' && event.key <= '9') {
      const index = parseInt(event.key) - 1
      if (index < sections.length) {
        event.preventDefault()
        onNavigate?.(sections[index])
      }
    }
  }, [
    onPlayPause,
    onNextTrack,
    onPrevTrack,
    onVolumeUp,
    onVolumeDown,
    onMute,
    onFlipVinyl,
    sections,
    onNavigate
  ])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [handleKeyPress])

  // Return keyboard shortcuts help text
  return {
    shortcuts: [
      { key: 'Space', description: 'Play/Pause' },
      { key: 'Ctrl/⌘ + →', description: 'Next Track' },
      { key: 'Ctrl/⌘ + ←', description: 'Previous Track' },
      { key: 'Ctrl/⌘ + ↑', description: 'Volume Up' },
      { key: 'Ctrl/⌘ + ↓', description: 'Volume Down' },
      { key: 'Ctrl/⌘ + M', description: 'Mute/Unmute' },
      { key: 'Ctrl/⌘ + F', description: 'Flip Vinyl' },
      { key: '1-9', description: 'Navigate to Section' }
    ]
  }
}