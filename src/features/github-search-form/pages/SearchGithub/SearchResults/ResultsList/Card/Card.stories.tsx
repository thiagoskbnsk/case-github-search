import { Card } from './component'

import type { RepositoryUI } from '@features/github-search-form/api/github/repositories'
import type { Meta, StoryObj } from '@storybook/react-vite'

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

const meta = {
  title: 'Features/GithubSearchForm/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    onClick: { action: 'clicked' },
  },
  decorators: [
    Story => (
      <div className='w-[600px]'>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    repository: mockRepository,
    onClick: () => {},
  },
}
