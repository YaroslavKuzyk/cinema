<template>
  <div class="admin-admins-filters">
    <div class="admin-admins-filters__left">
      <div class="admin-admins-filters__search">
        <Search :size="16" class="admin-admins-filters__search-icon" />
        <AppInput
          :model-value="modelValue.search"
          :placeholder="$t('ADMIN_ADMINS_SEARCH_PLACEHOLDER')"
          @update:model-value="updateFilter('search', $event)"
        />
      </div>
      <div class="admin-admins-filters__select">
        <AppSelect
          :model-value="modelValue.role"
          :options="roleOptions"
          item-title="title"
          item-value="value"
          :placeholder="$t('ADMIN_ADMINS_FILTER_ROLE')"
          @update:model-value="updateFilter('role', $event)"
        />
      </div>
      <div class="admin-admins-filters__select">
        <AppSelect
          :model-value="modelValue.status"
          :options="statusOptions"
          item-title="title"
          item-value="value"
          :placeholder="$t('ADMIN_ADMINS_FILTER_STATUS')"
          @update:model-value="updateFilter('status', $event)"
        />
      </div>
    </div>
    <div class="admin-admins-filters__right">
      <span class="admin-admins-filters__count">
        {{ $t('ADMIN_ADMINS_FOUND', { count: totalFound }) }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Search } from 'lucide-vue-next'
import type { IAdminFilters } from '../domain'

const { t } = useI18n()

const props = defineProps<{
  modelValue: IAdminFilters
  totalFound: number
}>()

const emit = defineEmits<{
  'update:modelValue': [value: IAdminFilters]
}>()

const roleOptions = computed(() => [
  { title: t('ADMIN_ADMINS_FILTER_ROLE_ALL'), value: '' },
  { title: 'Super Admin', value: 'Super Admin' },
  { title: 'Редактор', value: 'Редактор' },
  { title: 'Модератор', value: 'Модератор' },
  { title: 'Переглядач', value: 'Переглядач' },
])

const statusOptions = computed(() => [
  { title: t('ADMIN_ADMINS_FILTER_STATUS_ALL'), value: '' },
  { title: t('ADMIN_ADMINS_FILTER_STATUS_ONLINE'), value: 'online' },
  { title: t('ADMIN_ADMINS_FILTER_STATUS_OFFLINE'), value: 'offline' },
  { title: t('ADMIN_ADMINS_FILTER_STATUS_AWAY'), value: 'away' },
])

const updateFilter = (key: keyof IAdminFilters, value: string) => {
  emit('update:modelValue', { ...props.modelValue, [key]: value })
}
</script>

<style lang="scss" scoped>
.admin-admins-filters {
  align-items: center;
  display: flex;
  gap: var(--spacing-md);
  justify-content: space-between;

  &__left {
    align-items: center;
    display: flex;
    gap: var(--spacing-md);
  }

  &__search {
    position: relative;
    width: fluid(250px, 400px);
  }

  &__search-icon {
    color: var(--color-text-tertiary);
    left: var(--spacing-base);
    pointer-events: none;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 1;
  }

  &__search :deep(.app-input__field) {
    padding-left: calc(var(--spacing-base) + 16px + var(--spacing-xs));
  }

  &__select {
    min-width: fluid(160px, 240px);
  }

  &__right {
    flex-shrink: 0;
  }

  &__count {
    @include FluidFontBodySm;
    color: var(--color-text-secondary);
    white-space: nowrap;
  }
}
</style>
