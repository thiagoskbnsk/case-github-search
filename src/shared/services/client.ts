import { merge } from 'lodash'

import { delay } from '../utils'
import { BASE_CONFIG, CUSTOM_ERROR_CONFIGS, CUSTOM_ERROR_STATUS } from './constants'

import type { ApiError, ApiResponse, RequestConfig } from './types'

export class HttpClient {
  private baseURL: string
  private defaultConfig: RequestConfig

  constructor(baseURL: string, config: RequestConfig = {}) {
    this.baseURL = baseURL.replace(/\/$/, '')
    this.defaultConfig = merge(BASE_CONFIG, config)
  }

  private async makeRequest<T>(
    endpoint: string,
    config: RequestConfig = {},
    withRetries: boolean = true
  ): Promise<ApiResponse<T>> {
    const url = new URL(endpoint, this.baseURL).toString()
    const { timeout, retries, retryDelay, ...fetchConfig } = merge(this.defaultConfig, config)

    let lastError: ApiError = this.defineError(CUSTOM_ERROR_STATUS.UNKNOWN)

    const numberOfRetries = withRetries && retries ? retries : 0

    for (let attempt = 0; attempt <= numberOfRetries; attempt++) {
      const controller = new AbortController()
      const timeoutId = timeout ? setTimeout(() => controller.abort(), timeout) : null

      try {
        const response = await fetch(url, {
          signal: controller.signal,
          ...fetchConfig,
        })

        if (timeoutId) clearTimeout(timeoutId)

        if (!response.ok) {
          const error: ApiError = this.defineError(response.status, undefined, response)

          if (response.status >= 400 && response.status < 500 && response.status !== 429) {
            throw error
          }

          throw error
        }

        const data = await this.parseResponse<T>(response)

        return {
          data,
          status: response.status,
          statusText: response.statusText,
          headers: response.headers,
        }
      } catch (error) {
        if (timeoutId) clearTimeout(timeoutId)

        // Clean error handling with lookup
        if (error instanceof DOMException && error.name === 'AbortError') {
          lastError = this.defineError(CUSTOM_ERROR_STATUS.TIMEOUT)
          break
        }

        if (error instanceof TypeError && error.message.includes('fetch')) {
          lastError = this.defineError(CUSTOM_ERROR_STATUS.NETWORK_ERROR)
        } else if ((error as ApiError).status) {
          lastError = error as ApiError
        } else {
          const customMessage = error instanceof Error ? error.message : 'Unknown error'
          lastError = this.defineError(CUSTOM_ERROR_STATUS.UNKNOWN, customMessage)
        }

        if (lastError.status && lastError.status >= 400 && lastError.status < 500 && lastError.status !== 429) {
          break
        }

        if (attempt < numberOfRetries) {
          await delay(retryDelay || BASE_CONFIG.retryDelay!)
        }
      }
    }

    throw lastError
  }

  private async parseResponse<T>(response: Response): Promise<T> {
    const contentType = response.headers.get('content-type')

    if (contentType?.includes('application/json')) {
      try {
        return response.json()
      } catch (error) {
        throw this.defineError(CUSTOM_ERROR_STATUS.PARSE_ERROR, 'Failed to parse JSON response', response)
      }
    }

    throw this.defineError(CUSTOM_ERROR_STATUS.PARSE_ERROR, 'Unsupported response format', response)
  }

  private defineError(status: number, customMessage?: string, response?: Response): ApiError {
    const errorConfig = CUSTOM_ERROR_CONFIGS[status as keyof typeof CUSTOM_ERROR_CONFIGS]

    if (!errorConfig) {
      if (response) {
        return {
          ...new Error(customMessage || `HTTP ${response.status}: ${response.statusText}`),
          status: response.status,
          statusText: response.statusText,
          response,
        }
      }

      throw new Error(`response not provided for unknown error status: ${status}`)
    }

    return {
      ...new Error(customMessage || errorConfig.message),
      status: errorConfig.status,
      statusText: errorConfig.statusText,
      response,
    }
  }

  async get<T>(endpoint: string, config?: RequestConfig): Promise<ApiResponse<T>> {
    return this.makeRequest<T>(endpoint, { ...config, method: 'GET' }, true)
  }
}
