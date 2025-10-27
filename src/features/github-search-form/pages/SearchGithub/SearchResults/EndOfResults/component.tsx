import { DEFAULT_TEXTS } from './placeholders'

export const EndOfResults = () => {
  return (
    <div className='flex justify-center py-8'>
      <p className='text-center text-white'>{DEFAULT_TEXTS.message}</p>
    </div>
  )
}
