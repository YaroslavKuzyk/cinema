<template>
  <AppModal
    v-model="isOpen"
    :title="modalTitle"
    :description="modalDescription"
    size="xlarge"
    @closed="handleClosed"
  >
    <div class="admin-role-modal">
      <div class="admin-role-modal__fields">
        <div class="admin-role-modal__row">
          <AppInput
            v-model="form.name"
            :label="$t('ADMIN_ROLES_MODAL_NAME')"
            :placeholder="$t('ADMIN_ROLES_MODAL_NAME_PLACEHOLDER')"
            :readonly="isViewMode"
          />
          <AppSelect
            v-model="form.icon"
            :label="$t('ADMIN_ROLES_MODAL_ICON')"
            :options="iconOptions"
            item-title="title"
            item-value="value"
            :disabled="isViewMode"
          />
        </div>

        <AppTextarea
          v-model="form.description"
          :label="$t('ADMIN_ROLES_MODAL_DESCRIPTION')"
          :placeholder="$t('ADMIN_ROLES_MODAL_DESCRIPTION_PLACEHOLDER')"
          :readonly="isViewMode"
          :rows="3"
        />

        <div class="admin-role-modal__color">
          <span class="admin-role-modal__label">{{ $t('ADMIN_ROLES_MODAL_COLOR') }}</span>
          <div class="admin-role-modal__colors">
            <button
              v-for="color in colorOptions"
              :key="color"
              class="admin-role-modal__color-btn"
              :class="{ 'admin-role-modal__color-btn--active': form.color === color }"
              :style="{ background: color }"
              :disabled="isViewMode"
              @click="form.color = color"
            />
          </div>
        </div>
      </div>

      <div class="admin-role-modal__divider" />

      <div class="admin-role-modal__permissions">
        <div class="admin-role-modal__permissions-header">
          <span class="admin-role-modal__section-title">{{ $t('ADMIN_ROLES_MODAL_PERMISSIONS') }}</span>
          <AppInput
            v-model="searchQuery"
            :placeholder="$t('ADMIN_ROLES_MODAL_SEARCH_PLACEHOLDER')"
            :readonly="false"
          />
        </div>

        <div class="admin-role-modal__groups">
          <div
            v-for="group in filteredGroups"
            :key="group.title"
            class="admin-role-modal__group"
          >
            <div class="admin-role-modal__group-header">
              <span class="admin-role-modal__group-title">{{ group.title }}</span>
              <button
                v-if="!isViewMode"
                class="admin-role-modal__toggle-all"
                @click="toggleGroup(group)"
              >
                {{ isGroupAllEnabled(group) ? $t('ADMIN_ROLES_MODAL_DESELECT_ALL') : $t('ADMIN_ROLES_MODAL_SELECT_ALL') }}
              </button>
            </div>
            <div class="admin-role-modal__group-list">
              <AppCheckbox
                v-for="permission in group.permissions"
                :key="permission.key"
                v-model="permission.enabled"
                :label="permission.label"
                variant="success"
                :disabled="isViewMode"
              />
            </div>
          </div>

          <div v-if="filteredGroups.length === 0" class="admin-role-modal__empty">
            {{ $t('ADMIN_ROLES_MODAL_NO_CATEGORIES') }}
          </div>
        </div>
      </div>
    </div>

    <template #footer>
      <AppButton variant="secondary" size="medium" @click="isOpen = false">
        {{ isViewMode ? $t('ADMIN_ROLES_MODAL_CLOSE') : $t('ADMIN_ROLES_MODAL_CANCEL') }}
      </AppButton>
      <AppButton v-if="!isViewMode" size="medium" @click="handleSave">
        {{ mode === 'create' ? $t('ADMIN_ROLES_CREATE') : $t('ADMIN_ROLES_MODAL_SAVE') }}
      </AppButton>
    </template>
  </AppModal>
</template>

<script setup lang="ts">
import type { IRole, IRoleFormData, IRolePermissionGroup, RoleModalMode } from '../domain'

const { t } = useI18n()

interface Props {
  modelValue: boolean
  mode: RoleModalMode
  role?: IRole | null
}

const props = withDefaults(defineProps<Props>(), {
  role: null,
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  save: [data: IRoleFormData]
  closed: []
}>()

const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})

const isViewMode = computed(() => props.mode === 'view')

const modalTitle = computed(() => {
  switch (props.mode) {
    case 'create': return t('ADMIN_ROLES_MODAL_CREATE_TITLE')
    case 'edit': return t('ADMIN_ROLES_MODAL_EDIT_TITLE')
    case 'view': return t('ADMIN_ROLES_MODAL_VIEW_TITLE')
    default: return ''
  }
})

const modalDescription = computed(() => {
  switch (props.mode) {
    case 'create': return t('ADMIN_ROLES_MODAL_CREATE_DESC')
    case 'edit': return t('ADMIN_ROLES_MODAL_EDIT_DESC')
    case 'view': return t('ADMIN_ROLES_MODAL_VIEW_DESC')
    default: return ''
  }
})

const colorOptions = [
  '#E50914',
  '#22C55E',
  '#3B82F6',
  '#A855F7',
  '#FBBF24',
  '#EF4444',
  '#6B7280',
  '#EC4899',
]

const iconOptions = computed(() => [
  { title: t('ADMIN_ROLES_ICON_SHIELD'), value: 'shield' },
  { title: t('ADMIN_ROLES_ICON_EDIT'), value: 'pen-square' },
  { title: t('ADMIN_ROLES_ICON_PROTECT'), value: 'shield-check' },
  { title: t('ADMIN_ROLES_ICON_VIEW'), value: 'eye' },
])

const getDefaultPermissionGroups = (): IRolePermissionGroup[] => [
  {
    title: t('ADMIN_ROLES_PERM_CONTENT'),
    permissions: [
      { key: 'content.create', label: t('ADMIN_ROLES_PERM_CREATE'), enabled: false },
      { key: 'content.edit', label: t('ADMIN_ROLES_PERM_EDIT'), enabled: false },
      { key: 'content.delete', label: t('ADMIN_ROLES_PERM_DELETE'), enabled: false },
      { key: 'content.publish', label: t('ADMIN_ROLES_PERM_PUBLISH'), enabled: false },
    ],
  },
  {
    title: t('ADMIN_ROLES_PERM_USERS'),
    permissions: [
      { key: 'users.view', label: t('ADMIN_ROLES_PERM_VIEW'), enabled: false },
      { key: 'users.edit', label: t('ADMIN_ROLES_PERM_EDIT'), enabled: false },
      { key: 'users.block', label: t('ADMIN_ROLES_PERM_BLOCK'), enabled: false },
      { key: 'users.delete', label: t('ADMIN_ROLES_PERM_DELETE'), enabled: false },
    ],
  },
  {
    title: t('ADMIN_ROLES_PERM_COMMENTS'),
    permissions: [
      { key: 'comments.view', label: t('ADMIN_ROLES_PERM_VIEW'), enabled: false },
      { key: 'comments.moderate', label: t('ADMIN_ROLES_PERM_MODERATE'), enabled: false },
      { key: 'comments.delete', label: t('ADMIN_ROLES_PERM_DELETE'), enabled: false },
    ],
  },
  {
    title: t('ADMIN_ROLES_PERM_GENRES'),
    permissions: [
      { key: 'genres.create', label: t('ADMIN_ROLES_PERM_CREATE'), enabled: false },
      { key: 'genres.edit', label: t('ADMIN_ROLES_PERM_EDIT'), enabled: false },
      { key: 'genres.delete', label: t('ADMIN_ROLES_PERM_DELETE'), enabled: false },
    ],
  },
  {
    title: t('ADMIN_ROLES_PERM_FINANCE'),
    permissions: [
      { key: 'finance.subscriptions', label: t('ADMIN_ROLES_PERM_SUBSCRIPTIONS'), enabled: false },
      { key: 'finance.payments', label: t('ADMIN_ROLES_PERM_PAYMENTS'), enabled: false },
      { key: 'finance.reports', label: t('ADMIN_ROLES_PERM_REPORTS'), enabled: false },
    ],
  },
  {
    title: t('ADMIN_ROLES_PERM_SYSTEM'),
    permissions: [
      { key: 'system.roles', label: t('ADMIN_ROLES_PERM_ROLES'), enabled: false },
      { key: 'system.admins', label: t('ADMIN_ROLES_PERM_ADMINS'), enabled: false },
      { key: 'system.settings', label: t('ADMIN_ROLES_PERM_SETTINGS'), enabled: false },
    ],
  },
]

const form = reactive<IRoleFormData>({
  name: '',
  description: '',
  color: '#E50914',
  icon: 'shield',
  permissionGroups: [],
})

const resetForm = () => {
  form.name = ''
  form.description = ''
  form.color = '#E50914'
  form.icon = 'shield'
  form.permissionGroups = JSON.parse(JSON.stringify(getDefaultPermissionGroups()))
}

const loadRole = (role: IRole) => {
  form.name = role.name
  form.description = role.description
  form.color = role.color
  form.icon = role.icon
  form.permissionGroups = JSON.parse(JSON.stringify(role.permissionGroups))
}

watch(() => props.modelValue, (open) => {
  if (open) {
    searchQuery.value = ''
    if (props.role && (props.mode === 'edit' || props.mode === 'view')) {
      loadRole(props.role)
    } else {
      resetForm()
    }
  }
})

const searchQuery = ref('')

const filteredGroups = computed(() => {
  if (!searchQuery.value.trim()) return form.permissionGroups
  const query = searchQuery.value.toLowerCase().trim()
  return form.permissionGroups.filter((group) =>
    group.title.toLowerCase().includes(query) ||
    group.permissions.some((p) => p.label.toLowerCase().includes(query))
  )
})

const isGroupAllEnabled = (group: IRolePermissionGroup) => {
  return group.permissions.every((p) => p.enabled)
}

const toggleGroup = (group: IRolePermissionGroup) => {
  const allEnabled = isGroupAllEnabled(group)
  group.permissions.forEach((p) => {
    p.enabled = !allEnabled
  })
}

const handleSave = () => {
  emit('save', { ...toRaw(form), permissionGroups: JSON.parse(JSON.stringify(form.permissionGroups)) })
  isOpen.value = false
}

const handleClosed = () => {
  emit('closed')
}
</script>

<style lang="scss" scoped>
.admin-role-modal {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);

  &__fields {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
  }

  &__row {
    display: flex;
    gap: var(--spacing-md);

    > * {
      flex: 1;
    }
  }

  &__color {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-xs);
  }

  &__label {
    @include FluidFontLabel;
    color: var(--color-text-secondary);
  }

  &__colors {
    display: flex;
    gap: var(--spacing-xs);
  }

  &__color-btn {
    border: 2px solid transparent;
    border-radius: var(--radius-sm);
    cursor: pointer;
    height: fluid(32px, 40px);
    outline: 3px solid transparent;
    transition: all 0.3s ease;
    width: fluid(32px, 40px);

    &:hover:not(:disabled) {
      outline: 3px solid var(--color-white);
    }

    &:disabled {
      cursor: default;
    }

    &--active {
      border-color: var(--color-white);
    }
  }

  &__divider {
    background: var(--color-border);
    height: 1px;
  }

  &__permissions {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
  }

  &__permissions-header {
    align-items: center;
    display: flex;
    gap: var(--spacing-md);
    justify-content: space-between;
  }

  &__section-title {
    @include FluidFontBodyMd;
    color: var(--color-white);
    flex-shrink: 0;
    font-weight: 600;
  }

  &__groups {
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    display: flex;
    flex-direction: column;
    max-height: fluid(340px, 500px);
    overflow-y: auto;
  }

  &__group {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-sm);
    padding: var(--spacing-md) var(--spacing-lg);

    &:not(:last-child) {
      border-bottom: 1px solid var(--color-border);
    }
  }

  &__group-header {
    align-items: center;
    display: flex;
    gap: var(--spacing-md);
    justify-content: space-between;
  }

  &__group-title {
    @include FluidFontCaption;
    color: var(--color-text-tertiary);
    letter-spacing: 0.5px;
    text-transform: uppercase;
  }

  &__toggle-all {
    @include FluidFontCaption;
    background: none;
    border: none;
    color: var(--color-info);
    cursor: pointer;
    padding: 0;
    transition: color 0.2s ease;

    &:hover {
      color: var(--color-white);
    }
  }

  &__group-list {
    display: grid;
    gap: var(--spacing-xs) var(--spacing-lg);
    grid-template-columns: repeat(2, 1fr);
  }

  &__empty {
    @include FluidFontBodySm;
    color: var(--color-text-tertiary);
    padding: var(--spacing-xl);
    text-align: center;
  }
}
</style>
