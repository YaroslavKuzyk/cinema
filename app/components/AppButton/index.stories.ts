import type { Meta, StoryObj } from '@storybook-vue/nuxt'
import AppButton from './index.vue'

const meta: Meta<typeof AppButton> = {
  title: 'Components/AppButton',
  component: AppButton,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof AppButton>

export const Default: Story = {
  render: () => ({
    components: { AppButton },
    template: '<AppButton>Click me</AppButton>',
  }),
}

export const WithLongText: Story = {
  render: () => ({
    components: { AppButton },
    template: '<AppButton>This is a button with longer text</AppButton>',
  }),
}
