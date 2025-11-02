import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

import { Card } from './component'

import type { CardProps } from './types'
import type { RepositoryUI } from '@features/github-search-form/api/github/repositories'

const mockRepository: RepositoryUI = {
  id: 1,
  name: 'react',
  description: 'The library for web and native user interfaces',
  stars: 234567,
  language: 'JavaScript',
  url: 'https://github.com/facebook/react',
  owner: {
    name: 'facebook',
    avatar: 'https://avatars.githubusercontent.com/u/69631?v=4',
  },
  forksCount: 5234,
  openIssuesCount: 867,
  formattedForksCount: '5.2k',
  formattedOpenIssuesCount: '867',
  displayLanguage: 'JavaScript',
  displayDescription: 'The library for web and native user interfaces',
  formattedLanguage: 'JavaScript',
  formattedStars: '234.6k',
  hasDescription: true,
  hasLanguage: true,
}

const DEFAULT_PROPS: CardProps = {
  repository: mockRepository,
  onClick: vi.fn(),
}

const createComponent = (additionalProps: Partial<CardProps> = {}) => {
  return render(<Card {...DEFAULT_PROPS} {...additionalProps} />)
}

describe('Card', () => {
  it('renders repository name', () => {
    createComponent()
    expect(screen.getByText('react')).toBeInTheDocument()
  })

  it('renders owner name', () => {
    createComponent()
    expect(screen.getByText('facebook')).toBeInTheDocument()
  })

  it('renders formatted stars count', () => {
    createComponent()
    expect(screen.getByText('234.6k')).toBeInTheDocument()
  })

  it('renders owner avatar', () => {
    createComponent()
    const avatar = screen.getByAltText('facebook avatar')
    expect(avatar).toBeInTheDocument()
    expect(avatar).toHaveAttribute('src', mockRepository.owner.avatar)
  })

  it('renders language badge when has language', () => {
    createComponent()
    expect(screen.getByText('JavaScript')).toBeInTheDocument()
  })

  it('renders description when has description', () => {
    createComponent()
    expect(screen.getByText('The library for web and native user interfaces')).toBeInTheDocument()
  })

  it('calls onClick when card is clicked', () => {
    const handleClick = vi.fn()
    createComponent({ onClick: handleClick })

    const card = screen.getByTestId('repository-card')
    fireEvent.click(card)

    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('renders GitHub link with correct URL', () => {
    createComponent()
    const link = screen.getByRole('link', { name: /open.*repository on github/i })
    expect(link).toHaveAttribute('href', 'https://github.com/facebook/react')
    expect(link).toHaveAttribute('target', '_blank')
  })

  it('renders with custom repository data', () => {
    const customRepo: RepositoryUI = {
      ...mockRepository,
      name: 'vue',
      owner: { name: 'vuejs', avatar: 'https://avatars.githubusercontent.com/u/6128107?v=4' },
      formattedStars: '45.2k',
    }
    createComponent({ repository: customRepo })

    expect(screen.getByText('vue')).toBeInTheDocument()
    expect(screen.getByText('vuejs')).toBeInTheDocument()
    expect(screen.getByText('45.2k')).toBeInTheDocument()
  })

  it('renders without description when hasDescription is false', () => {
    const repoWithoutDesc: RepositoryUI = {
      ...mockRepository,
      description: null,
      displayDescription: '',
      hasDescription: false,
    }
    createComponent({ repository: repoWithoutDesc })

    expect(screen.queryByText('The library for web and native user interfaces')).not.toBeInTheDocument()
  })
})
