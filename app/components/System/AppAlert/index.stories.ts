import type { Meta, StoryObj } from '@storybook-vue/nuxt'
import AppAlert from './index.vue'

const meta: Meta<typeof AppAlert> = {
  title: 'Components/AppAlert',
  component: AppAlert,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['info', 'warning', 'danger', 'success'],
      description: 'Alert variant',
    },
  },
  args: {
    variant: 'info',
  },
}

export default meta
type Story = StoryObj<typeof AppAlert>

export const Default: Story = {
  render: (args) => ({
    components: { AppAlert },
    setup() {
      return { args }
    },
    template: '<AppAlert v-bind="args">This is an informational message.</AppAlert>',
  }),
}

export const Info: Story = {
  args: {
    variant: 'info',
  },
  render: (args) => ({
    components: { AppAlert },
    setup() {
      return { args }
    },
    template: '<AppAlert v-bind="args">This is an informational message.</AppAlert>',
  }),
}

export const Warning: Story = {
  args: {
    variant: 'warning',
  },
  render: (args) => ({
    components: { AppAlert },
    setup() {
      return { args }
    },
    template: '<AppAlert v-bind="args">Буде видалено 1.2M переглядів та 340 коментарів</AppAlert>',
  }),
}

export const Danger: Story = {
  args: {
    variant: 'danger',
  },
  render: (args) => ({
    components: { AppAlert },
    setup() {
      return { args }
    },
    template: '<AppAlert v-bind="args">This action cannot be undone!</AppAlert>',
  }),
}

export const Success: Story = {
  args: {
    variant: 'success',
  },
  render: (args) => ({
    components: { AppAlert },
    setup() {
      return { args }
    },
    template: '<AppAlert v-bind="args">Changes saved successfully.</AppAlert>',
  }),
}

export const AllVariants: Story = {
  render: () => ({
    components: { AppAlert },
    template: `
      <div style="display: flex; flex-direction: column; gap: 12px;">
        <AppAlert variant="info">This is an informational message.</AppAlert>
        <AppAlert variant="warning">This is a warning message.</AppAlert>
        <AppAlert variant="danger">This is a danger message.</AppAlert>
        <AppAlert variant="success">This is a success message.</AppAlert>
      </div>
    `,
  }),
}
