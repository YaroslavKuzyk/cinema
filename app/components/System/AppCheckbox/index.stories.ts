import type { Meta, StoryObj } from '@storybook-vue/nuxt'
import AppCheckbox from './index.vue'

const meta: Meta<typeof AppCheckbox> = {
  title: 'Components/AppCheckbox',
  component: AppCheckbox,
  tags: ['autodocs'],
  argTypes: {
    modelValue: {
      control: 'boolean',
      description: 'Checked state of the checkbox',
    },
    label: {
      control: 'text',
      description: 'Label text for the checkbox',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state of the checkbox',
    },
  },
  args: {
    modelValue: false,
    label: '',
    disabled: false,
  },
}

export default meta
type Story = StoryObj<typeof AppCheckbox>

export const Default: Story = {
  render: (args) => ({
    components: { AppCheckbox },
    setup() {
      return { args }
    },
    template: '<AppCheckbox :model-value="args.modelValue" :label="args.label" :disabled="args.disabled" />',
  }),
}
