import type { Meta, StoryObj } from '@storybook-vue/nuxt'
import AppLoader from './index.vue'

const meta: Meta<typeof AppLoader> = {
  title: 'Components/AppLoader',
  component: AppLoader,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'number', min: 12, max: 64 },
    },
  },
  args: {
    size: 20,
  },
}

export default meta
type Story = StoryObj<typeof AppLoader>

export const Default: Story = {
  render: (args) => ({
    components: { AppLoader },
    setup() {
      return { args }
    },
    template: '<AppLoader v-bind="args" />',
  }),
}

export const Small: Story = {
  args: {
    size: 16,
  },
  render: (args) => ({
    components: { AppLoader },
    setup() {
      return { args }
    },
    template: '<AppLoader v-bind="args" />',
  }),
}

export const Large: Story = {
  args: {
    size: 32,
  },
  render: (args) => ({
    components: { AppLoader },
    setup() {
      return { args }
    },
    template: '<AppLoader v-bind="args" />',
  }),
}
