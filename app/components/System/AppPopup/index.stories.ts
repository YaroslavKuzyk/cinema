import type { Meta, StoryObj } from '@storybook-vue/nuxt'
import AppPopup from './index.vue'
import AppButton from '../AppButton/index.vue'
import AppAvatar from '../AppAvatar/index.vue'
import { ref } from 'vue'
import { User, Settings, LogOut, ChevronDown } from 'lucide-vue-next'

const meta: Meta<typeof AppPopup> = {
  title: 'Components/AppPopup',
  component: AppPopup,
  tags: ['autodocs'],
  argTypes: {
    position: {
      control: 'select',
      options: [
        'top',
        'top-start',
        'top-end',
        'bottom',
        'bottom-start',
        'bottom-end',
        'left',
        'left-start',
        'left-end',
        'right',
        'right-start',
        'right-end',
      ],
      description: 'Popup position relative to trigger',
    },
    trigger: {
      control: 'select',
      options: ['click', 'hover'],
      description: 'Trigger type',
    },
    offset: {
      control: 'number',
      description: 'Offset from trigger element (px)',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable popup',
    },
    closeOnClickOutside: {
      control: 'boolean',
      description: 'Close popup when clicking outside',
    },
    closeOnContentClick: {
      control: 'boolean',
      description: 'Close popup when clicking on content',
    },
  },
  args: {
    position: 'bottom-start',
    trigger: 'click',
    offset: 8,
    disabled: false,
    closeOnClickOutside: true,
    closeOnContentClick: false,
  },
}

export default meta
type Story = StoryObj<typeof AppPopup>

export const Default: Story = {
  render: (args) => ({
    components: { AppPopup, AppButton },
    setup() {
      return { args }
    },
    template: `
      <div style="padding: 100px; display: flex; justify-content: center;">
        <AppPopup v-bind="args">
          <template #trigger>
            <AppButton>Open Popup</AppButton>
          </template>
          <div style="padding: 16px; min-width: 200px;">
            <p style="margin: 0; color: rgba(255,255,255,0.8);">Popup content</p>
          </div>
        </AppPopup>
      </div>
    `,
  }),
}

export const UserMenu: Story = {
  args: {
    position: 'bottom-end',
    closeOnContentClick: true,
  },
  render: (args) => ({
    components: { AppPopup, AppAvatar, User, Settings, LogOut },
    setup() {
      return { args, User, Settings, LogOut }
    },
    template: `
      <div style="padding: 100px; display: flex; justify-content: center;">
        <AppPopup v-bind="args">
          <template #trigger>
            <div style="display: flex; align-items: center; gap: 12px; cursor: pointer;">
              <AppAvatar size="small" initials="АД" />
              <div>
                <p style="margin: 0; font-weight: 500;">Адмін</p>
                <span style="color: rgba(255,255,255,0.5); font-size: 12px;">Super Admin</span>
              </div>
            </div>
          </template>
          <div style="padding: 8px; min-width: 180px;">
            <a href="#" style="display: flex; align-items: center; gap: 12px; padding: 10px 16px; color: rgba(255,255,255,0.7); text-decoration: none; border-radius: 8px; transition: background 0.2s;" onmouseover="this.style.background='rgba(255,255,255,0.05)'" onmouseout="this.style.background='transparent'">
              <User :size="18" />
              <span>Профіль</span>
            </a>
            <a href="#" style="display: flex; align-items: center; gap: 12px; padding: 10px 16px; color: rgba(255,255,255,0.7); text-decoration: none; border-radius: 8px; transition: background 0.2s;" onmouseover="this.style.background='rgba(255,255,255,0.05)'" onmouseout="this.style.background='transparent'">
              <Settings :size="18" />
              <span>Налаштування</span>
            </a>
            <hr style="border: none; border-top: 1px solid rgba(255,255,255,0.1); margin: 8px 0;" />
            <a href="#" style="display: flex; align-items: center; gap: 12px; padding: 10px 16px; color: #E50914; text-decoration: none; border-radius: 8px; transition: background 0.2s;" onmouseover="this.style.background='rgba(229,9,20,0.1)'" onmouseout="this.style.background='transparent'">
              <LogOut :size="18" />
              <span>Вихід</span>
            </a>
          </div>
        </AppPopup>
      </div>
    `,
  }),
}

export const DropdownSelect: Story = {
  args: {
    position: 'bottom-start',
    closeOnContentClick: true,
  },
  render: (args) => ({
    components: { AppPopup, ChevronDown },
    setup() {
      const selected = ref('Усі фільми')
      const options = ['Усі фільми', 'Опубліковані', 'Чернетки', 'Архівовані']
      return { args, selected, options, ChevronDown }
    },
    template: `
      <div style="padding: 100px; display: flex; justify-content: center;">
        <AppPopup v-bind="args">
          <template #trigger>
            <button style="display: flex; align-items: center; gap: 8px; padding: 12px 16px; background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.15); border-radius: 10px; color: white; cursor: pointer;">
              {{ selected }}
              <ChevronDown :size="16" />
            </button>
          </template>
          <div style="padding: 8px; min-width: 180px;">
            <button
              v-for="option in options"
              :key="option"
              @click="selected = option"
              style="display: block; width: 100%; padding: 10px 16px; background: none; border: none; color: rgba(255,255,255,0.8); text-align: left; border-radius: 8px; cursor: pointer; transition: background 0.2s;"
              :style="{ background: selected === option ? 'rgba(229,9,20,0.15)' : 'transparent', color: selected === option ? '#E50914' : 'rgba(255,255,255,0.8)' }"
            >
              {{ option }}
            </button>
          </div>
        </AppPopup>
      </div>
    `,
  }),
}

export const HoverTrigger: Story = {
  args: {
    trigger: 'hover',
    position: 'top',
  },
  render: (args) => ({
    components: { AppPopup, AppButton },
    setup() {
      return { args }
    },
    template: `
      <div style="padding: 150px; display: flex; justify-content: center;">
        <AppPopup v-bind="args">
          <template #trigger>
            <AppButton variant="secondary">Hover me</AppButton>
          </template>
          <div style="padding: 12px 16px;">
            <p style="margin: 0; color: rgba(255,255,255,0.8); font-size: 14px;">Tooltip content on hover</p>
          </div>
        </AppPopup>
      </div>
    `,
  }),
}

export const Positions: Story = {
  render: () => ({
    components: { AppPopup, AppButton },
    setup() {
      const positions = [
        'top-start', 'top', 'top-end',
        'left-start', 'left', 'left-end',
        'right-start', 'right', 'right-end',
        'bottom-start', 'bottom', 'bottom-end',
      ]
      return { positions }
    },
    template: `
      <div style="padding: 150px; display: flex; flex-wrap: wrap; gap: 16px; justify-content: center;">
        <AppPopup v-for="pos in positions" :key="pos" :position="pos">
          <template #trigger>
            <AppButton variant="secondary" size="small">{{ pos }}</AppButton>
          </template>
          <div style="padding: 12px 16px;">
            <p style="margin: 0; color: rgba(255,255,255,0.8); font-size: 12px;">Position: {{ pos }}</p>
          </div>
        </AppPopup>
      </div>
    `,
  }),
}

export const Controlled: Story = {
  render: () => ({
    components: { AppPopup, AppButton },
    setup() {
      const isOpen = ref(false)
      return { isOpen }
    },
    template: `
      <div style="padding: 100px; display: flex; flex-direction: column; align-items: center; gap: 16px;">
        <p style="color: rgba(255,255,255,0.6);">Popup is {{ isOpen ? 'open' : 'closed' }}</p>
        <div style="display: flex; gap: 8px;">
          <AppButton variant="secondary" size="small" @click="isOpen = true">Open</AppButton>
          <AppButton variant="secondary" size="small" @click="isOpen = false">Close</AppButton>
        </div>
        <AppPopup v-model="isOpen" position="bottom">
          <template #trigger>
            <AppButton>Controlled Popup</AppButton>
          </template>
          <div style="padding: 16px; min-width: 200px;">
            <p style="margin: 0; color: rgba(255,255,255,0.8);">Controlled by v-model</p>
          </div>
        </AppPopup>
      </div>
    `,
  }),
}
