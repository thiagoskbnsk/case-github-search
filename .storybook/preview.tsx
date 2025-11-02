import type { Preview } from '@storybook/react-vite'
import '../src/style.css' // Adjust path if your Tailwind file is elsewhere

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    Story => {
      document.documentElement.setAttribute('data-theme', 'mindfulness')
      // Optionally clean up on unmount
      return <Story />
    },
  ],
}

export default preview
