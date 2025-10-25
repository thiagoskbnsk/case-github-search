import { BaseHttpClient } from './BaseHttpClient'

import type { ApiResponse, RequestConfig } from './types'

export class HttpClient extends BaseHttpClient {
  async get<T>(endpoint: string, config?: RequestConfig): Promise<ApiResponse<T>> {
    return this.makeRequest<T>(endpoint, { enableRetries: true, ...config, method: 'GET' })
  }
}
