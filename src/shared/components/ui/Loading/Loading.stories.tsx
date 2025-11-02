import { Loading } from './component'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Shared/UI/Loading',
  component: Loading,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Loading>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
