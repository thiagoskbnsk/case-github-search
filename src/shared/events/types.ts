type BaseEvent = {
  id: string
  type: string
  payload: unknown
  timestamp: number
  metadata?: Record<string, unknown>
}

export interface SearchInitiatedEvent extends BaseEvent {
  type: 'SEARCH_INITIATED'
  payload: {
    query: string
    filters?: Record<string, unknown>
  }
}

export interface SearchCompletedEvent extends BaseEvent {
  type: 'SEARCH_COMPLETED'
  payload: {
    query: string
    resultCount: number
    duration: number
  }
}

export interface RepositorySelectedEvent extends BaseEvent {
  type: 'REPOSITORY_SELECTED'
  payload: {
    repositoryId: number
    repositoryName: string
    source: 'search_results' | 'details'
  }
}

export type AppEvent = SearchInitiatedEvent | SearchCompletedEvent | RepositorySelectedEvent

// Type mapping for better inference
export type EventPayloadMap = {
  SEARCH_INITIATED: SearchInitiatedEvent['payload']
  SEARCH_COMPLETED: SearchCompletedEvent['payload']
  REPOSITORY_SELECTED: RepositorySelectedEvent['payload']
}

export type EventTypeKeys = keyof EventPayloadMap

export type EventStore = {
  events: AppEvent[]
  listeners: Map<string, Array<(event: AppEvent) => void>>

  emit: <T extends EventTypeKeys>(type: T, payload: EventPayloadMap[T], metadata?: Record<string, unknown>) => void
  subscribe: (eventType: string, callback: (event: AppEvent) => void) => () => void
  clearEvents: () => void
  getEventsByType: (eventType: string) => AppEvent[]
}
