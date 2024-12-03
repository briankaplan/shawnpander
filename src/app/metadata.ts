import { Metadata } from 'next'
import { CONFIG } from '@/config'

export const metadata: Metadata = {
  title: 'Shawn Pander',
  description: 'Official website of Shawn Pander',
  themeColor: '#000000',
  manifest: CONFIG.IS_PROD ? '/manifest.json' : '/admin-manifest.json',
}