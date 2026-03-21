import type { Meta, StoryObj } from '@storybook-vue/nuxt'
import AppButton from './index.vue'

const meta: Meta<typeof AppButton> = {
  title: 'Components/AppButton',
  component: AppButton,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'danger'],
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    loading: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
  },
  args: {
    variant: 'primary',
    size: 'medium',
    loading: false,
    disabled: false,
  },
}

export default meta
type Story = StoryObj<typeof AppButton>

export const Default: Story = {
  args: {
    loading: true
  },

  render: (args) => ({
    components: { AppButton },
    setup() {
      return { args }
    },
    template: '<AppButton v-bind="args">Click me</AppButton>',
  })
}
