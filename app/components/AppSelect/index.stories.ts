import type { Meta, StoryObj } from '@storybook-vue/nuxt'
import { ref } from 'vue'
import AppSelect from './index.vue'

const sampleOptions = [
  { label: 'Option 1', value: 'option1' },
  { label: 'Option 2', value: 'option2' },
  { label: 'Option 3', value: 'option3' },
  { label: 'Option 4', value: 'option4' },
]

const meta: Meta<typeof AppSelect> = {
  title: 'Components/AppSelect',
  component: AppSelect,
  tags: ['autodocs'],
  argTypes: {
    modelValue: {
      control: 'text',
      description: 'Selected value (single or array for multiple)',
    },
    options: {
      control: 'object',
      description: 'Array of options (primitives or objects)',
    },
    label: {
      control: 'text',
      description: 'Label text for the select',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
    multiple: {
      control: 'boolean',
      description: 'Enable multiple selection',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
    itemTitle: {
      control: 'text',
      description: 'Property name for option label',
    },
    itemValue: {
      control: 'text',
      description: 'Property name for option value',
    },
    fullObject: {
      control: 'boolean',
      description: 'Return full object instead of value',
    },
  },
  args: {
    modelValue: '',
    options: sampleOptions,
    label: '',
    placeholder: 'Select...',
    multiple: false,
    disabled: false,
    itemTitle: 'label',
    itemValue: 'value',
    fullObject: false,
  },
}

export default meta
type Story = StoryObj<typeof AppSelect>

export const Default: Story = {
  render: (args) => ({
    components: { AppSelect },
    setup() {
      const value = ref(args.modelValue)
      return { args, value }
    },
    template: '<AppSelect v-model="value" :options="args.options" :label="args.label" :placeholder="args.placeholder" :multiple="args.multiple" :disabled="args.disabled" :item-title="args.itemTitle" :item-value="args.itemValue" :full-object="args.fullObject" />',
  }),
}
