import { useState } from 'react'

import { TextField } from './component'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Shared/Form/TextField',
  component: TextField,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
  },
} satisfies Meta<typeof TextField>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Search',
    placeholder: 'Type to search...',
  },
}

export const WithValue: Story = {
  args: {
    label: 'Email',
    placeholder: 'Enter your email',
    value: 'user@example.com',
  },
}

export const WithError: Story = {
  args: {
    label: 'Username',
    placeholder: 'Enter username',
    error: 'This field is required',
  },
}

export const Disabled: Story = {
  args: {
    label: 'Disabled Field',
    placeholder: 'Cannot edit',
    disabled: true,
    value: 'Disabled value',
  },
}

export const Loading: Story = {
  args: {
    label: 'Loading Field',
    placeholder: 'Loading...',
    loading: true,
  },
}

export const Interactive: Story = {
  render: args => {
    const [value, setValue] = useState('')
    return <TextField {...args} value={value} onChange={e => setValue(e.target.value)} onClear={() => setValue('')} />
  },
  args: {
    label: 'Interactive Field',
    placeholder: 'Type something...',
  },
}
