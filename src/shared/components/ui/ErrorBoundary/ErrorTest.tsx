import { useState } from 'react'

import { Button } from '@shared/components'

const ErrorTest = () => {
  const [shouldThrow, setShouldThrow] = useState(false)

  if (shouldThrow) {
    throw new Error('This is a test error to simulate ErrorBoundary!')
  }

  return (
    <div className='fixed bottom-4 left-4 rounded-lg bg-black/40 p-4 text-white'>
      <Button onClick={() => setShouldThrow(true)} variant='danger' className='!px-3 !py-1.5 !text-xs'>
        Trigger Boundary Error
      </Button>
    </div>
  )
}

export default ErrorTest
