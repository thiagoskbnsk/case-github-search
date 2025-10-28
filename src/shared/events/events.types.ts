import type { RepositoryUI } from '../../features/github-search-form/api/github'

type BaseEvent = {
  id: string
  type: string
  payload: unknown
  timestamp: number
  metadata?: Record<string, unknown>
}

// Analytics Events
export interface PageViewEvent extends BaseEvent {
  type: 'PAGE_VIEW'
  payload: {
    path: string
    title: string
  }
}

export interface CardClickEvent extends BaseEvent {
  type: 'CARD_CLICK'
  payload: {
    repositoryId: number
    repository: RepositoryUI
  }
}

export interface SearchSubmitEvent extends BaseEvent {
  type: 'SEARCH_SUBMIT'
  payload: {
    query: string
    timestamp: number
  }
}

export interface SearchPaginationEvent extends BaseEvent {
  type: 'SEARCH_PAGINATION'
  payload: {
    query: string
    pageNumber: number
    trigger: 'scroll' | 'button'
  }
}

export interface SearchNoResultsEvent extends BaseEvent {
  type: 'SEARCH_NO_RESULTS'
  payload: {
    query: string
    timestamp: number
  }
}

// Error Monitoring Events
export interface ErrorBoundaryEvent extends BaseEvent {
  type: 'ERROR_BOUNDARY'
  payload: {
    error: string
    errorInfo: string
    componentStack?: string
  }
}

export interface SearchErrorEvent extends BaseEvent {
  type: 'SEARCH_ERROR'
  payload: {
    source: string
    metadata: Record<string, unknown>
    error: string
    statusCode?: number
  }
}

export interface ValidationErrorEvent extends BaseEvent {
  type: 'VALIDATION_ERROR'
  payload: {
    field: string
    error: string
    value: unknown
  }
}

export type AppEvent =
  | PageViewEvent
  | CardClickEvent
  | SearchSubmitEvent
  | SearchPaginationEvent
  | SearchNoResultsEvent
  | ErrorBoundaryEvent
  | SearchErrorEvent
  | ValidationErrorEvent

export type EventPayloadMap = {
  PAGE_VIEW: PageViewEvent['payload']
  CARD_CLICK: CardClickEvent['payload']
  SEARCH_SUBMIT: SearchSubmitEvent['payload']
  SEARCH_PAGINATION: SearchPaginationEvent['payload']
  SEARCH_NO_RESULTS: SearchNoResultsEvent['payload']
  ERROR_BOUNDARY: ErrorBoundaryEvent['payload']
  SEARCH_ERROR: SearchErrorEvent['payload']
  VALIDATION_ERROR: ValidationErrorEvent['payload']
}

export type EventTypeKeys = keyof EventPayloadMap

export type EventListenerConfig<T extends EventTypeKeys = EventTypeKeys> = {
  type: T
  name: string
  handler: (event: Extract<AppEvent, { type: T }>) => void | Promise<void>
}
