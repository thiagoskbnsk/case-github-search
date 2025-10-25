import type { ERROR_TYPE } from './BaseHttpClient.constants'

export interface RequestConfig extends RequestInit {
  timeout?: number
  retries?: number
  retryDelay?: number
  enableRetries?: boolean
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

export type ErrorType = (typeof ERROR_TYPE)[keyof typeof ERROR_TYPE]
