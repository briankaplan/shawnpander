import { ApiResponse, ApiError } from '@/types'

class ApiClient {
  private static instance: ApiClient
  private baseUrl: string

  private constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_API_URL || ''
  }

  static getInstance(): ApiClient {
    if (!ApiClient.instance) {
      ApiClient.instance = new ApiClient()
    }
    return ApiClient.instance
  }

  async fetch<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      })

      const data = await response.json()

      if (!response.ok) {
        throw {
          message: data.message || 'An error occurred',
          code: data.code || 'UNKNOWN_ERROR',
          status: response.status,
        } as ApiError
      }

      return {
        data,
        status: response.status,
      }
    } catch (error) {
      console.error('API Error:', error)
      throw error
    }
  }
}

export const api = ApiClient.getInstance() 