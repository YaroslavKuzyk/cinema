<template>
  <AppModal
    v-model="isOpen"
    :title="$t('ADMIN_ADMINS_DISABLE_TITLE')"
    :description="$t('ADMIN_ADMINS_DISABLE_DESC', { name: adminName })"
    size="medium"
  >
    <template #icon>
      <div class="admin-disable-modal__icon">
        <ShieldOff :size="24" />
      </div>
    </template>

    <div v-if="hasActiveSessions" class="admin-disable-modal__warning">
      <AlertTriangle :size="16" />
      <span>{{ $t('ADMIN_ADMINS_DISABLE_WARNING') }}</span>
    </div>

    <template #footer>
      <AppButton variant="secondary" size="medium" @click="isOpen = false">
        {{ $t('ADMIN_ADMINS_CANCEL') }}
      </AppButton>
      <AppButton variant="danger" size="medium" @click="handleConfirm">
        {{ $t('ADMIN_ADMINS_DISABLE_CONFIRM') }}
      </AppButton>
    </template>
  </AppModal>
</template>

<script setup lang="ts">
import { ShieldOff, AlertTriangle } from 'lucide-vue-next'
import type { IAdmin } from '../domain'

const props = defineProps<{
  modelValue: boolean
  admin: IAdmin | null
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  confirm: [id: string]
}>()

const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})

const adminName = computed(() => {
  if (!props.admin) return ''
  return `${props.admin.firstName} ${props.admin.lastName}`
})

const hasActiveSessions = computed(() => {
  return props.admin?.status === 'online'
})

const handleConfirm = () => {
  if (props.admin) {
    emit('confirm', props.admin.id)
  }
  isOpen.value = false
}
</script>

<style lang="scss" scoped>
.admin-disable-modal {
  &__icon {
    align-items: center;
    background: var(--color-primary-bg);
    border-radius: var(--radius-md);
    color: var(--color-primary);
    display: flex;
    height: fluid(48px, 56px);
    justify-content: center;
    width: fluid(48px, 56px);
  }

  &__body {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
  }

  &__warning {
    @include FluidFontBodySm;
    align-items: flex-start;
    background: var(--color-warning-bg);
    border: 1px solid var(--color-warning-border);
    border-radius: var(--radius-md);
    color: var(--color-warning);
    display: flex;
    gap: var(--spacing-xs);
    padding: var(--spacing-sm) var(--spacing-md);

    svg {

      flex-shrink: 0;

      margin-top: 2px;

    }
  }

  &__text {
    @include FluidFontBodySm;

    color: var(--color-text-secondary);

  }
}
</style>
