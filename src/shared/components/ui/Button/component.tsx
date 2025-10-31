import { clsx } from 'clsx'

import type { ButtonProps } from './types'

const variantStyles = {
  primary:
    'bg-[var(--color-theme-primary-400)] hover:bg-[var(--color-theme-primary-500)] focus:outline-[var(--color-theme-primary-600)]',
  danger: 'bg-red-600 hover:bg-red-700 focus:outline-red-800',
}

export const Button = ({
  children,
  onClick,
  className,
  disabled,
  type = 'button',
  variant = 'primary',
  ...rest
}: ButtonProps) => {
  return (
    <button
      {...rest}
      type={type}
      onClick={onClick}
      className={clsx(
        `cursor-pointer rounded-md px-3 py-2 text-sm font-semibold text-white transition-colors focus:relative
        focus:outline-2 focus:-outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60`,
        variantStyles[variant],
        className
      )}
      disabled={disabled}>
      {children}
    </button>
  )
}
