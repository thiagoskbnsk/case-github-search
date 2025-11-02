import { PanelNotification } from './component'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Shared/UI/PanelNotification',
  component: PanelNotification,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['error', 'warning'],
    },
  },
} satisfies Meta<typeof PanelNotification>

export default meta
type Story = StoryObj<typeof meta>

export const Error: Story = {
  args: {
    variant: 'error',
    children: 'An error occurred while processing your request.',
  },
}

export const Warning: Story = {
  args: {
    variant: 'warning',
    children: 'No results found. Please try a different search term.',
  },
}

export const LongMessage: Story = {
  args: {
    variant: 'error',
    children:
      'This is a very long error message that demonstrates how the panel notification component handles lengthy content. It should wrap properly and maintain good readability.',
  },
}
