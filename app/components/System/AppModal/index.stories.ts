import type { Meta, StoryObj } from '@storybook-vue/nuxt'
import AppModal from './index.vue'
import AppButton from '../AppButton/index.vue'
import AppAlert from '../AppAlert/index.vue'
import { ref } from 'vue'
import { Trash2 } from 'lucide-vue-next'

const meta: Meta<typeof AppModal> = {
  title: 'Components/AppModal',
  component: AppModal,
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Modal title',
    },
    description: {
      control: 'text',
      description: 'Modal description',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'Modal size',
    },
    closable: {
      control: 'boolean',
      description: 'Show close button and allow ESC to close',
    },
    closeOnOverlay: {
      control: 'boolean',
      description: 'Close modal when clicking overlay',
    },
  },
  args: {
    title: 'Modal Title',
    description: '',
    size: 'medium',
    closable: true,
    closeOnOverlay: true,
  },
}

export default meta
type Story = StoryObj<typeof AppModal>

export const Default: Story = {
  render: (args) => ({
    components: { AppModal, AppButton },
    setup() {
      const isOpen = ref(false)
      return { args, isOpen }
    },
    template: `
      <div>
        <AppButton @click="isOpen = true">Open Modal</AppButton>
        <AppModal v-model="isOpen" v-bind="args">
          <p style="color: rgba(255,255,255,0.8); margin: 0;">Modal content goes here</p>
          <template #footer>
            <AppButton variant="secondary" @click="isOpen = false">Cancel</AppButton>
            <AppButton @click="isOpen = false">Confirm</AppButton>
          </template>
        </AppModal>
      </div>
    `,
  }),
}

export const DeleteConfirmation: Story = {
  args: {
    title: 'Видалити фільм?',
    description: 'Ви впевнені, що хочете видалити «Інтерстеллар 2»? Цю дію неможливо скасувати.',
    size: 'small',
  },
  render: (args) => ({
    components: { AppModal, AppButton, AppAlert, Trash2 },
    setup() {
      const isOpen = ref(false)
      return { args, isOpen, Trash2 }
    },
    template: `
      <div>
        <AppButton variant="danger" @click="isOpen = true">Delete</AppButton>
        <AppModal v-model="isOpen" v-bind="args">
          <template #icon>
            <div style="width: 48px; height: 48px; background: rgba(229, 9, 20, 0.15); border-radius: 12px; display: flex; align-items: center; justify-content: center;">
              <Trash2 :size="24" style="color: #E50914;" />
            </div>
          </template>
          <AppAlert variant="warning">
            Буде видалено 1.2M переглядів та 340 коментарів
          </AppAlert>
          <template #footer>
            <AppButton variant="secondary" style="flex: 1;" @click="isOpen = false">Скасувати</AppButton>
            <AppButton variant="primary" style="flex: 1;" @click="isOpen = false">Видалити</AppButton>
          </template>
        </AppModal>
      </div>
    `,
  }),
}

export const WithForm: Story = {
  args: {
    title: 'Створити категорію',
    size: 'medium',
  },
  render: (args) => ({
    components: { AppModal, AppButton },
    setup() {
      const isOpen = ref(false)
      return { args, isOpen }
    },
    template: `
      <div>
        <AppButton @click="isOpen = true">Create Category</AppButton>
        <AppModal v-model="isOpen" v-bind="args">
          <div style="display: flex; flex-direction: column; gap: 16px;">
            <div>
              <label style="display: block; color: rgba(255,255,255,0.5); font-size: 12px; text-transform: uppercase; margin-bottom: 8px;">Назва</label>
              <input type="text" placeholder="Введіть назву..." style="width: 100%; padding: 14px 16px; background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.15); border-radius: 12px; color: white; font-size: 14px; outline: none; box-sizing: border-box;" />
            </div>
          </div>
          <template #footer>
            <AppButton variant="secondary" @click="isOpen = false">Скасувати</AppButton>
            <AppButton @click="isOpen = false">Створити</AppButton>
          </template>
        </AppModal>
      </div>
    `,
  }),
}

export const Large: Story = {
  args: {
    title: 'Terms & Conditions',
    size: 'large',
  },
  render: (args) => ({
    components: { AppModal, AppButton },
    setup() {
      const isOpen = ref(false)
      return { args, isOpen }
    },
    template: `
      <div>
        <AppButton @click="isOpen = true">View Terms</AppButton>
        <AppModal v-model="isOpen" v-bind="args">
          <div style="color: rgba(255,255,255,0.7); line-height: 1.6;">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
          </div>
          <template #footer>
            <AppButton variant="secondary" @click="isOpen = false">Decline</AppButton>
            <AppButton @click="isOpen = false">Accept</AppButton>
          </template>
        </AppModal>
      </div>
    `,
  }),
}
