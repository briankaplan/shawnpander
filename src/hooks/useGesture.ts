'use client'

import { useState, useCallback, useRef } from 'react'
import { haptics } from '@/utils/haptics'

interface GestureState {
  startX: number
  startY: number
  deltaX: number
  deltaY: number
  direction: 'left' | 'right' | 'up' | 'down' | null
  distance: number
  velocity: number
  rotation: number
  scale: number
}

interface GestureHandlers {
  onSwipe?: (direction: GestureState['direction'], velocity: number) => void
  onSwipeLeft?: () => void
  onSwipeRight?: () => void
  onSwipeUp?: () => void
  onSwipeDown?: () => void
  onLongPress?: (position: { x: number, y: number }) => void
  onDoubleTap?: (position: { x: number, y: number }) => void
  onPinch?: (scale: number) => void
  onRotate?: (angle: number) => void
  onPressStart?: () => void
  onPressEnd?: () => void
  enableHaptics?: boolean
}

export function useGesture(handlers: GestureHandlers) {
  const [gesture, setGesture] = useState<GestureState>({
    startX: 0,
    startY: 0,
    deltaX: 0,
    deltaY: 0,
    direction: null,
    distance: 0,
    velocity: 0,
    rotation: 0,
    scale: 1
  })

  const [lastTap, setLastTap] = useState(0)
  const longPressTimer = useRef<NodeJS.Timeout>()
  const initialTouchDistance = useRef<number>(0)
  const initialTouchAngle = useRef<number>(0)

  const getDistance = (touches: TouchList) => {
    if (touches.length < 2) return 0
    const dx = touches[1].clientX - touches[0].clientX
    const dy = touches[1].clientY - touches[0].clientY
    return Math.sqrt(dx * dx + dy * dy)
  }

  const getAngle = (touches: TouchList) => {
    if (touches.length < 2) return 0
    return Math.atan2(
      touches[1].clientY - touches[0].clientY,
      touches[1].clientX - touches[0].clientX
    )
  }

  const handleTouchStart = useCallback((e: TouchEvent) => {
    const touch = e.touches[0]
    const now = Date.now()
    
    // Double tap detection
    if (now - lastTap < 300) {
      handlers.onDoubleTap?.({ x: touch.clientX, y: touch.clientY })
      if (handlers.enableHaptics) haptics.doubleTap()
    }
    setLastTap(now)

    // Long press detection
    longPressTimer.current = setTimeout(() => {
      handlers.onLongPress?.({ x: touch.clientX, y: touch.clientY })
      if (handlers.enableHaptics) haptics.longPress()
    }, 500)

    // Multi-touch gesture initialization
    if (e.touches.length === 2) {
      initialTouchDistance.current = getDistance(e.touches)
      initialTouchAngle.current = getAngle(e.touches)
    }

    handlers.onPressStart?.()
    if (handlers.enableHaptics) haptics.buttonPress()

    setGesture({
      startX: touch.clientX,
      startY: touch.clientY,
      deltaX: 0,
      deltaY: 0,
      direction: null,
      distance: 0,
      velocity: 0,
      rotation: 0,
      scale: 1
    })
  }, [handlers, lastTap])

  const handleTouchMove = useCallback((e: TouchEvent) => {
    const touch = e.touches[0]
    
    // Multi-touch gesture handling
    if (e.touches.length === 2) {
      const currentDistance = getDistance(e.touches)
      const currentAngle = getAngle(e.touches)
      
      const scale = currentDistance / initialTouchDistance.current
      const rotation = (currentAngle - initialTouchAngle.current) * (180 / Math.PI)

      handlers.onPinch?.(scale)
      handlers.onRotate?.(rotation)

      setGesture(prev => ({
        ...prev,
        scale,
        rotation
      }))
    }

    setGesture(prev => {
      const deltaX = touch.clientX - prev.startX
      const deltaY = touch.clientY - prev.startY
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)
      const velocity = distance / e.timeStamp
      
      let direction = prev.direction
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        direction = deltaX > 0 ? 'right' : 'left'
      } else {
        direction = deltaY > 0 ? 'down' : 'up'
      }

      return {
        ...prev,
        deltaX,
        deltaY,
        direction,
        distance,
        velocity
      }
    })

    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current)
    }
  }, [handlers])

  const handleTouchEnd = useCallback(() => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current)
    }

    handlers.onPressEnd?.()
    if (handlers.enableHaptics) haptics.buttonRelease()

    if (gesture.distance > 50) {
      handlers.onSwipe?.(gesture.direction, gesture.velocity)
      if (handlers.enableHaptics) haptics.swipe()
      
      switch (gesture.direction) {
        case 'left': handlers.onSwipeLeft?.(); break
        case 'right': handlers.onSwipeRight?.(); break
        case 'up': handlers.onSwipeUp?.(); break
        case 'down': handlers.onSwipeDown?.(); break
      }
    }
  }, [gesture, handlers])

  return {
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    gesture
  }
} 