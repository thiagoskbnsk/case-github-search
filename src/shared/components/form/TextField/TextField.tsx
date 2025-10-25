import { forwardRef, useId } from 'react'
import { clsx } from 'clsx'

import type { TextFieldProps } from './TextField.types'

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      leftIcon,
      placeholder,
      label,
      onChange,
      name,
      disabled,
      error,
      id: providedId,
      className,
      loading,
    }: TextFieldProps,
    ref
  ) => {
    const generatedId = useId()
    const inputId = providedId || generatedId
    const errorId = error ? `${inputId}-error` : undefined

    return (
      <div className={clsx(className, 'w-full')}>
        <div className='flex'>
          <div className='-mr-px grid grow grid-cols-1 focus-within:relative'>
            <input
              ref={ref}
              id={inputId}
              name={name || inputId}
              type='text'
              onChange={onChange}
              aria-label={label}
              disabled={disabled || loading}
              aria-invalid={!!error}
              placeholder={placeholder}
              className={clsx(
                'col-start-1 row-start-1 block w-full rounded-md bg-white/2 px-3 py-1.5 text-sm/6 text-white',
                'outline-1 -outline-offset-1 outline-gray-500',
                'focus:outline-2 focus:-outline-offset-2 focus:outline-purple-500',
                'disabled:cursor-not-allowed disabled:opacity-60',
                'placeholder:text-gray-500 aria-invalid:outline-red-500',
                leftIcon && 'pl-10'
              )}
            />
            {leftIcon && (
              <div
                className={'pointer-events-none col-start-1 row-start-1 ml-3 size-4 self-center text-gray-500'}
                aria-hidden='true'>
                {leftIcon}
              </div>
            )}
          </div>
        </div>

        <p id={errorId} className='mt-1 h-4.5 text-left text-xs text-red-500' role='alert' aria-live='polite'>
          {error}
        </p>
      </div>
    )
  }
)
