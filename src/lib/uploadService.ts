import { supabase } from '@/lib/supabase'

export async function uploadImage(imageUrl: string, path: string): Promise<string | null> {
  try {
    // Fetch the image from the DALL-E URL
    const response = await fetch(imageUrl)
    const blob = await response.blob()

    // Upload to Supabase Storage
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.png`
    const filePath = `${path}/${fileName}`

    const { data, error } = await supabase.storage
      .from('images')
      .upload(filePath, blob, {
        contentType: 'image/png',
        cacheControl: '3600',
        upsert: false
      })

    if (error) throw error

    // Get the public URL
    const { data: { publicUrl } } = supabase.storage
      .from('images')
      .getPublicUrl(filePath)

    return publicUrl
  } catch (error) {
    console.error('Error uploading image:', error)
    return null
  }
} 