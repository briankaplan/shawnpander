'use client'

import { useState } from 'react'
import { interpretContentRequest } from '@/lib/ai/contentManager'
import { generateImage } from '@/lib/ai/imageService'
import { uploadImage } from '@/lib/uploadService'
import Image from 'next/image'

export default function AIAdmin() {
  const [prompt, setPrompt] = useState('')
  const [processing, setProcessing] = useState(false)
  const [preview, setPreview] = useState<any>(null)
  const [generatedImage, setGeneratedImage] = useState<string | null>(null)
  const [generating, setGenerating] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setProcessing(true)

    try {
      const update = await interpretContentRequest(prompt)
      setPreview(update)

      // If content needs an image, generate one
      if (update.content.type !== 'custom' && !update.content.image) {
        await handleGenerateImage(update.content.description || update.content.title)
      }
    } catch (error) {
      console.error('Error processing request:', error)
    } finally {
      setProcessing(false)
    }
  }

  const handleGenerateImage = async (description: string) => {
    setGenerating(true)
    try {
      const imageUrl = await generateImage(description)
      if (imageUrl) {
        setGeneratedImage(imageUrl)
        if (preview) {
          setPreview({
            ...preview,
            content: {
              ...preview.content,
              image: imageUrl
            }
          })
        }
      }
    } catch (error) {
      console.error('Error generating image:', error)
    } finally {
      setGenerating(false)
    }
  }

  const handleApply = async () => {
    if (!preview) return
    setProcessing(true)

    try {
      // If we have a generated image, upload it first
      if (generatedImage) {
        const uploadedUrl = await uploadImage(generatedImage, `content/${preview.type}`)
        if (uploadedUrl) {
          preview.content.image = uploadedUrl
        }
      }

      // Apply the changes to the database
      // Update content based on type
      
      // Clear the form
      setPrompt('')
      setPreview(null)
      setGeneratedImage(null)
    } catch (error) {
      console.error('Error applying changes:', error)
    } finally {
      setProcessing(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">AI Content Manager</h1>

      <form onSubmit={handleSubmit} className="mb-8">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            What would you like to update?
          </label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="e.g., Add a new show at Continental Club on December 15th at 9pm"
            className="w-full h-32 px-4 py-2 bg-neutral-800 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-orange-500"
          />
        </div>
        <button
          type="submit"
          disabled={processing}
          className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-50"
        >
          {processing ? 'Processing...' : 'Generate Update'}
        </button>
      </form>

      {preview && (
        <div className="bg-neutral-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Preview Changes</h2>
          
          {/* Content Preview */}
          <div className="mb-6">
            <h3 className="font-medium text-gray-300 mb-2">Content</h3>
            <pre className="bg-black rounded p-4 overflow-auto">
              {JSON.stringify(preview.content, null, 2)}
            </pre>
          </div>

          {/* Image Preview */}
          {(preview.content.image || generatedImage) && (
            <div className="mb-6">
              <h3 className="font-medium text-gray-300 mb-2">Image</h3>
              <div className="relative w-full aspect-video max-w-md">
                <Image
                  src={preview.content.image || generatedImage!}
                  alt="Preview"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              <button
                onClick={() => handleGenerateImage(preview.content.description || preview.content.title)}
                disabled={generating}
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
              >
                {generating ? 'Generating...' : 'Generate New Image'}
              </button>
            </div>
          )}

          {/* Action Buttons */}
          <div className="mt-4 flex gap-4">
            <button
              onClick={handleApply}
              disabled={processing}
              className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50"
            >
              {processing ? 'Applying...' : 'Apply Changes'}
            </button>
            <button
              onClick={() => {
                setPreview(null)
                setGeneratedImage(null)
              }}
              className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  )
} 