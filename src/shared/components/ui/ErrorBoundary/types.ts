import type { ErrorInfo, ReactNode } from 'react'

export type ErrorBoundaryFallbackProps = {
  error: Error | null
  errorInfo: ErrorInfo | null
  reset: () => void
}

export interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: React.ReactNode | ((props: ErrorBoundaryFallbackProps) => React.ReactNode)
}

export interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
  errorInfo: ErrorInfo | null
}
