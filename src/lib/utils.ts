import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Audio visualization utilities
export function createGradient(
  ctx: CanvasRenderingContext2D,
  height: number,
  startColor: string = '#f97316',
  endColor: string = '#ea580c'
) {
  const gradient = ctx.createLinearGradient(0, 0, 0, height)
  gradient.addColorStop(0, startColor)
  gradient.addColorStop(1, endColor)
  return gradient
}

export function normalizeData(data: Uint8Array): number[] {
  const multiplier = Math.pow(2, 16) - 1
  return Array.from(data).map(n => n / multiplier)
}

export function getAverageVolume(array: Uint8Array): number {
  const values = array.reduce((a, b) => a + b, 0)
  return values / array.length
}

export function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = Math.floor(seconds % 60)
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
}

export const audioConfig = {
  fftSize: 256,
  smoothingTimeConstant: 0.8,
  minDecibels: -100,
  maxDecibels: -30,
}

export function formatDate(dateString: string) {
  const date = new Date(dateString)
  return {
    day: date.getDate(),
    month: date.toLocaleString('default', { month: 'short' }),
    year: date.getFullYear()
  }
}