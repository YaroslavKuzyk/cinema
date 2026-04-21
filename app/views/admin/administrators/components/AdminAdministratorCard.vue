<template>
  <div class="admin-card">
    <div class="admin-card__header">
      <div class="admin-card__avatar-wrapper">
        <AppAvatar :initials="admin.initials" :color="admin.avatarColor" />
        <span
          class="admin-card__status-dot"
          :class="`admin-card__status-dot--${admin.status}`"
        />
      </div>
      <div class="admin-card__identity">
        <span class="admin-card__name">{{ admin.firstName }} {{ admin.lastName }}</span>
        <span class="admin-card__email">{{ admin.email }}</span>
      </div>
    </div>

    <div class="admin-card__role">
      <AppBadge :variant="admin.roleBadgeVariant">
        <span class="admin-card__role-content">
          <component :is="roleIconComponent" :size="14" />
          {{ admin.role }}
        </span>
      </AppBadge>
    </div>

    <div class="admin-card__info">
      <div class="admin-card__info-row">
        <span class="admin-card__info-label">{{ $t('ADMIN_ADMINS_LAST_LOGIN') }}</span>
        <span
          class="admin-card__info-value"
          :class="{ 'admin-card__info-value--online': admin.status === 'online' }"
        >
          {{ admin.status === 'online' ? $t('ADMIN_ADMINS_NOW_ONLINE') : admin.lastLogin }}
        </span>
      </div>
      <div class="admin-card__info-row">
        <span class="admin-card__info-label">{{ $t('ADMIN_ADMINS_CREATED_AT') }}</span>
        <span class="admin-card__info-value">{{ admin.createdAt }}</span>
      </div>
      <div class="admin-card__info-row">
        <span class="admin-card__info-label">{{ $t('ADMIN_ADMINS_ACTIONS_TODAY') }}</span>
        <span class="admin-card__info-value">{{ admin.actionsToday }}</span>
      </div>
    </div>

    <div class="admin-card__permissions">
      <AppBadge
        v-for="tag in admin.permissionTags"
        :key="tag.key"
        :variant="tag.active ? 'success' : 'basic'"
        read-only
      >
        {{ tag.label }}
      </AppBadge>
    </div>

    <div class="admin-card__footer">
      <AppButton variant="secondary" size="small" :icon-left="SquarePen" :title="$t('ADMIN_ADMINS_EDIT')" @click="$emit('edit', admin.id)" />
      <AppButton variant="info" size="small" :icon-left="Activity" :title="$t('ADMIN_ADMINS_ACTIVITY')" @click="$emit('activity', admin.id)" />
      <AppButton
        v-if="!isSuperAdmin"
        variant="error"
        size="small"
        :icon-left="ShieldOff"
        :title="$t('ADMIN_ADMINS_DISABLE')"
        @click="$emit('disable', admin.id)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Shield, ShieldCheck, PenSquare, Eye, SquarePen, Activity, ShieldOff } from 'lucide-vue-next'
import type { IAdmin } from '../domain'

const props = defineProps<{
  admin: IAdmin
}>()

defineEmits<{
  edit: [id: string]
  activity: [id: string]
  disable: [id: string]
}>()

const isSuperAdmin = computed(() => props.admin.role === 'Super Admin')

const roleIconComponent = computed(() => {
  switch (props.admin.roleIcon) {
    case 'shield': return Shield
    case 'shield-check': return ShieldCheck
    case 'pen-square': return PenSquare
    case 'eye': return Eye
    default: return Shield
  }
})
</script>

<style lang="scss" scoped>
.admin-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  padding: var(--spacing-lg);

  &__header {
    align-items: center;
    display: flex;
    gap: var(--spacing-md);
  }

  &__avatar-wrapper {

    flex-shrink: 0;

    position: relative;

  }

  &__status-dot {
    border: 2px solid var(--color-surface);
    border-radius: var(--radius-full);
    bottom: -1px;
    height: 12px;
    position: absolute;
    right: -1px;
    width: 12px;

    &--online {
      background: var(--color-success);
    }

    &--away {
      background: var(--color-warning);
    }

    &--offline {

      background: var(--color-text-tertiary);

      };

    }

  &__identity {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-3xs);
    min-width: 0;
  }

  &__name {
    @include FluidFontBodyMd;
    color: var(--color-white);
    font-weight: 600;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &__email {
    @include FluidFontCaption;
    color: var(--color-text-secondary);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &__role {
    display: flex;
  }

  &__role-content {
    align-items: center;
    display: flex;
    gap: var(--spacing-2xs);
  }

  &__info {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-xs);
  }

  &__info-row {
    align-items: center;
    display: flex;
    justify-content: space-between;
  }

  &__info-label {
    @include FluidFontCaption;

    color: var(--color-text-tertiary);

  }

  &__info-value {
    @include FluidFontCaption;
    color: var(--color-text-secondary);

    &--online {

      color: var(--color-success);

      font-weight: 600;

    }
  }

  &__permissions {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-xs);
  }

  &__footer {
    border-top: 1px solid var(--color-border);
    display: flex;
    gap: var(--spacing-xs);
    justify-content: flex-end;
    padding-top: var(--spacing-md);
  }
}
</style>
