import type { Meta, StoryObj } from '@storybook-vue/nuxt'
import AppPagination from './index.vue'
import { ref } from 'vue'

const meta: Meta<typeof AppPagination> = {
  title: 'Components/AppPagination',
  component: AppPagination,
  tags: ['autodocs'],
  argTypes: {
    currentPage: {
      control: 'number',
      description: 'Current active page',
    },
    totalItems: {
      control: 'number',
      description: 'Total number of items',
    },
    itemsPerPage: {
      control: 'number',
      description: 'Number of items per page',
    },
    maxVisiblePages: {
      control: 'number',
      description: 'Maximum number of visible page buttons',
    },
  },
  args: {
    currentPage: 1,
    totalItems: 1247,
    itemsPerPage: 10,
    maxVisiblePages: 5,
  },
}

export default meta
type Story = StoryObj<typeof AppPagination>

export const Default: Story = {
  render: (args) => ({
    components: { AppPagination },
    setup() {
      const page = ref(args.currentPage)
      return { args, page }
    },
    template: '<AppPagination v-bind="args" v-model:current-page="page" />',
  }),
}

export const FirstPage: Story = {
  args: {
    currentPage: 1,
    totalItems: 1247,
  },
  render: (args) => ({
    components: { AppPagination },
    setup() {
      const page = ref(args.currentPage)
      return { args, page }
    },
    template: '<AppPagination v-bind="args" v-model:current-page="page" />',
  }),
}

export const MiddlePage: Story = {
  args: {
    currentPage: 63,
    totalItems: 1247,
  },
  render: (args) => ({
    components: { AppPagination },
    setup() {
      const page = ref(args.currentPage)
      return { args, page }
    },
    template: '<AppPagination v-bind="args" v-model:current-page="page" />',
  }),
}

export const LastPage: Story = {
  args: {
    currentPage: 125,
    totalItems: 1247,
  },
  render: (args) => ({
    components: { AppPagination },
    setup() {
      const page = ref(args.currentPage)
      return { args, page }
    },
    template: '<AppPagination v-bind="args" v-model:current-page="page" />',
  }),
}

export const FewPages: Story = {
  args: {
    currentPage: 1,
    totalItems: 45,
    itemsPerPage: 10,
  },
  render: (args) => ({
    components: { AppPagination },
    setup() {
      const page = ref(args.currentPage)
      return { args, page }
    },
    template: '<AppPagination v-bind="args" v-model:current-page="page" />',
  }),
}
