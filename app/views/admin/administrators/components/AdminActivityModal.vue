<template>
  <AppModal
    v-model="isOpen"
    :title="modalTitle"
    :description="$t('ADMIN_ADMINS_ACTIVITY_DESCRIPTION')"
    size="medium"
  >
    <AdminActivityList :activities="activities" />
  </AppModal>
</template>

<script setup lang="ts">
import type { IActivity } from '~/components/Admin/ActivityList/index.types'

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
</script>
