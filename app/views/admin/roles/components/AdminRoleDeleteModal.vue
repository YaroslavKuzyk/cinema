<template>
  <AppModal
    v-model="isOpen"
    :title="$t('ADMIN_ROLES_DELETE_TITLE')"
    :description="$t('ADMIN_ROLES_DELETE_DESC', { name: role?.name })"
    size="medium"
  >
    <template #icon>
      <div class="admin-role-delete-modal__icon">
        <Trash2 :size="24" />
      </div>
    </template>

    <div class="admin-role-delete-modal__body">
      <div v-if="hasAdmins" class="admin-role-delete-modal__warning">
        <AlertTriangle :size="16" />
        <span>
          {{ $t('ADMIN_ROLES_DELETE_WARNING', role!.admins.length) }}
          {{ $t('ADMIN_ROLES_DELETE_REASSIGN') }}
        </span>
      </div>

      <AppSelect
        v-if="hasAdmins"
        v-model="replacementRoleId"
        :label="$t('ADMIN_ROLES_DELETE_REPLACE_LABEL')"
        :placeholder="$t('ADMIN_ROLES_DELETE_REPLACE_PLACEHOLDER')"
        :options="availableRoles"
        item-title="name"
        item-value="id"
      />
    </div>

    <template #footer>
      <AppButton variant="secondary" size="medium" @click="isOpen = false">
        {{ $t('ADMIN_ROLES_MODAL_CANCEL') }}
      </AppButton>
      <AppButton
        variant="danger"
        size="medium"
        :disabled="hasAdmins && !replacementRoleId"
        @click="handleConfirm"
      >
        {{ $t('ADMIN_ROLES_DELETE') }}
      </AppButton>
    </template>
  </AppModal>
</template>

<script setup lang="ts">
import { Trash2, AlertTriangle } from 'lucide-vue-next'
import type { IRole } from '../domain'

interface Props {
  modelValue: boolean
  role: IRole | null
  roles: IRole[]
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  confirm: [id: string, replacementRoleId: string | null]
}>()

const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})

const replacementRoleId = ref<string | null>(null)

const hasAdmins = computed(() => props.role && props.role.admins.length > 0)

const availableRoles = computed(() =>
  props.roles.filter((r) => r.id !== props.role?.id)
)

watch(() => props.modelValue, (open) => {
  if (open) {
    replacementRoleId.value = null
  }
})

const handleConfirm = () => {
  if (props.role) {
    emit('confirm', props.role.id, hasAdmins.value ? replacementRoleId.value : null)
  }
  isOpen.value = false
}
</script>

<style lang="scss" scoped>
.admin-role-delete-modal {
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
}
</style>
