'use client'

import Link from 'next/link'

export default function AdminDashboard() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link 
          href="/admin/header"
          className="p-6 bg-neutral-800 rounded-lg hover:bg-neutral-700 transition-colors"
        >
          <h2 className="text-xl font-semibold mb-2">Header Content</h2>
          <p className="text-gray-400">Manage promotional content in the header slider</p>
        </Link>

        <Link 
          href="/admin/shows"
          className="p-6 bg-neutral-800 rounded-lg hover:bg-neutral-700 transition-colors"
        >
          <h2 className="text-xl font-semibold mb-2">Shows</h2>
          <p className="text-gray-400">Manage tour dates and ticket links</p>
        </Link>

        <Link 
          href="/admin/music"
          className="p-6 bg-neutral-800 rounded-lg hover:bg-neutral-700 transition-colors"
        >
          <h2 className="text-xl font-semibold mb-2">Music</h2>
          <p className="text-gray-400">Manage songs, albums, and streaming links</p>
        </Link>
      </div>
    </div>
  )
}