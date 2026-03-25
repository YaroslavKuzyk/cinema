import type { Meta, StoryObj } from '@storybook-vue/nuxt'
import AppButton from './index.vue'

const meta: Meta<typeof AppButton> = {
  title: 'Components/AppButton',
  component: AppButton,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'danger', 'success', 'info', 'purple', 'transparent'],
      description: 'Visual style variant of the button',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Size of the button',
    },
    loading: {
      control: 'boolean',
      description: 'Loading state of the button',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state of the button',
    },
  },
  args: {
    variant: 'primary',
    size: 'medium',
    loading: false,
    disabled: false,
  },
}

export default meta
type Story = StoryObj<typeof AppButton>

export const Default: Story = {
  render: (args) => ({
    components: { AppButton },
    setup() {
      return { args }
    },
    template: '<AppButton v-bind="args">Click me</AppButton>',
  }),
}

export const AllVariants: Story = {
  render: () => ({
    components: { AppButton },
    template: `
      <div style="display: flex; flex-direction: column; gap: 24px;">
        <div>
          <h4 style="color: white; margin-bottom: 12px;">Variants</h4>
          <div style="display: flex; gap: 12px; align-items: center; flex-wrap: wrap;">
            <AppButton variant="primary">Primary</AppButton>
            <AppButton variant="secondary">Secondary</AppButton>
            <AppButton variant="danger">Danger</AppButton>
            <AppButton variant="success">Success</AppButton>
            <AppButton variant="info">Info</AppButton>
            <AppButton variant="purple">Purple</AppButton>
            <AppButton variant="transparent">Transparent</AppButton>
          </div>
        </div>
        <div>
          <h4 style="color: white; margin-bottom: 12px;">Sizes</h4>
          <div style="display: flex; gap: 12px; align-items: center;">
            <AppButton size="small">Small</AppButton>
            <AppButton size="medium">Medium</AppButton>
            <AppButton size="large">Large</AppButton>
          </div>
        </div>
        <div>
          <h4 style="color: white; margin-bottom: 12px;">States</h4>
          <div style="display: flex; gap: 12px; align-items: center;">
            <AppButton :loading="true">Loading</AppButton>
            <AppButton :disabled="true">Disabled</AppButton>
          </div>
        </div>
      </div>
    `,
  }),
}
