import '@testing-library/jest-dom'
import 'jest-environment-jsdom'

// Mock fetch globally
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ data: 'Mock Spotify Data' })
  } as unknown as Response)
) as jest.Mock

// Mock HTMLMediaElement
Object.defineProperty(window, 'HTMLMediaElement', {
  writable: true,
  value: class {
    volume: number = 1
    currentTime: number = 0
    duration: number = 100
    paused: boolean = true
    src: string = ''
    
    load() { return Promise.resolve() }
    play() { 
      this.paused = false
      return Promise.resolve() 
    }
    pause() { 
      this.paused = true 
    }
    addEventListener() {}
    removeEventListener() {}
  }
})

// Mock ResizeObserver
window.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}))

// Mock IntersectionObserver
window.IntersectionObserver = jest.fn().mockImplementation(() => ({
  root: null,
  rootMargin: '',
  thresholds: [],
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
  takeRecords: () => []
}))

// Mock requestAnimationFrame
window.requestAnimationFrame = jest.fn((callback) => {
  callback(0)
  return 0
})

// Mock cancelAnimationFrame
window.cancelAnimationFrame = jest.fn()

// Mock matchMedia
window.matchMedia = jest.fn().mockImplementation(query => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: jest.fn(),
  removeListener: jest.fn(),
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  dispatchEvent: jest.fn(),
}))

// Suppress console.error for React warnings
const originalError = console.error
console.error = (...args) => {
  if (
    /Warning.*not wrapped in act/.test(args[0]) ||
    /Warning.*React does not recognize the.*prop/.test(args[0])
  ) {
    return
  }
  originalError.call(console, ...args)
}