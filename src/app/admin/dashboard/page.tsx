'use client'

import { withAuth } from '@/hooks/useAuth'

function DashboardPage() {
  return (
    <div className="min-h-screen bg-zinc-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Content Management Cards */}
        <div className="bg-zinc-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Shows</h2>
          {/* Add show management UI */}
        </div>

        <div className="bg-zinc-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Music</h2>
          {/* Add music management UI */}
        </div>

        <div className="bg-zinc-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Press</h2>
          {/* Add press management UI */}
        </div>
      </div>
    </div>
  )
}

export default withAuth(DashboardPage) 