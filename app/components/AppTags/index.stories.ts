import type { Meta, StoryObj } from '@storybook-vue/nuxt'
import AppTags from './index.vue'
import { ref } from 'vue'

const meta: Meta<typeof AppTags> = {
  title: 'Components/AppTags',
  component: AppTags,
  tags: ['autodocs'],
  argTypes: {
    readOnly: {
      control: 'boolean',
      description: 'Hide add button and remove buttons',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable add and remove functionality',
    },
    addButtonText: {
      control: 'text',
      description: 'Text for add button',
    },
  },
  args: {
    readOnly: false,
    disabled: false,
    addButtonText: 'Додати',
  },
}

export default meta
type Story = StoryObj<typeof AppTags>

const sampleTags = [
  { id: 1, label: 'Sci-Fi', variant: 'primary' as const },
  { id: 2, label: 'Екшн', variant: 'warning' as const },
  { id: 3, label: 'Деніс Вільньов', variant: 'purple' as const },
  { id: 4, label: 'Тімоті Шаламе', variant: 'basic' as const },
  { id: 5, label: 'Зендая', variant: 'basic' as const },
  { id: 6, label: 'США', variant: 'success' as const },
]

export const Default: Story = {
  render: (args) => ({
    components: { AppTags },
    setup() {
      const tags = ref([...sampleTags])
      return { args, tags }
    },
    template: '<AppTags v-bind="args" v-model="tags" @add="() => {}" />',
  }),
}

export const AllVariants: Story = {
  render: () => ({
    components: { AppTags },
    setup() {
      const tags = ref([
        { id: 1, label: 'Basic', variant: 'basic' as const },
        { id: 2, label: 'Primary', variant: 'primary' as const },
        { id: 3, label: 'Danger', variant: 'danger' as const },
        { id: 4, label: 'Success', variant: 'success' as const },
        { id: 5, label: 'Info', variant: 'info' as const },
        { id: 6, label: 'Purple', variant: 'purple' as const },
        { id: 7, label: 'Warning', variant: 'warning' as const },
      ])
      return { tags }
    },
    template: '<AppTags v-model="tags" @add="() => {}" />',
  }),
}

export const Empty: Story = {
  render: () => ({
    components: { AppTags },
    setup() {
      const tags = ref<typeof sampleTags>([])
      return { tags }
    },
    template: '<AppTags v-model="tags" @add="() => {}" />',
  }),
}
