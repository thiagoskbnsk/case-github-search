export interface RequestConfig extends RequestInit {
  timeout?: number
  retries?: number
  retryDelay?: number
}

export interface ApiResponse<T> {
  data: T
  status: number
  statusText: string
  headers: Headers
}

export interface ApiError extends Error {
  status?: number
  statusText?: string
  response?: Response
}
