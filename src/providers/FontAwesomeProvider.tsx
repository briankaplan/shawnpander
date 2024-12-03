'use client'

import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { ReactNode } from 'react'

config.autoAddCss = false

export function FontAwesomeProvider({ children }: { children: ReactNode }) {
  return <>{children}</>
} 