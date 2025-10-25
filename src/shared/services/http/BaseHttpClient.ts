import { merge } from 'lodash'

import { delay, tryCatchInline } from '@shared/utils'

import { BASE_CONFIG, ERROR_MESSAGES, ERROR_TYPE, HTTP_STATUS } from './constants'

import type { ApiError, ApiResponse, ErrorType, RequestConfig } from './types'

export abstract class BaseHttpClient {
  protected baseURL: string
  protected defaultConfig: RequestConfig

  constructor(baseURL: string, config: RequestConfig = {}) {
    this.baseURL = baseURL.replace(/\/$/, '')
    this.defaultConfig = merge(BASE_CONFIG, config)
  }

  private shouldRetryError(error: ApiError): boolean {
    const { status } = error

    if (!status) return true

    // Don't retry client errors (4xx) except rate limiting (429)
    const isClientError = status >= HTTP_STATUS.BAD_REQUEST && status < HTTP_STATUS.INTERNAL_SERVER_ERROR
    const isRateLimitError = status === HTTP_STATUS.TOO_MANY_REQUESTS

    return !isClientError || isRateLimitError
  }

  private classifyError(error: unknown): ApiError {
    if (error instanceof DOMException && error.name === 'AbortError') {
      return this.createErrorFromType(ERROR_TYPE.TIMEOUT)
    }

    if (error instanceof TypeError && error.message.includes('fetch')) {
      return this.createErrorFromType(ERROR_TYPE.NETWORK_ERROR)
    }

    if ((error as ApiError)?.status) {
      return error as ApiError
    }

    const customMessage = error instanceof Error ? error.message : 'Unknown error'
    return this.createErrorFromType(ERROR_TYPE.UNKNOWN, customMessage)
  }

  private async fetchWithTimeout(url: string, fetchConfig: RequestInit, timeout?: number): Promise<Response> {
    const controller = new AbortController()
    const timeoutId = timeout ? setTimeout(() => controller.abort(), timeout) : null

    try {
      const response = await fetch(url, {
        signal: controller.signal,
        ...fetchConfig,
      })

      return response
    } finally {
      if (timeoutId) clearTimeout(timeoutId)
    }
  }

  protected async makeRequest<T>(endpoint: string, config: RequestConfig = {}): Promise<ApiResponse<T>> {
    const url = new URL(endpoint, this.baseURL).toString()
    const mergedConfig = merge(this.defaultConfig, config)
    const { timeout, retries, retryDelay, enableRetries, ...fetchConfig } = mergedConfig

    let lastError: ApiError = this.createErrorFromType(ERROR_TYPE.UNKNOWN)
    const maxRetries = enableRetries && retries ? retries : 0

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        const response = await this.fetchWithTimeout(url, fetchConfig, timeout)

        if (!response.ok) throw this.createErrorFromStatus(response.status, response)

        const data = await this.parseResponse<T>(response)

        const { status, statusText, headers } = response

        return { data, status, statusText, headers }
      } catch (error) {
        lastError = this.classifyError(error)

        const isTimeoutError = lastError.status === HTTP_STATUS.TIMEOUT
        if (isTimeoutError || !this.shouldRetryError(lastError)) break

        const shouldRetry = attempt < maxRetries
        if (shouldRetry) await delay(retryDelay || BASE_CONFIG.retryDelay!)
      }
    }

    throw lastError
  }

  private async parseResponse<T>(response: Response): Promise<T> {
    const contentType = response.headers.get('content-type')

    if (!contentType?.includes('application/json')) {
      throw this.createErrorFromType(ERROR_TYPE.INVALID_CONTENT_TYPE, response)
    }

    const toTry = async () => response.json() as Promise<T>
    const onError = () => this.createErrorFromType(ERROR_TYPE.PARSE_ERROR, response)

    const [data, error] = await tryCatchInline(toTry, onError)

    if (error) throw error

    return data
  }

  private createApiError(message: string, status: number, statusText: string, response?: Response): ApiError {
    return {
      ...new Error(message),
      status,
      statusText,
      response,
    }
  }

  private createErrorFromType(errorType: ErrorType): ApiError
  private createErrorFromType(errorType: ErrorType, customMessage: string): ApiError
  private createErrorFromType(errorType: ErrorType, response: Response): ApiError
  private createErrorFromType(errorType: ErrorType, customMessage: string, response: Response): ApiError
  private createErrorFromType(
    errorType: ErrorType,
    customMessageOrResponse?: string | Response,
    response?: Response
  ): ApiError {
    let customMessage: string | undefined
    let responseObj: Response | undefined

    if (typeof customMessageOrResponse === 'string') {
      customMessage = customMessageOrResponse
      responseObj = response
    } else if (customMessageOrResponse instanceof Response) {
      customMessage = undefined
      responseObj = customMessageOrResponse
    }

    const { message, status, statusText } = ERROR_MESSAGES[errorType]

    return this.createApiError(customMessage || message, status, statusText, responseObj)
  }

  private createErrorFromStatus(status: number, response: Response): ApiError {
    return this.createApiError(`HTTP ${status}: ${response.statusText}`, status, response.statusText, response)
  }
}
