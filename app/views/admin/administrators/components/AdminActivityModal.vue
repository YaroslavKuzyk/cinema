<template>
  <AppModal
    v-model="isOpen"
    :title="modalTitle"
    :description="$t('ADMIN_ADMINS_ACTIVITY_DESCRIPTION')"
    size="xlarge"
  >
    <div class="admin-activity-modal">
      <div class="admin-activity-modal__filters">
        <div class="admin-activity-modal__filter">
          <AppDatePicker
            v-model="dateRange"
            :placeholder="$t('ADMIN_ADMINS_ACTIVITY_DATE_PLACEHOLDER')"
          />
        </div>
        <div class="admin-activity-modal__filter">
          <AppSelect
            v-model="selectedType"
            :options="typeOptions"
            item-title="title"
            item-value="value"
            :prefix="$t('ADMIN_ADMINS_ACTIVITY_TYPE_PLACEHOLDER')"
            :placeholder="$t('ADMIN_ADMINS_ACTIVITY_TYPE_PLACEHOLDER')"
          />
        </div>
      </div>

      <AdminActivityList
        v-if="filteredActivities.length"
        :activities="filteredActivities"
      />
      <p v-else class="admin-activity-modal__empty">
        {{ $t('ADMIN_ADMINS_ACTIVITY_EMPTY') }}
      </p>
    </div>
  </AppModal>
</template>

<script setup lang="ts">
import type { IActivity, ActivityType } from '~/components/Admin/ActivityList/index.types'

interface Props {
  modelValue: boolean
  adminName?: string
  activities: IActivity[]
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const { t } = useI18n()

const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})

const modalTitle = computed(() => {
  return props.adminName
    ? `${t('ADMIN_ADMINS_ACTIVITY')} — ${props.adminName}`
    : t('ADMIN_ADMINS_ACTIVITY')
})

const dateRange = ref<Date[] | null>(null)
const selectedType = ref<ActivityType | ''>('')

const typeOptions = computed(() => [
  { title: t('ADMIN_ADMINS_ACTIVITY_TYPE_ALL'), value: '' },
  { title: t('ADMIN_ACCOUNT_ACTIVITY_PUBLISHED'), value: 'published' },
  { title: t('ADMIN_ACCOUNT_ACTIVITY_EDITED'), value: 'edited' },
  { title: t('ADMIN_ACCOUNT_ACTIVITY_DELETED'), value: 'deleted' },
  { title: t('ADMIN_ACCOUNT_ACTIVITY_BLOCKED'), value: 'blocked' },
  { title: t('ADMIN_ACCOUNT_ACTIVITY_CREATED'), value: 'created' },
  { title: t('ADMIN_ACCOUNT_ACTIVITY_INVITED'), value: 'invited' },
  { title: t('ADMIN_ACCOUNT_ACTIVITY_UPDATED'), value: 'updated' },
])

const filteredActivities = computed(() => {
  return props.activities.filter((activity) => {
    const matchesType = !selectedType.value || activity.type === selectedType.value
    return matchesType
  })
})

watch(isOpen, (value) => {
  if (!value) {
    dateRange.value = null
    selectedType.value = ''
  }
})
</script>

<style lang="scss" scoped>
.admin-activity-modal {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);

  &__filters {

    display: flex;

    gap: var(--spacing-md);

  }

  &__filter {

    flex: 1;

    min-width: 0;

  }

  &__empty {
    @include FluidFontBodySm;
    color: var(--color-text-tertiary);
    padding: var(--spacing-xl) 0;
    text-align: center;
  }
}
</style>
