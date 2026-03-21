import type { Preview } from '@storybook-vue/nuxt'
import '../assets/styles/main.scss'

const preview: Preview = {
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: '#0A0A0A' },
        { name: 'light', value: '#FFFFFF' },
      ],
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    () => ({
      template: '<div style="background: #0A0A0A; min-height: 100vh; padding: 20px;"><story /></div>',
    }),
  ],
};

export default preview;