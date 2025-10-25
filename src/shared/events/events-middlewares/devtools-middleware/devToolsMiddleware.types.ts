export interface DevToolsOptions {
  enabled?: boolean
  debugMode?: boolean
  performanceTracking?: boolean
  devtoolsExtension?: boolean
}

interface ReduxDevtoolsExtension {
  send: (action: { type: string; payload: unknown; metadata?: Record<string, unknown> }, state: unknown) => void
}

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__?: ReduxDevtoolsExtension
  }
}
