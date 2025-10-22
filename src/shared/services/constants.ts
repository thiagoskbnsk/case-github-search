import type { RequestConfig } from './types'

export const BASE_CONFIG: RequestConfig = {
  timeout: 10000,
  retries: 3,
  retryDelay: 1000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
}

export const CUSTOM_ERROR_STATUS = {
  TIMEOUT: 408, // Request Timeout (standard HTTP code)
  NETWORK_ERROR: 0, // Common convention for network failures
  ABORT: 499, // Client Closed Request (nginx convention)
  PARSE_ERROR: 422, // Unprocessable Entity
  UNKNOWN: 500, // Internal Server Error
} as const

export const CUSTOM_ERROR_CONFIGS = {
  [CUSTOM_ERROR_STATUS.TIMEOUT]: {
    status: CUSTOM_ERROR_STATUS.TIMEOUT,
    message: 'Request timed out',
    statusText: 'Request Timeout',
  },
  [CUSTOM_ERROR_STATUS.NETWORK_ERROR]: {
    status: CUSTOM_ERROR_STATUS.NETWORK_ERROR,
    message: 'Network connection failed',
    statusText: 'Network Error',
  },
  [CUSTOM_ERROR_STATUS.ABORT]: {
    status: CUSTOM_ERROR_STATUS.ABORT,
    message: 'Request was cancelled',
    statusText: 'Request Cancelled',
  },
  [CUSTOM_ERROR_STATUS.PARSE_ERROR]: {
    status: CUSTOM_ERROR_STATUS.PARSE_ERROR,
    message: 'Failed to parse response',
    statusText: 'Parse Error',
  },
  [CUSTOM_ERROR_STATUS.UNKNOWN]: {
    status: CUSTOM_ERROR_STATUS.UNKNOWN,
    message: 'Unknown error occurred',
    statusText: 'Unknown Error',
  },
} as const
