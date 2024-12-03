import { encrypt, decrypt } from '@/lib/crypto'
import { decodeJwt } from '@/lib/jwt'

export interface TokenInfo {
  accessToken: string
  refreshToken: string
  expiresAt: number
  tokenType: string
  scope: string
}

class TokenService {
  private static readonly TOKEN_KEY = 'spotify_token'
  private static readonly REFRESH_BUFFER = 5 * 60 * 1000 // 5 minutes before expiry
  private static readonly REQUIRED_FIELDS = ['accessToken', 'refreshToken', 'expiresAt', 'tokenType', 'scope']
  private static readonly MAX_REFRESH_ATTEMPTS = 3
  private static readonly REFRESH_RETRY_DELAY = 1000 // 1 second
  private static readonly MAX_RETRY_ATTEMPTS = 3

  private token: TokenInfo | null = null
  private refreshPromise: Promise<TokenInfo> | null = null
  private refreshAttempts = 0
  private lastRefreshTime = 0

  constructor() {
    this.loadToken()
    this.setupStorageListener()
  }

  private validateToken(token: TokenInfo): boolean {
    try {
      // Check for required fields
      for (const field of TokenService.REQUIRED_FIELDS) {
        if (!(field in token)) {
          throw new Error(`Missing required field: ${field}`)
        }
      }

      // Check token expiration
      if (typeof token.expiresAt !== 'number' || token.expiresAt < Date.now()) {
        throw new Error('Token is expired')
      }

      // Check token format
      if (!token.accessToken.includes('.') || !this.isValidJWT(token.accessToken)) {
        throw new Error('Invalid access token format')
      }

      // Check scope format
      if (typeof token.scope !== 'string' || !token.scope.length) {
        throw new Error('Invalid scope format')
      }

      return true
    } catch (error) {
      console.error('Token validation failed:', error)
      return false
    }
  }

  private isValidJWT(token: string): boolean {
    try {
      const decoded = decodeJwt(token)
      return !!decoded && typeof decoded === 'object'
    } catch {
      return false
    }
  }

  private loadToken() {
    if (typeof window === 'undefined') return

    const storedToken = localStorage.getItem(TokenService.TOKEN_KEY)
    if (storedToken) {
      try {
        const decrypted = decrypt(storedToken)
        const parsedToken = JSON.parse(decrypted)
        
        if (this.validateToken(parsedToken)) {
          this.token = parsedToken
        } else {
          throw new Error('Invalid token format')
        }
      } catch (error) {
        console.error('Failed to load token:', error)
        this.clearToken()
      }
    }
  }

  private saveToken(token: TokenInfo) {
    try {
      if (!this.validateToken(token)) {
        throw new Error('Invalid token data')
      }

      this.token = token
      const encrypted = encrypt(JSON.stringify(token))
      localStorage.setItem(TokenService.TOKEN_KEY, encrypted)
    } catch (error) {
      console.error('Failed to save token:', error)
      this.clearToken()
      throw error
    }
  }

  clearToken() {
    this.token = null
    localStorage.removeItem(TokenService.TOKEN_KEY)
  }

  async getValidToken(): Promise<string | null> {
    if (!this.token) return null

    try {
      if (!this.validateToken(this.token)) {
        throw new Error('Invalid token state')
      }

      // Check if token needs refresh
      const now = Date.now()
      if (now >= this.token.expiresAt - TokenService.REFRESH_BUFFER) {
        const newToken = await this.refreshToken()
        return newToken.accessToken
      }

      return this.token.accessToken
    } catch (error) {
      console.error('Failed to get valid token:', error)
      this.clearToken()
      return null
    }
  }

  private async retryWithBackoff<T>(
    operation: () => Promise<T>,
    maxAttempts: number = TokenService.MAX_RETRY_ATTEMPTS,
    baseDelay: number = TokenService.REFRESH_RETRY_DELAY
  ): Promise<T> {
    let lastError: Error | null = null

    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      try {
        return await operation()
      } catch (error) {
        lastError = error instanceof Error ? error : new Error(String(error))
        if (attempt === maxAttempts) break

        // Exponential backoff with jitter
        const delay = baseDelay * Math.pow(2, attempt - 1) * (0.5 + Math.random() * 0.5)
        await new Promise(resolve => setTimeout(resolve, delay))
      }
    }

    throw lastError || new Error('Operation failed after retries')
  }

  async refreshToken(): Promise<TokenInfo> {
    // Rate limiting check
    const now = Date.now()
    const timeSinceLastRefresh = now - this.lastRefreshTime
    if (timeSinceLastRefresh < 1000) {
      throw new Error('Refresh rate limit exceeded')
    }

    if (this.refreshPromise) {
      return this.refreshPromise
    }

    if (!this.token?.refreshToken) {
      throw new Error('No refresh token available')
    }

    if (this.refreshAttempts >= TokenService.MAX_REFRESH_ATTEMPTS) {
      this.clearToken()
      throw new Error('Max refresh attempts exceeded')
    }

    this.refreshAttempts++
    this.lastRefreshTime = now

    this.refreshPromise = this.retryWithBackoff(async () => {
      try {
        const response = await fetch('/api/auth/spotify/refresh', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ refreshToken: this.token!.refreshToken }),
        })

        if (!response.ok) {
          throw new Error('Failed to refresh token')
        }

        const data = await response.json()
        const newToken: TokenInfo = {
          accessToken: data.access_token,
          refreshToken: data.refresh_token || this.token!.refreshToken,
          expiresAt: Date.now() + data.expires_in * 1000,
          tokenType: data.token_type,
          scope: data.scope
        }

        this.saveToken(newToken)
        return newToken
      } finally {
        this.refreshPromise = null
      }
    })

    return this.refreshPromise
  }

  getTokenInfo(): TokenInfo | null {
    return this.token
  }

  isAuthenticated(): boolean {
    return !!this.token?.accessToken
  }

  getTokenDetails(): { expiresIn: number; scopes: string[] } | null {
    if (!this.token || !this.validateToken(this.token)) return null

    return {
      expiresIn: Math.max(0, this.token.expiresAt - Date.now()),
      scopes: this.token.scope.split(' ')
    }
  }

  hasScope(scope: string): boolean {
    return this.token?.scope.split(' ').includes(scope) ?? false
  }

  // Add cross-tab synchronization
  private setupStorageListener() {
    if (typeof window === 'undefined') return

    window.addEventListener('storage', (event) => {
      if (event.key === TokenService.TOKEN_KEY) {
        if (event.newValue === null) {
          this.token = null
        } else {
          try {
            const decrypted = decrypt(event.newValue)
            const parsedToken = JSON.parse(decrypted)
            if (this.validateToken(parsedToken)) {
              this.token = parsedToken
            }
          } catch (error) {
            console.error('Failed to sync token:', error)
          }
        }
      }
    })
  }

  // Add token revocation
  async revokeToken(): Promise<void> {
    if (!this.token?.accessToken) return

    try {
      await fetch('/api/auth/spotify/revoke', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: this.token.accessToken }),
      })
    } catch (error) {
      console.error('Failed to revoke token:', error)
    } finally {
      this.clearToken()
    }
  }

  // Add token health check
  async checkTokenHealth(): Promise<boolean> {
    try {
      const token = await this.getValidToken()
      if (!token) return false

      const response = await fetch('https://api.spotify.com/v1/me', {
        headers: { 'Authorization': `Bearer ${token}` }
      })

      return response.ok
    } catch {
      return false
    }
  }

  // Add token metrics
  getTokenMetrics(): { 
    isValid: boolean
    expiresIn: number
    refreshAttempts: number
    lastRefreshTime: number | null
    scopes: string[]
  } {
    return {
      isValid: this.token ? this.validateToken(this.token) : false,
      expiresIn: this.token ? Math.max(0, this.token.expiresAt - Date.now()) : 0,
      refreshAttempts: this.refreshAttempts,
      lastRefreshTime: this.lastRefreshTime || null,
      scopes: this.token?.scope.split(' ') || []
    }
  }
}

export const tokenService = new TokenService() 