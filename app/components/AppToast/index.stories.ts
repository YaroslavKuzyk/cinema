import type { Meta, StoryObj } from '@storybook-vue/nuxt'
import AppToast from './index.vue'
import AppToastContainer from './AppToastContainer.vue'
import AppButton from '../AppButton/index.vue'

const meta: Meta<typeof AppToast> = {
  title: 'Components/AppToast',
  component: AppToast,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof AppToast>

export const Info: Story = {
  render: () => ({
    components: { AppToast },
    setup() {
      const toast = {
        id: '1',
        title: 'Інформація',
        message: 'Це інформаційне повідомлення для користувача.',
        variant: 'info' as const,
      }
      return { toast }
    },
    template: '<AppToast :toast="toast" />',
  }),
}

export const Success: Story = {
  render: () => ({
    components: { AppToast },
    setup() {
      const toast = {
        id: '2',
        title: 'Успішно',
        message: 'Зміни збережено успішно.',
        variant: 'success' as const,
      }
      return { toast }
    },
    template: '<AppToast :toast="toast" />',
  }),
}

export const Warning: Story = {
  render: () => ({
    components: { AppToast },
    setup() {
      const toast = {
        id: '3',
        title: 'Увага',
        message: 'Це попередження про можливі проблеми.',
        variant: 'warning' as const,
      }
      return { toast }
    },
    template: '<AppToast :toast="toast" />',
  }),
}

export const Danger: Story = {
  render: () => ({
    components: { AppToast },
    setup() {
      const toast = {
        id: '4',
        title: 'Помилка',
        message: 'Не вдалося виконати операцію. Спробуйте ще раз.',
        variant: 'danger' as const,
      }
      return { toast }
    },
    template: '<AppToast :toast="toast" />',
  }),
}

export const WithoutTitle: Story = {
  render: () => ({
    components: { AppToast },
    setup() {
      const toast = {
        id: '5',
        message: 'Повідомлення без заголовка.',
        variant: 'info' as const,
      }
      return { toast }
    },
    template: '<AppToast :toast="toast" />',
  }),
}

export const AllVariants: Story = {
  render: () => ({
    components: { AppToast },
    setup() {
      const toasts = [
        { id: '1', title: 'Інформація', message: 'Інформаційне повідомлення.', variant: 'info' as const },
        { id: '2', title: 'Успішно', message: 'Операцію виконано успішно.', variant: 'success' as const },
        { id: '3', title: 'Увага', message: 'Зверніть увагу на це.', variant: 'warning' as const },
        { id: '4', title: 'Помилка', message: 'Щось пішло не так.', variant: 'danger' as const },
      ]
      return { toasts }
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 12px;">
        <AppToast v-for="toast in toasts" :key="toast.id" :toast="toast" />
      </div>
    `,
  }),
}

export const Interactive: Story = {
  render: () => ({
    components: { AppButton, AppToastContainer },
    setup() {
      const { success, error, warning, info } = useToast()
      return { success, error, warning, info }
    },
    template: `
      <div>
        <div style="display: flex; gap: 12px; flex-wrap: wrap;">
          <AppButton variant="info" @click="info('Інформаційне повідомлення', 'Інформація')">Info Toast</AppButton>
          <AppButton variant="success" @click="success('Операцію виконано успішно!', 'Успішно')">Success Toast</AppButton>
          <AppButton variant="purple" @click="warning('Зверніть увагу на це попередження.', 'Увага')">Warning Toast</AppButton>
          <AppButton variant="primary" @click="error('Не вдалося виконати операцію.', 'Помилка')">Error Toast</AppButton>
        </div>
        <AppToastContainer />
      </div>
    `,
  }),
}
