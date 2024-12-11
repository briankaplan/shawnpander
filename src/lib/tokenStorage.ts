import { encrypt, decrypt } from './crypto'
import { cookies } from 'next/headers'

const SPOTIFY_TOKEN_KEY = 'sp_token'
const TOKEN_MAX_AGE = 60 * 60 * 24 * 7 // 1 week

interface TokenData {
  accessToken: string
  refreshToken: string
  expiresAt: number
}

export class TokenStorage {
  static async saveToken(data: TokenData): Promise<void> {
    const encrypted = await encrypt(JSON.stringify(data))
    
    cookies().set(SPOTIFY_TOKEN_KEY, encrypted, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: TOKEN_MAX_AGE,
      path: '/'
    })
  }

  static async getToken(): Promise<TokenData | null> {
    const encrypted = cookies().get(SPOTIFY_TOKEN_KEY)?.value
    
    if (!encrypted) return null

    try {
      const decrypted = await decrypt(encrypted)
      return JSON.parse(decrypted)
    } catch {
      return null
    }
  }

  static deleteToken(): void {
    cookies().delete(SPOTIFY_TOKEN_KEY)
  }
} 