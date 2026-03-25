import type { Meta, StoryObj } from '@storybook-vue/nuxt'
import AppTable from './index.vue'
import AppBadge from '../AppBadge/index.vue'
import AppPagination from '../AppPagination/index.vue'
import { ref } from 'vue'

const meta: Meta<typeof AppTable> = {
  title: 'Components/AppTable',
  component: AppTable,
  tags: ['autodocs'],
  argTypes: {
    selectable: {
      control: 'boolean',
      description: 'Enable row selection with checkboxes',
    },
    emptyText: {
      control: 'text',
      description: 'Text to display when table is empty',
    },
  },
}

export default meta
type Story = StoryObj<typeof AppTable>

const sampleColumns = [
  { key: 'name', label: 'Назва', width: '30%' },
  { key: 'genre', label: 'Жанр', width: '15%' },
  { key: 'status', label: 'Статус', width: '15%' },
  { key: 'rating', label: 'Рейтинг', width: '10%', align: 'center' as const },
  { key: 'views', label: 'Перегляди', width: '15%' },
  { key: 'actions', label: 'Дії', width: '15%', align: 'right' as const },
]

const sampleData = [
  { id: 1, name: 'Інтерстеллар 2', year: '2026', duration: '165 хв', genre: 'Sci-Fi', status: 'published', rating: 8.7, views: '1.2M', image: '' },
  { id: 2, name: 'Нічне місто', year: '2026', duration: '8 епізодів', genre: 'Детектив', status: 'draft', rating: 7.4, views: '540K', image: '' },
  { id: 3, name: 'Останній рейс', year: '2025', duration: '120 хв', genre: 'Трилер', status: 'review', rating: 6.9, views: '210K', image: '' },
]

export const Default: Story = {
  args: {
    columns: sampleColumns,
    data: sampleData,
    selectable: false,
  },
  render: (args) => ({
    components: { AppTable, AppBadge },
    setup() {
      const getStatusVariant = (status: string) => {
        switch (status) {
          case 'published': return 'success'
          case 'draft': return 'warning'
          case 'review': return 'info'
          default: return 'basic'
        }
      }
      const getStatusLabel = (status: string) => {
        switch (status) {
          case 'published': return 'Опубліковано'
          case 'draft': return 'Чернетка'
          case 'review': return 'На перевірці'
          default: return status
        }
      }
      return { args, getStatusVariant, getStatusLabel }
    },
    template: `
      <AppTable v-bind="args">
        <template #cell-name="{ row }">
          <div style="display: flex; align-items: center; gap: 12px;">
            <div style="width: 48px; height: 32px; background: #3B82F6; border-radius: 4px;"></div>
            <div>
              <div style="font-weight: 500; color: white;">{{ row.name }}</div>
              <div style="font-size: 12px; color: rgba(255,255,255,0.5);">{{ row.year }} · {{ row.duration }}</div>
            </div>
          </div>
        </template>
        <template #cell-status="{ row }">
          <AppBadge :variant="getStatusVariant(row.status)">{{ getStatusLabel(row.status) }}</AppBadge>
        </template>
        <template #cell-rating="{ row }">
          <span style="display: flex; align-items: center; gap: 4px; justify-content: center;">
            <span style="color: #FBBF24;">★</span> {{ row.rating }}
          </span>
        </template>
      </AppTable>
    `,
  }),
}

export const Selectable: Story = {
  args: {
    columns: sampleColumns,
    data: sampleData,
    selectable: true,
  },
  render: (args) => ({
    components: { AppTable, AppBadge },
    setup() {
      const selectedRows = ref<number[]>([1])
      const getStatusVariant = (status: string) => {
        switch (status) {
          case 'published': return 'success'
          case 'draft': return 'warning'
          case 'review': return 'info'
          default: return 'basic'
        }
      }
      const getStatusLabel = (status: string) => {
        switch (status) {
          case 'published': return 'Опубліковано'
          case 'draft': return 'Чернетка'
          case 'review': return 'На перевірці'
          default: return status
        }
      }
      return { args, selectedRows, getStatusVariant, getStatusLabel }
    },
    template: `
      <div>
        <p style="color: rgba(255,255,255,0.5); margin-bottom: 16px;">Вибрано: {{ selectedRows }}</p>
        <AppTable v-bind="args" v-model:selected-rows="selectedRows">
          <template #cell-name="{ row }">
            <div style="display: flex; align-items: center; gap: 12px;">
              <div style="width: 48px; height: 32px; background: #3B82F6; border-radius: 4px;"></div>
              <div>
                <div style="font-weight: 500; color: white;">{{ row.name }}</div>
                <div style="font-size: 12px; color: rgba(255,255,255,0.5);">{{ row.year }} · {{ row.duration }}</div>
              </div>
            </div>
          </template>
          <template #cell-status="{ row }">
            <AppBadge :variant="getStatusVariant(row.status)">{{ getStatusLabel(row.status) }}</AppBadge>
          </template>
          <template #cell-rating="{ row }">
            <span style="display: flex; align-items: center; gap: 4px; justify-content: center;">
              <span style="color: #FBBF24;">★</span> {{ row.rating }}
            </span>
          </template>
        </AppTable>
      </div>
    `,
  }),
}

export const WithPagination: Story = {
  args: {
    columns: sampleColumns,
    data: sampleData,
    selectable: true,
  },
  render: (args) => ({
    components: { AppTable, AppBadge, AppPagination },
    setup() {
      const selectedRows = ref<number[]>([])
      const currentPage = ref(1)
      const getStatusVariant = (status: string) => {
        switch (status) {
          case 'published': return 'success'
          case 'draft': return 'warning'
          case 'review': return 'info'
          default: return 'basic'
        }
      }
      const getStatusLabel = (status: string) => {
        switch (status) {
          case 'published': return 'Опубліковано'
          case 'draft': return 'Чернетка'
          case 'review': return 'На перевірці'
          default: return status
        }
      }
      return { args, selectedRows, currentPage, getStatusVariant, getStatusLabel }
    },
    template: `
      <AppTable v-bind="args" v-model:selected-rows="selectedRows">
        <template #cell-name="{ row }">
          <div style="display: flex; align-items: center; gap: 12px;">
            <div style="width: 48px; height: 32px; background: #A855F7; border-radius: 4px;"></div>
            <div>
              <div style="font-weight: 500; color: white;">{{ row.name }}</div>
              <div style="font-size: 12px; color: rgba(255,255,255,0.5);">{{ row.year }} · {{ row.duration }}</div>
            </div>
          </div>
        </template>
        <template #cell-status="{ row }">
          <AppBadge :variant="getStatusVariant(row.status)">{{ getStatusLabel(row.status) }}</AppBadge>
        </template>
        <template #cell-rating="{ row }">
          <span style="display: flex; align-items: center; gap: 4px; justify-content: center;">
            <span style="color: #FBBF24;">★</span> {{ row.rating }}
          </span>
        </template>
        <template #pagination>
          <AppPagination
            v-model:current-page="currentPage"
            :total-items="1247"
            :items-per-page="10"
          />
        </template>
      </AppTable>
    `,
  }),
}

export const Empty: Story = {
  args: {
    columns: sampleColumns,
    data: [],
    selectable: true,
    emptyText: 'Немає даних для відображення',
  },
  render: (args) => ({
    components: { AppTable },
    setup() {
      return { args }
    },
    template: '<AppTable v-bind="args" />',
  }),
}
