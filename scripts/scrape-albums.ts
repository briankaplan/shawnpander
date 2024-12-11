require('dotenv').config()
const path = require('path')
require('tsconfig-paths').register({
  baseUrl: path.join(__dirname, '..'),
  paths: { '@/*': ['src/*'] }
})

import { MetadataService } from '@/services/metadataService'

function validateEnv() {
  const required = [
    'SPOTIFY_CLIENT_ID',
    'SPOTIFY_CLIENT_SECRET',
    'SPOTIFY_ARTIST_ID',
    'NEXT_PUBLIC_SUPABASE_URL',
    'NEXT_PUBLIC_SUPABASE_ANON_KEY'
  ]

  const missing = required.filter(key => !process.env[key])
  
  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`)
  }
}

async function main() {
  try {
    validateEnv()

    console.log('Starting album metadata scrape...')
    const metadataService = new MetadataService()
    await metadataService.scrapeAndStore()
    console.log('Album metadata scrape completed successfully!')
  } catch (error) {
    console.error('Error scraping albums:', error)
    process.exit(1)
  }
}

main() 