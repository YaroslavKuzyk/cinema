<template>
  <div class="admin-role-card">
    <div class="admin-role-card__header">
      <div class="admin-role-card__info">
        <div
          class="admin-role-card__icon"
          :style="{ background: role.color }"
        >
          <component :is="roleIcon" :size="20" />
        </div>
        <div class="admin-role-card__title">
          <div class="admin-role-card__name-row">
            <h3>{{ role.name }}</h3>
            <AppBadge v-if="role.isSystem" variant="basic" read-only>
              {{ $t('ADMIN_ROLES_SYSTEM') }}
            </AppBadge>
          </div>
          <p>{{ role.description }}</p>
        </div>
      </div>
      <div class="admin-role-card__actions">
        <div class="admin-role-card__admins">
          <div
            v-for="admin in role.admins"
            :key="admin.id"
            class="admin-role-card__admin-avatar"
            :style="{ background: admin.color }"
          >
            {{ admin.initials }}
          </div>
        </div>
        <span class="admin-role-card__admin-count">
          {{ $t('ADMIN_ROLES_ADMIN_COUNT', role.admins.length) }}
        </span>
        <div class="admin-role-card__buttons">
          <button
            v-if="!role.isSystem"
            class="admin-role-card__btn"
            :title="$t('ADMIN_ROLES_EDIT')"
            @click="$emit('edit', role.id)"
          >
            <SquarePen :size="16" />
          </button>
          <button
            class="admin-role-card__btn"
            :title="$t('ADMIN_ROLES_VIEW')"
            @click="$emit('view', role.id)"
          >
            <Eye :size="16" />
          </button>
          <button
            v-if="!role.isSystem"
            class="admin-role-card__btn"
            :title="$t('ADMIN_ROLES_DUPLICATE')"
            @click="$emit('duplicate', role.id)"
          >
            <Copy :size="16" />
          </button>
          <button
            v-if="!role.isSystem"
            class="admin-role-card__btn admin-role-card__btn--danger"
            :title="$t('ADMIN_ROLES_DELETE')"
            @click="$emit('delete', role.id)"
          >
            <Trash2 :size="16" />
          </button>
        </div>
      </div>
    </div>

    <AdminRolePermissions :permission-groups="role.permissionGroups" />
  </div>
</template>

<script setup lang="ts">
import { Shield, SquarePen, Eye, Copy, Trash2, ShieldCheck, PenSquare } from 'lucide-vue-next'
import type { IRole } from '../domain'
import AdminRolePermissions from './AdminRolePermissions.vue'

const props = defineProps<{
  role: IRole
}>()

defineEmits<{
  edit: [id: string]
  view: [id: string]
  duplicate: [id: string]
  delete: [id: string]
}>()

const roleIcon = computed(() => {
  switch (props.role.icon) {
    case 'shield': return Shield
    case 'pen-square': return PenSquare
    case 'shield-check': return ShieldCheck
    case 'eye': return Eye
    default: return Shield
  }
})
</script>

<style lang="scss" scoped>
.admin-role-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  padding: var(--spacing-lg);

  &__header {
    align-items: center;
    display: flex;
    justify-content: space-between;
  }

  &__info {
    align-items: center;
    display: flex;
    gap: var(--spacing-md);
  }

  &__icon {
    align-items: center;
    border-radius: var(--radius-md);
    color: var(--color-white);
    display: flex;
    flex-shrink: 0;
    height: fluid(40px, 52px);
    justify-content: center;
    width: fluid(40px, 52px);
  }

  &__title {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-3xs);
  }

  &__name-row {
    align-items: center;
    display: flex;
    gap: var(--spacing-sm);

    h3 {
      @include FluidFontH3;

      color: var(--color-white);

    }
  }

  &__title p {
    @include FluidFontBodySm;

    color: var(--color-text-secondary);

  }

  &__actions {
    align-items: center;
    display: flex;
    gap: var(--spacing-md);
  }

  &__admins {

    display: flex;

    margin-right: calc(-1 * var(--spacing-xs));

  }

  &__admin-avatar {
    @include FluidFontCaption;
    align-items: center;
    border: 2px solid var(--color-surface);
    border-radius: var(--radius-sm);
    color: var(--color-white);
    display: flex;
    font-weight: 700;
    height: fluid(28px, 36px);
    justify-content: center;
    margin-right: calc(-1 * var(--spacing-2xs));
    width: fluid(28px, 36px);
  }

  &__admin-count {
    @include FluidFontBodySm;
    color: var(--color-text-secondary);
    white-space: nowrap;
  }

  &__buttons {

    display: flex;

    gap: var(--spacing-xs);

  }

  &__btn {
    align-items: center;
    background: var(--color-white-10);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-sm);
    color: var(--color-text-secondary);
    cursor: pointer;
    display: flex;
    height: fluid(32px, 40px);
    justify-content: center;
    outline: 3px solid transparent;
    transition: all 0.3s ease;
    width: fluid(32px, 40px);

    &:hover {

      color: var(--color-white);

      outline: 3px solid var(--color-white);

    }

    &--danger:hover {

      color: var(--color-primary);

      outline-color: var(--color-primary);

    }
  }
}
</style>
