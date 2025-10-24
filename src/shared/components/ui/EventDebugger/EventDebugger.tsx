import { useEventStore } from '@shared/events/eventStore'

export const EventDebugger = () => {
  const { events, clearEvents } = useEventStore()

  if (!import.meta.env.DEV) return null

  return (
    <div className='fixed right-4 bottom-4 max-w-sm rounded-lg bg-black/90 p-4 text-white'>
      <div className='mb-2 flex items-center justify-between'>
        <h3 className='font-semibold'>Events ({events.length})</h3>
        <button onClick={clearEvents} className='rounded bg-red-600 px-2 py-1 text-xs' type='button'>
          Clear
        </button>
      </div>

      <div className='max-h-60 space-y-1 overflow-y-auto text-xs'>
        {events.slice(-10).map(event => (
          <div key={event.id} className='border-l-2 border-blue-400 pl-2'>
            <div className='font-medium'>{event.type}</div>
            <div className='text-gray-300'>{new Date(event.timestamp).toLocaleTimeString()}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
