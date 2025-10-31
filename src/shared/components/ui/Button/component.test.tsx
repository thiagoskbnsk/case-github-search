import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

import { Button } from './component'

import type { ButtonProps } from './types'

const DEFAULT_PROPS: ButtonProps = {
  children: 'Awesome button',
}

const createComponent = (additionalProps: Partial<ButtonProps> = {}) => {
  return render(<Button {...DEFAULT_PROPS} {...additionalProps} />)
}
describe('Button', () => {
  it('renders with children', () => {
    createComponent()
    expect(screen.getByRole('button')).toHaveTextContent(DEFAULT_PROPS.children as string)
  })

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn()
    createComponent({ onClick: handleClick })

    fireEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalled()
  })

  it('is disabled when disabled prop is true', () => {
    createComponent({ disabled: true })
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('applies custom className', () => {
    createComponent({ className: 'custom-class' })
    expect(screen.getByRole('button')).toHaveClass('custom-class')
  })

  it('renders with different variants', () => {
    createComponent({ variant: 'danger' })
    expect(screen.getByRole('button')).toHaveClass('bg-red-600')
  })

  it('sets the correct type', () => {
    createComponent({ type: 'submit' })
    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit')
  })

  it('sets aria-label if provided', () => {
    createComponent({ 'aria-label': 'custom-label' })
    expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'custom-label')
  })

  it('supports tabIndex', () => {
    createComponent({ tabIndex: 2 })
    expect(screen.getByRole('button')).toHaveAttribute('tabindex', '2')
  })
})
