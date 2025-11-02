import { useState } from 'react'

import { Select } from './component'

import type { Option } from './types'
import type { Meta, StoryObj } from '@storybook/react-vite'

const sampleOptions: Option[] = [
  { id: '1', label: 'Best Match', value: 'best-match' },
  { id: '2', label: 'Most Stars', value: 'stars' },
  { id: '3', label: 'Most Forks', value: 'forks' },
  { id: '4', label: 'Recently Updated', value: 'updated' },
]

const meta = {
  title: 'Shared/Form/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => {
    const [selected, setSelected] = useState<Option>(sampleOptions[0])
    return <Select options={sampleOptions} value={selected} onChange={setSelected} />
  },
}

export const WithPlaceholder: Story = {
  render: () => {
    const [selected, setSelected] = useState<Option>(sampleOptions[0])
    return <Select options={sampleOptions} value={selected} onChange={setSelected} placeholder='Sort by' />
  },
}

export const LongOptions: Story = {
  render: () => {
    const longOptions: Option[] = [
      { id: '1', label: 'This is a very long option label to test wrapping', value: 'long-1' },
      { id: '2', label: 'Another extremely long label that should wrap properly', value: 'long-2' },
      { id: '3', label: 'Short', value: 'short' },
    ]
    const [selected, setSelected] = useState<Option>(longOptions[0])
    return <Select options={longOptions} value={selected} onChange={setSelected} />
  },
}
