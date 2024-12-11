import type { Metadata } from 'next'
import { MainLayout } from '@/components/layouts/MainLayout'
import { CONFIG } from '@/config'
import './globals.css'

export const metadata: Metadata = {
  title: CONFIG.site.name,
  description: CONFIG.site.description,
  openGraph: {
    title: CONFIG.site.name,
    description: CONFIG.site.description,
    url: CONFIG.site.url,
    siteName: CONFIG.site.name,
    type: 'website'
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  )
}