'use client'

type Pattern = number | number[]

const createPattern = (pattern: Pattern) => {
  if ('vibrate' in navigator) {
    navigator.vibrate(pattern)
  }
}

export const haptics = {
  // Basic patterns
  light: () => createPattern(10),
  medium: () => createPattern([30, 30]),
  heavy: () => createPattern([50, 30, 50]),
  error: () => createPattern([100, 30, 100, 30]),

  // Custom patterns
  success: () => createPattern([50, 30, 50, 30, 100]),
  warning: () => createPattern([30, 50, 30, 50]),
  notification: () => createPattern([0, 100, 30, 100]),
  
  // Interactive patterns
  buttonPress: () => createPattern(15),
  buttonRelease: () => createPattern(10),
  swipe: () => createPattern([20, 20, 20]),
  longPress: () => createPattern([50, 50, 100]),
  doubleTap: () => createPattern([20, 30, 20]),
  
  // Custom sequences
  playSequence: (patterns: Pattern[]) => {
    const sequence = patterns.reduce((acc: number[], pattern) => {
      return Array.isArray(pattern) 
        ? [...acc, ...pattern] 
        : [...acc, pattern]
    }, [])
    createPattern(sequence)
  }
} 