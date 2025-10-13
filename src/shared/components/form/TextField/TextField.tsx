import { useId } from 'react'
import { clsx } from 'clsx'

type TextFieldProps = {
  leftIcon?: React.ReactNode
  placeholder?: string
  label: string
  onChange: (value: string) => void
  value: string
  disabled?: boolean
  error?: string
  id?: string
  name?: string
  className?: string
  loading?: boolean
}

export const TextField = ({
  leftIcon,
  placeholder,
  label,
  onChange,
  value,
  name,
  disabled,
  error,
  id: providedId,
  className,
  loading,
}: TextFieldProps) => {
  const generatedId = useId()
  const inputId = providedId || generatedId
  const errorId = error ? `${inputId}-error` : undefined

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return

    onChange(e.target.value)
  }

  return (
    <div className={clsx(className, 'w-full')}>
      <div className="flex">
        <div className="-mr-px grid grow grid-cols-1 focus-within:relative">
          <input
            id={inputId}
            name={name || inputId}
            type="text"
            value={value}
            onChange={handleChange}
            aria-label={label}
            aria-disabled={disabled || loading}
            aria-invalid={!!error}
            placeholder={placeholder}
            className={clsx(
              `col-start-1 row-start-1 block w-full rounded-md bg-white/2 px-3
              py-1.5 text-sm/6 text-white outline-1 -outline-offset-1
              outline-gray-600 placeholder:text-gray-500 focus:outline-2
              focus:-outline-offset-2 focus:outline-indigo-500
              aria-disabled:cursor-not-allowed aria-disabled:opacity-60
              aria-invalid:outline-red-500`,
              leftIcon && 'pl-10'
            )}
          />
          {leftIcon && (
            <div
              className={`pointer-events-none col-start-1 row-start-1 ml-3
              size-4 self-center text-gray-500`}
              aria-hidden="true"
            >
              {leftIcon}
            </div>
          )}
        </div>
      </div>

      {error && (
        <p
          id={errorId}
          className="mt-1 text-left text-sm text-red-400"
          role="alert"
          aria-live="polite"
        >
          {error}
        </p>
      )}
    </div>
  )
}
