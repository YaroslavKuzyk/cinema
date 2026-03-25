import type { Preview } from '@storybook-vue/nuxt'
import { setup } from '@storybook/vue3'
import { createVfm, ModalsContainer } from 'vue-final-modal'
import '../assets/styles/main.scss'
import 'vue-final-modal/style.css'

const vfm = createVfm()

setup((app) => {
  app.use(vfm)
  app.component('ModalsContainer', ModalsContainer)
})

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
      template: '<div style="background: #0A0A0A; min-height: 100vh; padding: 20px;"><story /><ModalsContainer /></div>',
    }),
  ],
};

export default preview;
