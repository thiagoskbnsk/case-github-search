import type { ButtonProps } from './types'

export const Button = ({ children, onClick, className, disabled, type = 'button' }: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`cursor-pointer rounded-md bg-purple-900 px-3 py-2 text-sm font-semibold text-white hover:bg-purple-800
        focus:relative ${className} focus:outline-2 focus:-outline-offset-2 focus:outline-purple-500
        disabled:cursor-not-allowed disabled:opacity-60`}
      disabled={disabled}>
      {children}
    </button>
  )
}
