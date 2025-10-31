import type { ButtonHTMLAttributes } from 'react'

export type ButtonVariant = 'primary' | 'danger'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: () => void
  className?: string
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  variant?: ButtonVariant
}
