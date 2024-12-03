'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { X, Music, Upload, Save, Trash2 } from 'lucide-react'
import Image from 'next/image'
import { Album, Track } from '@/types/music'
import { supabase } from '@/lib/supabase'

interface AlbumDetailsModalProps {
  album: Album
  onClose: () => void
  onUpdate: (album: Album) => void
}

export function AlbumDetailsModal({ album, onClose, onUpdate }: AlbumDetailsModalProps) {
  const [isEditing, setIsEditing] = useState(false)
  const { register, handleSubmit } = useForm({
    defaultValues: album
  })

  const handleTrackUpload = async (files: FileList) => {
    try {
      const tracks: Track[] = []

      for (const file of files) {
        // Upload to storage
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('tracks')
          .upload(`${album.id}/${file.name}`, file)

        if (uploadError) throw uploadError

        // Create track record
        const { data: track, error: trackError } = await supabase
          .from('tracks')
          .insert([{
            albumId: album.id,
            name: file.name.replace(/\.[^/.]+$/, ""), // Remove extension
            title: file.name.replace(/\.[^/.]+$/, ""),
            position: album.tracks.length + tracks.length + 1,
            audioUrl: uploadData.path,
            artist: album.artist
          }])
          .select()
          .single()

        if (trackError) throw trackError
        tracks.push(track)
      }

      // Update album
      const updatedAlbum = {
        ...album,
        tracks: [...album.tracks, ...tracks]
      }
      onUpdate(updatedAlbum)

    } catch (error) {
      console.error('Failed to upload tracks:', error)
    }
  }

  const onSubmit = async (data: any) => {
    try {
      const { data: updatedAlbum, error } = await supabase
        .from('albums')
        .update({
          title: data.title,
          artist: data.artist,
          releaseDate: data.releaseDate,
          description: data.description,
          linerNotes: data.linerNotes,
          isReleased: data.isReleased
        })
        .eq('id', album.id)
        .select()
        .single()

      if (error) throw error

      onUpdate(updatedAlbum)
      setIsEditing(false)
    } catch (error) {
      console.error('Failed to update album:', error)
    }
  }

  return (
    <div className="bg-zinc-900 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
      <div className="sticky top-0 z-10 flex justify-between items-center p-6 bg-zinc-900 border-b border-zinc-800">
        <h2 className="text-2xl font-bold text-white">
          {isEditing ? 'Edit Album' : album.title}
        </h2>
        <div className="flex gap-4">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="p-2 rounded-lg bg-orange-500 text-white"
          >
            {isEditing ? <Save size={20} /> : <Upload size={20} />}
          </button>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-zinc-800 text-white/70 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>
      </div>

      <div className="p-6">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Album Art */}
          <div>
            <div className="relative aspect-square rounded-lg overflow-hidden mb-4">
              <Image
                src={album.artwork}
                alt={album.title}
                fill
                className="object-cover"
              />
            </div>
            <label className="block w-full px-4 py-3 text-center rounded-lg border-2 border-dashed border-zinc-700 hover:border-orange-500 cursor-pointer transition-colors">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files?.[0]) {
                    // Handle artwork upload
                  }
                }}
              />
              <span className="text-zinc-400">Change Artwork</span>
            </label>
          </div>

          {/* Album Info */}
          {isEditing ? (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Title
                </label>
                <input
                  {...register('title')}
                  className="w-full px-4 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-white"
                />
              </div>
              {/* Add more form fields */}
            </form>
          ) : (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Details</h3>
                <dl className="space-y-2 text-zinc-400">
                  <div>
                    <dt className="text-sm text-zinc-500">Artist</dt>
                    <dd>{album.artist}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-zinc-500">Release Date</dt>
                    <dd>{album.releaseDate}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-zinc-500">Description</dt>
                    <dd>{album.description}</dd>
                  </div>
                </dl>
              </div>

              {/* Tracks */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Tracks</h3>
                <div className="space-y-2">
                  {album.tracks.map((track, index) => (
                    <div
                      key={track.id}
                      className="flex items-center justify-between p-3 rounded-lg bg-zinc-800/50"
                    >
                      <div className="flex items-center gap-4">
                        <span className="text-zinc-500">{index + 1}</span>
                        <div>
                          <p className="text-white font-medium">{track.name}</p>
                          {track.isExplicit && (
                            <span className="text-xs text-zinc-500 px-1 border border-zinc-500 rounded">
                              E
                            </span>
                          )}
                        </div>
                      </div>
                      <button className="text-zinc-500 hover:text-red-500">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Track Upload */}
                <label className="block w-full px-4 py-3 mt-4 text-center rounded-lg border-2 border-dashed border-zinc-700 hover:border-orange-500 cursor-pointer transition-colors">
                  <input
                    type="file"
                    accept="audio/*"
                    multiple
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files?.length) {
                        handleTrackUpload(e.target.files)
                      }
                    }}
                  />
                  <div className="flex items-center justify-center gap-2 text-zinc-400">
                    <Music size={20} />
                    <span>Upload Tracks</span>
                  </div>
                </label>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 