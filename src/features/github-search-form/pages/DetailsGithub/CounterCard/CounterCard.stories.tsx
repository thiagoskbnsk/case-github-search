import { CounterCard } from './component'

import type { MappedData } from '../types'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Features/GithubSearchForm/CounterCard',
  component: CounterCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    Story => (
      <div className='w-[300px]'>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof CounterCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    counter: {
      key: 'stars',
      label: 'Stars',
      value: '234.6k',
    } as MappedData,
  },
}
