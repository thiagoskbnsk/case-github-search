import { DEFAULT_TEXTS } from './placeholders'

export const EndOfResults = () => {
  return (
    <div className='flex justify-center py-4'>
      <p className='text-center text-sm text-white/30'>{DEFAULT_TEXTS.message}</p>
    </div>
  )
}
