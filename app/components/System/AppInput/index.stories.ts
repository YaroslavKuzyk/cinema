import type { Meta, StoryObj } from '@storybook-vue/nuxt'
import AppInput from './index.vue'

const meta: Meta<typeof AppInput> = {
  title: 'Components/AppInput',
  component: AppInput,
  tags: ['autodocs'],
  argTypes: {
    modelValue: {
      control: 'text',
      description: 'Input value (v-model)',
    },
    label: {
      control: 'text',
      description: 'Label text for the input',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
    type: {
      control: 'select',
      options: ['text', 'password', 'email', 'number', 'tel', 'url'],
      description: 'Input type',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state of the input',
    },
  },
  args: {
    modelValue: '',
    label: '',
    placeholder: 'Enter text...',
    type: 'text',
    disabled: false,
  },
}

export default meta
type Story = StoryObj<typeof AppInput>

export const Default: Story = {
  args: {
    label: "123"
  },

  render: (args) => ({
    components: { AppInput },
    setup() {
      return { args }
    },
    template: '<AppInput v-model="args.modelValue" :label="args.label" :placeholder="args.placeholder" :type="args.type" :disabled="args.disabled" />',
  })
}
