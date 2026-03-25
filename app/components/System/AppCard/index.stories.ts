import type { Meta, StoryObj } from '@storybook-vue/nuxt'
import AppCard from './index.vue'
import AppButton from '../AppButton/index.vue'

const meta: Meta<typeof AppCard> = {
  title: 'Components/AppCard',
  component: AppCard,
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Card title',
    },
    subtitle: {
      control: 'text',
      description: 'Card subtitle',
    },
    clickable: {
      control: 'boolean',
      description: 'Make card clickable with hover effect',
    },
  },
  args: {
    title: '',
    subtitle: '',
    clickable: false,
  },
}

export default meta
type Story = StoryObj<typeof AppCard>

export const Default: Story = {
  render: (args) => ({
    components: { AppCard },
    setup() {
      return { args }
    },
    template: `
      <AppCard v-bind="args">
        <p style="color: rgba(255,255,255,0.8); margin: 0;">Card content goes here</p>
      </AppCard>
    `,
  }),
}

export const WithTitle: Story = {
  args: {
    title: 'Card Title',
    subtitle: 'Card subtitle text',
  },
  render: (args) => ({
    components: { AppCard },
    setup() {
      return { args }
    },
    template: `
      <AppCard v-bind="args">
        <p style="color: rgba(255,255,255,0.8); margin: 0;">Card content goes here</p>
      </AppCard>
    `,
  }),
}

export const WithIcon: Story = {
  args: {
    title: 'Основна інформація',
    subtitle: 'Заповніть основні дані про контент',
  },
  render: (args) => ({
    components: { AppCard },
    setup() {
      return { args }
    },
    template: `
      <AppCard v-bind="args">
        <template #icon>📋</template>
        <p style="color: rgba(255,255,255,0.8); margin: 0;">Form fields go here</p>
      </AppCard>
    `,
  }),
}

export const WithHeaderAction: Story = {
  args: {
    title: 'Card Title',
  },
  render: (args) => ({
    components: { AppCard, AppButton },
    setup() {
      return { args }
    },
    template: `
      <AppCard v-bind="args">
        <template #header-action>
          <AppButton variant="transparent" size="small">Action</AppButton>
        </template>
        <p style="color: rgba(255,255,255,0.8); margin: 0;">Card content goes here</p>
      </AppCard>
    `,
  }),
}

export const WithFooter: Story = {
  args: {
    title: 'Card Title',
  },
  render: (args) => ({
    components: { AppCard, AppButton },
    setup() {
      return { args }
    },
    template: `
      <AppCard v-bind="args">
        <p style="color: rgba(255,255,255,0.8); margin: 0;">Card content goes here</p>
        <template #footer>
          <div style="display: flex; gap: 12px; justify-content: flex-end;">
            <AppButton variant="transparent" size="small">Cancel</AppButton>
            <AppButton size="small">Save</AppButton>
          </div>
        </template>
      </AppCard>
    `,
  }),
}

export const Clickable: Story = {
  args: {
    title: 'Clickable Card',
    subtitle: 'Hover to see effect',
    clickable: true,
  },
  render: (args) => ({
    components: { AppCard },
    setup() {
      return { args }
    },
    template: `
      <AppCard v-bind="args">
        <p style="color: rgba(255,255,255,0.8); margin: 0;">Click anywhere on this card</p>
      </AppCard>
    `,
  }),
}

export const Grid: Story = {
  render: () => ({
    components: { AppCard },
    template: `
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;">
        <AppCard title="Card 1" clickable>
          <p style="color: rgba(255,255,255,0.8); margin: 0;">Content 1</p>
        </AppCard>
        <AppCard title="Card 2" clickable>
          <p style="color: rgba(255,255,255,0.8); margin: 0;">Content 2</p>
        </AppCard>
        <AppCard title="Card 3" clickable>
          <p style="color: rgba(255,255,255,0.8); margin: 0;">Content 3</p>
        </AppCard>
      </div>
    `,
  }),
}
