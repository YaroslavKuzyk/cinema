import type { Meta, StoryObj } from '@storybook-vue/nuxt'
import AppChips from './index.vue'

const meta: Meta<typeof AppChips> = {
  title: 'Components/AppChips',
  component: AppChips,
  tags: ['autodocs'],
  argTypes: {
    modelValue: {
      control: 'boolean',
      description: 'Active state of the chip',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state of the chip',
    },
  },
  args: {
    modelValue: false,
    disabled: false,
  },
}

export default meta
type Story = StoryObj<typeof AppChips>

export const Default: Story = {
  render: (args) => ({
    components: { AppChips },
    setup() {
      return { args }
    },
    template: '<AppChips :model-value="args.modelValue" :disabled="args.disabled">Action</AppChips>',
  }),
}
