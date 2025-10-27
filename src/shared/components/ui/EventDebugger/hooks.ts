import { useCallback, useEffect, useRef, useState } from 'react'

import { useEventStore } from '@shared/events/events-store/useEventStore'

export const useEventDebugger = () => {
  const { events, clearEvents } = useEventStore()
  const [isExpanded, setIsExpanded] = useState(true)
  const scrollRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when new events arrive
  useEffect(() => {
    if (scrollRef.current && isExpanded) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [events, isExpanded])

  const toggleExpanded = useCallback(() => setIsExpanded(prev => !prev), [])

  return {
    events,
    clearEvents,
    isExpanded,
    toggleExpanded,
    scrollRef,
  }
}
