<template>
  <AppModal
    v-model="isOpen"
    :title="$t('ADMIN_ROLES_DUPLICATE_TITLE')"
    :description="$t('ADMIN_ROLES_DUPLICATE_DESC', { name: role?.name })"
    size="medium"
  >
    <template #icon>
      <div class="admin-role-duplicate-modal__icon">
        <Copy :size="24" />
      </div>
    </template>

    <div class="admin-role-duplicate-modal__fields">
      <AppInput
        v-model="newName"
        :label="$t('ADMIN_ROLES_DUPLICATE_NAME_LABEL')"
        :placeholder="$t('ADMIN_ROLES_DUPLICATE_NAME_PLACEHOLDER')"
      />
      <AppTextarea
        v-model="newDescription"
        :label="$t('ADMIN_ROLES_MODAL_DESCRIPTION')"
        :placeholder="$t('ADMIN_ROLES_MODAL_DESCRIPTION_PLACEHOLDER')"
        :rows="3"
      />
    </div>

    <template #footer>
      <AppButton variant="secondary" size="medium" @click="isOpen = false">
        {{ $t('ADMIN_ROLES_MODAL_CANCEL') }}
      </AppButton>
      <AppButton size="medium" @click="handleConfirm">
        {{ $t('ADMIN_ROLES_DUPLICATE') }}
      </AppButton>
    </template>
  </AppModal>
</template>

<script setup lang="ts">
import { Copy } from 'lucide-vue-next'
import type { IRole } from '../domain'

interface Props {
  modelValue: boolean
  role: IRole | null
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  confirm: [id: string, name: string, description: string]
}>()

const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})

const newName = ref('')
const newDescription = ref('')

watch(() => props.modelValue, (open) => {
  if (open && props.role) {
    newName.value = `${props.role.name} (копія)`
    newDescription.value = props.role.description
  }
})

const handleConfirm = () => {
  if (props.role) {
    emit('confirm', props.role.id, newName.value, newDescription.value)
  }
  isOpen.value = false
}
</script>

<style lang="scss" scoped>
.admin-role-duplicate-modal {
  &__icon {
    align-items: center;
    background: var(--color-info-bg);
    border-radius: var(--radius-md);
    color: var(--color-info);
    display: flex;
    height: fluid(48px, 56px);
    justify-content: center;
    width: fluid(48px, 56px);
  }

  &__fields {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
  }
}
</style>
