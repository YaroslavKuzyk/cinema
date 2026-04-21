import type { Meta, StoryObj } from '@storybook-vue/nuxt'
import { ref } from 'vue'
import AppDatePicker from './index.vue'

const meta: Meta<typeof AppDatePicker> = {
  title: 'Components/AppDatePicker',
  component: AppDatePicker,
  tags: ['autodocs'],
  argTypes: {
    modelValue: {
      control: 'object',
      description: 'Selected date range as array of two Date objects',
    },
    label: {
      control: 'text',
      description: 'Label text above the input',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text when no date is selected',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
  },
  args: {
    modelValue: null,
    label: '',
    placeholder: 'Оберіть період',
    disabled: false,
  },
}

export default meta
type Story = StoryObj<typeof AppDatePicker>

export const Default: Story = {
  render: (args) => ({
    components: { AppDatePicker },
    setup() {
      const value = ref(args.modelValue)
      return { args, value }
    },
    template: '<AppDatePicker v-model="value" :label="args.label" :placeholder="args.placeholder" :disabled="args.disabled" />',
  }),
}

export const WithLabel: Story = {
  render: (args) => ({
    components: { AppDatePicker },
    setup() {
      const value = ref(args.modelValue)
      return { args, value }
    },
    template: '<AppDatePicker v-model="value" :label="args.label" :placeholder="args.placeholder" :disabled="args.disabled" />',
  }),
  args: {
    label: 'Період',
    placeholder: 'Оберіть дати',
  },
}

export const WithPreselectedRange: Story = {
  render: (args) => ({
    components: { AppDatePicker },
    setup() {
      const value = ref(args.modelValue)
      return { args, value }
    },
    template: '<AppDatePicker v-model="value" :label="args.label" :placeholder="args.placeholder" :disabled="args.disabled" />',
  }),
  args: {
    label: 'Період',
    modelValue: [new Date(2026, 0, 1), new Date(2026, 0, 31)],
  },
}

export const Disabled: Story = {
  render: (args) => ({
    components: { AppDatePicker },
    setup() {
      const value = ref(args.modelValue)
      return { args, value }
    },
    template: '<AppDatePicker v-model="value" :label="args.label" :placeholder="args.placeholder" :disabled="args.disabled" />',
  }),
  args: {
    label: 'Період',
    placeholder: 'Недоступно',
    disabled: true,
  },
}
