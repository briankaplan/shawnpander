'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { supabase } from '@/lib/supabase'

interface StreamingLink {
  id: string
  platform: string
  url: string
  isActive: boolean
}

export default function StreamingManagementPage() {
  const [links, setLinks] = useState<StreamingLink[]>([])
  const { register, handleSubmit, reset } = useForm()

  const onSubmit = async (data: any) => {
    try {
      const { data: newLink, error } = await supabase
        .from('streaming_links')
        .insert([{
          platform: data.platform,
          url: data.url,
          isActive: true
        }])
        .select()

      if (error) throw error

      setLinks([...links, newLink[0]])
      reset()
    } catch (error) {
      console.error('Failed to add streaming link:', error)
    }
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-white">Manage Streaming Platforms</h1>

      {/* Add New Platform */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-white/80 mb-2">
            Platform Name
          </label>
          <input
            {...register('platform')}
            className="w-full px-4 py-2 rounded-lg bg-zinc-800 border border-zinc-700"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white/80 mb-2">
            URL Pattern
          </label>
          <input
            {...register('url')}
            className="w-full px-4 py-2 rounded-lg bg-zinc-800 border border-zinc-700"
            placeholder="e.g., https://music.platform.com/artist/"
          />
        </div>

        <button
          type="submit"
          className="px-6 py-2 bg-orange-500 text-white rounded-lg"
        >
          Add Platform
        </button>
      </form>

      {/* Existing Platforms */}
      <div className="space-y-4">
        {links.map(link => (
          <div
            key={link.id}
            className="flex items-center justify-between p-4 bg-zinc-800 rounded-lg"
          >
            <div>
              <h3 className="font-medium text-white">{link.platform}</h3>
              <p className="text-sm text-zinc-400">{link.url}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => {/* Toggle active state */}}
                className={`px-3 py-1 rounded ${
                  link.isActive ? 'bg-green-500' : 'bg-zinc-600'
                }`}
              >
                {link.isActive ? 'Active' : 'Inactive'}
              </button>
              <button
                onClick={() => {/* Delete link */}}
                className="px-3 py-1 bg-red-500 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 