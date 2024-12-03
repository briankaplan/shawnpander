import { Metadata } from 'next'
import { AdminProvider } from '@/providers/AdminProvider'
import { AdminNav } from '@/components/admin/AdminNav'

export const metadata: Metadata = {
  title: 'Shawn Pander Admin',
  description: 'Site administration for Shawn Pander',
  manifest: '/admin-manifest.json',
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full bg-zinc-900">
      <body className="h-full">
        <AdminProvider>
          <div className="min-h-screen">
            <AdminNav />
            <main className="py-10">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {children}
              </div>
            </main>
          </div>
        </AdminProvider>
      </body>
    </html>
  )
} 