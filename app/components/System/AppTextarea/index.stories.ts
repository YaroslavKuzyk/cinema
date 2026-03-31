import type { Meta, StoryObj } from '@storybook-vue/nuxt'
import AppTextarea from './index.vue'

const meta: Meta<typeof AppTextarea> = {
  title: 'Components/AppTextarea',
  component: AppTextarea,
  tags: ['autodocs'],
  argTypes: {
    modelValue: {
      control: 'text',
      description: 'Textarea value (v-model)',
    },
    label: {
      control: 'text',
      description: 'Label text for the textarea',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
    rows: {
      control: 'number',
      description: 'Number of visible rows',
    },
    readonly: {
      control: 'boolean',
      description: 'Readonly state of the textarea',
    },
  },
  args: {
    modelValue: '',
    label: '',
    placeholder: 'Enter text...',
    rows: 3,
    readonly: false,
  },
}

export default meta
type Story = StoryObj<typeof AppTextarea>

export const Default: Story = {
  args: {
    label: 'Опис',
    placeholder: 'Опишіть призначення ролі',
  },

  render: (args) => ({
    components: { AppTextarea },
    setup() {
      return { args }
    },
    template: '<AppTextarea v-model="args.modelValue" :label="args.label" :placeholder="args.placeholder" :rows="args.rows" :readonly="args.readonly" />',
  }),
}

export const WithValue: Story = {
  args: {
    label: 'Опис',
    modelValue: 'Управління контентом: фільми, серіали, аніме, жанри.',
  },

  render: (args) => ({
    components: { AppTextarea },
    setup() {
      return { args }
    },
    template: '<AppTextarea v-model="args.modelValue" :label="args.label" :placeholder="args.placeholder" :rows="args.rows" :readonly="args.readonly" />',
  }),
}

export const Readonly: Story = {
  args: {
    label: 'Опис',
    modelValue: 'Тільки для читання',
    readonly: true,
  },

  render: (args) => ({
    components: { AppTextarea },
    setup() {
      return { args }
    },
    template: '<AppTextarea v-model="args.modelValue" :label="args.label" :placeholder="args.placeholder" :rows="args.rows" :readonly="args.readonly" />',
  }),
}
