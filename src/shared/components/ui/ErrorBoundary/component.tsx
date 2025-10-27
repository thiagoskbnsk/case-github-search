import { Component, type ErrorInfo, type ReactNode } from 'react'

import { Button } from '@shared/components'
import { isProd } from '@shared/utils'

import { ERROR_BOUNDARY_CONSOLE, ERROR_BOUNDARY_TEXTS } from './placeholders'

import type { ErrorBoundaryProps, ErrorBoundaryState } from './types'

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ errorInfo })

    if (!isProd) {
      console.error(ERROR_BOUNDARY_CONSOLE.errorCaught, error, errorInfo)
    }
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null })
  }

  render(): ReactNode {
    if (this.state.hasError) {
      if (!isProd) {
        return (
          <div className='flex min-h-screen items-center justify-center bg-[var(--color-theme-primary-900)] p-8'>
            <div className='max-w-md rounded-lg bg-black/50 p-8 text-center shadow-lg'>
              <div className='mb-4 text-6xl'>{ERROR_BOUNDARY_TEXTS.emoji}</div>
              <h1 className='mb-2 text-2xl font-bold text-white'>{ERROR_BOUNDARY_TEXTS.title}</h1>
              <p className='mb-6 text-gray-400'>{ERROR_BOUNDARY_TEXTS.message}</p>
              <Button onClick={() => window.location.reload()}>{ERROR_BOUNDARY_TEXTS.reloadButton}</Button>
            </div>
          </div>
        )
      }

      throw this.state.error
    }

    return this.props.children
  }
}
