import type { Meta, StoryObj } from '@storybook-vue/nuxt'
import { ref } from 'vue'
import AppTabs from './index.vue'

const pillTabs = [
  { title: 'Вхід', value: 'login' },
  { title: 'Реєстрація', value: 'register' },
]

const underlineTabs = [
  { title: 'Номер телефону', value: 'phone' },
  { title: 'Email', value: 'email' },
]

const meta: Meta<typeof AppTabs> = {
  title: 'Components/AppTabs',
  component: AppTabs,
  tags: ['autodocs'],
  argTypes: {
    modelValue: {
      control: 'text',
      description: 'Active tab value',
    },
    tabs: {
      control: 'object',
      description: 'Array of tab objects with title, value, and disabled',
    },
    variant: {
      control: 'select',
      options: ['pill', 'underline'],
      description: 'Visual variant of the tabs',
    },
    buttonProps: {
      control: 'object',
      description: 'Props to pass to AppButton (only for pill variant)',
    },
  },
  args: {
    modelValue: 'login',
    tabs: pillTabs,
    variant: 'pill',
    buttonProps: {},
  },
}

export default meta
type Story = StoryObj<typeof AppTabs>

export const Pill: Story = {
  render: (args) => ({
    components: { AppTabs },
    setup() {
      const activeTab = ref(args.modelValue)
      return { args, activeTab }
    },
    template: '<AppTabs v-model="activeTab" :tabs="args.tabs" :variant="args.variant" :button-props="args.buttonProps" />',
  }),
}

export const PillSmall: Story = {
  args: {
    buttonProps: { size: 'small' },
  },
  render: (args) => ({
    components: { AppTabs },
    setup() {
      const activeTab = ref(args.modelValue)
      return { args, activeTab }
    },
    template: '<AppTabs v-model="activeTab" :tabs="args.tabs" :variant="args.variant" :button-props="args.buttonProps" />',
  }),
}

export const PillLarge: Story = {
  args: {
    buttonProps: { size: 'large' },
  },
  render: (args) => ({
    components: { AppTabs },
    setup() {
      const activeTab = ref(args.modelValue)
      return { args, activeTab }
    },
    template: '<AppTabs v-model="activeTab" :tabs="args.tabs" :variant="args.variant" :button-props="args.buttonProps" />',
  }),
}

export const Underline: Story = {
  args: {
    modelValue: 'phone',
    tabs: underlineTabs,
    variant: 'underline',
  },
  render: (args) => ({
    components: { AppTabs },
    setup() {
      const activeTab = ref(args.modelValue)
      return { args, activeTab }
    },
    template: '<AppTabs v-model="activeTab" :tabs="args.tabs" :variant="args.variant" :button-props="args.buttonProps" />',
  }),
}

export const UnderlineWithBadge: Story = {
  args: {
    modelValue: 'new',
    tabs: [
      { title: 'Нові', value: 'new', badge: 12 },
      { title: 'Популярні', value: 'popular', badge: 5 },
      { title: 'Рекомендовані', value: 'recommended' },
    ],
    variant: 'underline',
  },
  render: (args) => ({
    components: { AppTabs },
    setup() {
      const activeTab = ref(args.modelValue)
      return { args, activeTab }
    },
    template: '<AppTabs v-model="activeTab" :tabs="args.tabs" :variant="args.variant" :button-props="args.buttonProps" />',
  }),
}
