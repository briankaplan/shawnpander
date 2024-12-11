export * from './music'
export * from './api'
export * from './routes'

// Global type declarations
declare global {
  interface Window {
    MusicKit: any // TODO: Add proper MusicKit types
  }
}