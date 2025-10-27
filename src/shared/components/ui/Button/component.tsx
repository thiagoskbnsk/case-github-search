import type { ButtonProps } from './types'

export const Button = ({ children, onClick, className, disabled, type = 'button' }: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`cursor-pointer rounded-md px-3 py-2 text-sm font-semibold text-white focus:relative ${className}
        bg-[var(--color-theme-primary-400)] transition-colors hover:bg-[var(--color-theme-primary-500)] focus:outline-2
        focus:-outline-offset-2 focus:outline-[var(--color-theme-primary-600)] disabled:cursor-not-allowed
        disabled:opacity-60`}
      disabled={disabled}>
      {children}
    </button>
  )
}
