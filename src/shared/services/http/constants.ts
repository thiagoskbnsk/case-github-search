import type { RequestConfig } from './types'

export const BASE_CONFIG: RequestConfig = {
  timeout: 10000,
  retries: 3,
  retryDelay: 1000,
  enableRetries: false,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
}

export const HTTP_STATUS = {
  // Standard HTTP Status Codes
  BAD_REQUEST: 400,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,

  // Custom Error Status Codes
  NETWORK_ERROR: 0, // Common convention for network failures
  TIMEOUT: 408, // Request Timeout (standard HTTP code)
  PARSE_ERROR: 422, // Unprocessable Entity
  INVALID_CONTENT_TYPE: 415, // Unsupported Content Type
  ABORT: 499, // Client Closed Request (nginx convention)
} as const

export const ERROR_TYPE = {
  TIMEOUT: 'TIMEOUT',
  NETWORK_ERROR: 'NETWORK_ERROR',
  ABORT: 'ABORT',
  PARSE_ERROR: 'PARSE_ERROR',
  INVALID_CONTENT_TYPE: 'INVALID_CONTENT_TYPE',
  UNKNOWN: 'UNKNOWN',
} as const

export const ERROR_MESSAGES = {
  [ERROR_TYPE.TIMEOUT]: {
    status: HTTP_STATUS.TIMEOUT,
    message: 'Request timed out',
    statusText: 'Request Timeout',
  },
  [ERROR_TYPE.NETWORK_ERROR]: {
    status: HTTP_STATUS.NETWORK_ERROR,
    message: 'Network connection failed',
    statusText: 'Network Error',
  },
  [ERROR_TYPE.ABORT]: {
    status: HTTP_STATUS.ABORT,
    message: 'Request was cancelled',
    statusText: 'Request Cancelled',
  },
  [ERROR_TYPE.PARSE_ERROR]: {
    status: HTTP_STATUS.PARSE_ERROR,
    message: 'Failed to parse response',
    statusText: 'Parse Error',
  },
  [ERROR_TYPE.INVALID_CONTENT_TYPE]: {
    status: HTTP_STATUS.INVALID_CONTENT_TYPE,
    message: 'Unsupported response format',
    statusText: 'Unsupported Media Type',
  },
  [ERROR_TYPE.UNKNOWN]: {
    status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
    message: 'Unknown error occurred',
    statusText: 'Unknown Error',
  },
} as const
