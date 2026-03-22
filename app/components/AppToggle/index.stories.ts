import type { Meta, StoryObj } from '@storybook-vue/nuxt'
import AppToggle from './index.vue'

const meta: Meta<typeof AppToggle> = {
  title: 'Components/AppToggle',
  component: AppToggle,
  tags: ['autodocs'],
  argTypes: {
    modelValue: {
      control: 'boolean',
      description: 'Active state of the toggle',
    },
    label: {
      control: 'text',
      description: 'Label text for the toggle',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state of the toggle',
    },
  },
  args: {
    modelValue: false,
    label: 'OFF',
    disabled: false,
  },
}

export default meta
type Story = StoryObj<typeof AppToggle>

export const Default: Story = {
  render: (args) => ({
    components: { AppToggle },
    setup() {
      return { args }
    },
    template: '<AppToggle :model-value="args.modelValue" :label="args.label" :disabled="args.disabled" />',
  }),
}
