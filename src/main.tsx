import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { AppRouter } from './app/AppRouter'
import { ErrorBoundary } from './shared/components'

import './style.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <AppRouter />
    </ErrorBoundary>
  </StrictMode>
)
