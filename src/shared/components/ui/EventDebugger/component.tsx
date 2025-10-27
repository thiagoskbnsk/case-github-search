import { clsx } from 'clsx'

import { Button } from '@shared/components'

import { useEventDebugger } from './hooks'

export const EventDebugger = () => {
  const { events, clearEvents, isExpanded, toggleExpanded, scrollRef } = useEventDebugger()

  return (
    <div className='fixed right-4 bottom-4 w-full max-w-60 rounded-lg bg-black/50 px-5 py-3 text-white shadow-lg'>
      <div className={clsx('flex items-center justify-between gap-3', { 'mb-4': isExpanded && events.length })}>
        <button
          onClick={toggleExpanded}
          className='flex cursor-pointer items-center gap-2 transition-colors hover:text-blue-400'
          type='button'
          aria-label={isExpanded ? 'Collapse events' : 'Expand events'}>
          <span
            className='text-xs transition-transform duration-300'
            style={{ transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)' }}>
            ▶
          </span>
          <h3 className='text-sm font-semibold'>Events ({events.length})</h3>
        </button>
        <Button onClick={clearEvents} variant='danger' className='!px-3 !py-1.5 !text-xs'>
          Clear
        </Button>
      </div>

      {isExpanded && (
        <div ref={scrollRef} className='cc-scrollbar max-h-72 space-y-2 overflow-x-hidden overflow-y-auto text-xs'>
          {events.map(event => (
            <div key={event.id} className='animate-slide-in border-l-2 border-blue-400 py-1.5 pl-4 opacity-0'>
              <div className='font-medium text-blue-300'>{event.type}</div>
              <div className='text-gray-400'>{new Date(event.timestamp).toLocaleTimeString()}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
