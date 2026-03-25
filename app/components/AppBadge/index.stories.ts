import type { Meta, StoryObj } from '@storybook-vue/nuxt'
import AppBadge from './index.vue'

const meta: Meta<typeof AppBadge> = {
  title: 'Components/AppBadge',
  component: AppBadge,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['basic', 'primary', 'danger', 'success', 'info', 'purple', 'warning'],
      description: 'Visual style variant of the badge',
    },
  },
  args: {
    variant: 'basic',
  },
}

export default meta
type Story = StoryObj<typeof AppBadge>

export const Default: Story = {
  render: (args) => ({
    components: { AppBadge },
    setup() {
      return { args }
    },
    template: '<AppBadge v-bind="args">Badge</AppBadge>',
  }),
}

export const AllVariants: Story = {
  render: () => ({
    components: { AppBadge },
    template: `
      <div style="display: flex; gap: 12px; align-items: center; flex-wrap: wrap;">
        <AppBadge variant="basic">Basic</AppBadge>
        <AppBadge variant="primary">Primary</AppBadge>
        <AppBadge variant="danger">Danger</AppBadge>
        <AppBadge variant="success">Success</AppBadge>
        <AppBadge variant="info">Info</AppBadge>
        <AppBadge variant="purple">Purple</AppBadge>
        <AppBadge variant="warning">Warning</AppBadge>
      </div>
    `,
  }),
}
