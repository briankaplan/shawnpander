import { createClient } from '@supabase/supabase-js'
import imageCompression from 'browser-image-compression'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

interface PhotoMetadata {
  category?: string
  description?: string
  tags?: string[]
  people?: string[]
  location?: string
  date_taken?: string
}

export async function compressImage(file: File) {
  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
    fileType: 'image/jpeg'
  }

  try {
    const compressedFile = await imageCompression(file, options)
    
    // Create thumbnail
    const thumbnailOptions = {
      maxSizeMB: 0.1,
      maxWidthOrHeight: 400,
      useWebWorker: true,
      fileType: 'image/jpeg'
    }
    const thumbnailFile = await imageCompression(file, thumbnailOptions)
    
    return {
      main: compressedFile,
      thumbnail: thumbnailFile
    }
  } catch (error) {
    console.error('Error compressing image:', error)
    throw error
  }
}

export async function uploadPhoto(file: File, metadata: PhotoMetadata) {
  try {
    // Compress images
    const { main: compressedFile, thumbnail } = await compressImage(file)
    
    // Get image dimensions
    const img = new Image()
    const mainUrl = URL.createObjectURL(compressedFile)
    await new Promise((resolve) => {
      img.onload = resolve
      img.src = mainUrl
    })
    
    // Upload main image
    const mainPath = `photos/${Date.now()}-${file.name}`
    const { data: mainUpload, error: mainError } = await supabase.storage
      .from('gallery')
      .upload(mainPath, compressedFile)
    
    if (mainError) throw mainError

    // Upload thumbnail
    const thumbnailPath = `thumbnails/${Date.now()}-${file.name}`
    const { data: thumbUpload, error: thumbError } = await supabase.storage
      .from('gallery')
      .upload(thumbnailPath, thumbnail)
    
    if (thumbError) throw thumbError

    // Get public URLs
    const { data: mainUrl } = supabase.storage
      .from('gallery')
      .getPublicUrl(mainPath)
    
    const { data: thumbnailUrl } = supabase.storage
      .from('gallery')
      .getPublicUrl(thumbnailPath)

    // Store in database
    const { data: photoData, error: dbError } = await supabase
      .from('photos')
      .insert([{
        url: mainUrl.publicUrl,
        thumbnail_url: thumbnailUrl.publicUrl,
        original_filename: file.name,
        size_in_bytes: compressedFile.size,
        width: img.width,
        height: img.height,
        ...metadata
      }])
      .select()
      .single()

    if (dbError) throw dbError

    return photoData
  } catch (error) {
    console.error('Error uploading photo:', error)
    throw error
  }
}

export async function getPhotos(options?: {
  category?: string
  tags?: string[]
  limit?: number
  offset?: number
}) {
  let query = supabase
    .from('photos')
    .select('*')
    .order('created_at', { ascending: false })

  if (options?.category) {
    query = query.eq('category', options.category)
  }

  if (options?.tags && options.tags.length > 0) {
    query = query.contains('tags', options.tags)
  }

  if (options?.limit) {
    query = query.limit(options.limit)
  }

  if (options?.offset) {
    query = query.range(options.offset, options.offset + (options.limit || 10) - 1)
  }

  const { data, error } = await query

  if (error) throw error
  return data
}

export async function deletePhoto(id: string) {
  const { data: photo, error: fetchError } = await supabase
    .from('photos')
    .select('url, thumbnail_url')
    .eq('id', id)
    .single()

  if (fetchError) throw fetchError

  // Delete from storage
  const mainPath = photo.url.split('/').pop()
  const thumbnailPath = photo.thumbnail_url.split('/').pop()

  await Promise.all([
    supabase.storage.from('gallery').remove([`photos/${mainPath}`]),
    supabase.storage.from('gallery').remove([`thumbnails/${thumbnailPath}`])
  ])

  // Delete from database
  const { error: deleteError } = await supabase
    .from('photos')
    .delete()
    .eq('id', id)

  if (deleteError) throw deleteError
} 