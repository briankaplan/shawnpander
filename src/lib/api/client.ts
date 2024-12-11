import { ApiResponse, ApiError } from '@/types'

export class ApiClient {
  private static instance: ApiClient
  private baseUrl: string
  private defaultHeaders: HeadersInit = {
    'Content-Type': 'application/json'
  }

  private constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_API_URL || ''
  }

  static getInstance(): ApiClient {
    if (!ApiClient.instance) {
      ApiClient.instance = new ApiClient()
    }
    return ApiClient.instance
  }

  private async handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
    const data = await response.json()

    if (!response.ok) {
      throw new ApiError({
        message: data.message || 'An error occurred',
        code: data.code || 'UNKNOWN_ERROR',
        status: response.status
      })
    }

    return {
      data,
      status: response.status
    }
  }

  async get<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      method: 'GET',
      headers: {
        ...this.defaultHeaders,
        ...options.headers
      }
    })
    return this.handleResponse<T>(response)
  }

  async post<T>(endpoint: string, data: unknown, options: RequestInit = {}): Promise<ApiResponse<T>> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      method: 'POST',
      headers: {
        ...this.defaultHeaders,
        ...options.headers
      },
      body: JSON.stringify(data)
    })
    return this.handleResponse<T>(response)
  }
}

export const api = ApiClient.getInstance() 