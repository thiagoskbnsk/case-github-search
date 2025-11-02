import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

import { CounterCard } from './component'

import type { CounterCardProps } from './types'
import type { MappedData } from '../types'

const DEFAULT_PROPS: CounterCardProps = {
  counter: {
    key: 'stars',
    label: 'Stars',
    value: '234.6k',
  } as MappedData,
}

const createComponent = (additionalProps: Partial<CounterCardProps> = {}) => {
  return render(<CounterCard {...DEFAULT_PROPS} {...additionalProps} />)
}

describe('CounterCard', () => {
  it('renders counter label', () => {
    createComponent()
    expect(screen.getByText('Stars')).toBeInTheDocument()
  })

  it('renders counter value', () => {
    createComponent()
    expect(screen.getByText('234.6k')).toBeInTheDocument()
  })

  it('renders with forks counter', () => {
    createComponent({
      counter: {
        key: 'forks',
        label: 'Forks',
        value: '5.2k',
      },
    })

    expect(screen.getByText('Forks')).toBeInTheDocument()
    expect(screen.getByText('5.2k')).toBeInTheDocument()
  })

  it('renders with open issues counter', () => {
    createComponent({
      counter: {
        key: 'openIssues',
        label: 'Open Issues',
        value: '867',
      },
    })

    expect(screen.getByText('Open Issues')).toBeInTheDocument()
    expect(screen.getByText('867')).toBeInTheDocument()
  })

  it('renders icon for counter type', () => {
    const { container } = createComponent()
    const icon = container.querySelector('svg')
    expect(icon).toBeInTheDocument()
  })
})
