import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router'

import { useEvents } from '@shared/events'

/**
 * Custom hook to emit PAGE_VIEW event on component mount
 * Automatically extracts path from React Router and title from document.title
 * Note: Use useDocumentMetadata to set the page title before calling this hook
 * @param enabled - Whether to emit the event (default: true)
 */
export const usePageView = (enabled: boolean = true) => {
  const { emit } = useEvents()
  const location = useLocation()
  const previousPathRef = useRef<string | undefined>(undefined)

  useEffect(() => {
    // Only emit if path has changed (prevents duplicate emissions on mount)
    if (enabled && previousPathRef.current !== location.pathname) {
      previousPathRef.current = location.pathname

      emit('PAGE_VIEW', {
        path: location.pathname,
        title: document.title,
      })
    }
  }, [location.pathname, enabled, emit])
}
