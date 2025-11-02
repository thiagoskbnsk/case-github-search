import { LanguageBadge } from './component'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Features/GitHub Search/LanguageBadge',
  component: LanguageBadge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    hasLanguage: { control: 'boolean' },
  },
} satisfies Meta<typeof LanguageBadge>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    language: 'TypeScript',
    hasLanguage: true,
  },
}

export const NoLanguage: Story = {
  args: {
    language: 'Unknown',
    hasLanguage: false,
  },
}
