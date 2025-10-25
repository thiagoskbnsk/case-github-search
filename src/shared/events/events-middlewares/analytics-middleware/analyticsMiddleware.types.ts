export interface AnalyticsOptions {
  enabled?: boolean
  apiKey?: string
}

export interface AnalyticsTracker {
  track: (eventType: string, properties: Record<string, unknown>) => void
  page: (pageName: string) => void
}
