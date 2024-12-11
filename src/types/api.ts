export interface ApiResponse<T> {
  data: T
  error?: string
  status: number
}

export interface ApiError {
  message: string
  code: string
  status: number
} 