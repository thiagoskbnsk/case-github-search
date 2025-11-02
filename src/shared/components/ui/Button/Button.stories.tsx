import { Button } from './component'

import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  title: 'Shared/UI/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'danger'],
    },
    disabled: {
      control: 'boolean',
    },
    type: {
      control: 'select',
      options: ['button', 'submit', 'reset'],
    },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    children: 'Primary Button',
    variant: 'primary',
  },
}

export const Danger: Story = {
  args: {
    children: 'Danger Button',
    variant: 'danger',
  },
}

export const Disabled: Story = {
  args: {
    children: 'Disabled Button',
    disabled: true,
  },
}

export const WithOnClick: Story = {
  args: {
    children: 'Click Me',
    onClick: () => alert('Button clicked!'),
  },
}

export const Submit: Story = {
  args: {
    children: 'Submit',
    type: 'submit',
  },
}

export const CustomClassName: Story = {
  args: {
    children: 'Custom Class',
    className: '!bg-blue-500 !text-white',
  },
}
