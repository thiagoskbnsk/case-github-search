import {Link, useLocation} from 'react-router'

import {DEFAULT_TEXTS} from './placeholders'

type NotFoundLocationProps = {
  title?: string
  description?: string
}

export const NotFound = () => {
  const location = useLocation()
  const {title = DEFAULT_TEXTS.title, description = DEFAULT_TEXTS.description} = location.state as NotFoundLocationProps

  return (
    <div className='text-center'>
      <p className='text-3xl font-semibold text-blue-400'>{DEFAULT_TEXTS.errorCode}</p>
      <h1 className='mt-4 text-5xl font-semibold tracking-tight text-balance text-white'>{title}</h1>
      <p className='text-md/8 mt-6 text-pretty text-gray-400'>{description}</p>

      <div className='mt-10 flex items-center justify-center gap-x-6'>
        <Link to='/' className='flex items-center gap-1 text-sm font-semibold text-white'>
          <span aria-hidden='true'>&larr;</span> {DEFAULT_TEXTS.backHome}
        </Link>
      </div>
    </div>
  )
}
