import type { Meta, StoryObj } from '@storybook-vue/nuxt'
import AppAvatar from './index.vue'

const meta: Meta<typeof AppAvatar> = {
  title: 'Components/AppAvatar',
  component: AppAvatar,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Size of the avatar',
    },
    src: {
      control: 'text',
      description: 'Image URL for the avatar',
    },
    initials: {
      control: 'text',
      description: 'Initials to display when no image is provided',
    },
  },
  args: {
    size: 'medium',
    initials: 'АД',
  },
}

export default meta
type Story = StoryObj<typeof AppAvatar>

export const Default: Story = {
  render: (args) => ({
    components: { AppAvatar },
    setup() {
      return { args }
    },
    template: '<AppAvatar v-bind="args" />',
  }),
}

export const AllSizes: Story = {
  render: () => ({
    components: { AppAvatar },
    template: `
      <div style="display: flex; gap: 16px; align-items: center;">
        <AppAvatar size="small" initials="АД" />
        <AppAvatar size="medium" initials="АД" />
        <AppAvatar size="large" initials="АД" />
      </div>
    `,
  }),
}

export const WithImage: Story = {
  render: () => ({
    components: { AppAvatar },
    template: `
      <div style="display: flex; gap: 16px; align-items: center;">
        <AppAvatar size="small" src="https://i.pravatar.cc/80?img=1" />
        <AppAvatar size="medium" src="https://i.pravatar.cc/120?img=1" />
        <AppAvatar size="large" src="https://i.pravatar.cc/160?img=1" />
      </div>
    `,
  }),
}
