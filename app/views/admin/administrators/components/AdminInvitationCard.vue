<template>
  <div class="admin-invitation-card">
    <div class="admin-invitation-card__header">
      <div class="admin-invitation-card__avatar-wrapper">
        <AppAvatar :initials="invitation.initials" :color="invitation.avatarColor" />
      </div>
      <div class="admin-invitation-card__identity">
        <span class="admin-invitation-card__name">{{ invitation.firstName }} {{ invitation.lastName }}</span>
        <span class="admin-invitation-card__email">{{ invitation.email }}</span>
      </div>
    </div>

    <div class="admin-invitation-card__badge">
      <AppBadge variant="warning">
        {{ $t('ADMIN_ADMINS_INVITATION_PENDING') }}
      </AppBadge>
    </div>

    <div class="admin-invitation-card__info">
      <div class="admin-invitation-card__info-row">
        <span class="admin-invitation-card__info-label">{{ $t('ADMIN_ADMINS_INVITED_AT') }}</span>
        <span class="admin-invitation-card__info-value">{{ invitation.invitedAt }}</span>
      </div>
      <div class="admin-invitation-card__info-row">
        <span class="admin-invitation-card__info-label">{{ $t('ADMIN_ADMINS_ROLE') }}</span>
        <span class="admin-invitation-card__info-value">{{ invitation.role }}</span>
      </div>
      <div class="admin-invitation-card__info-row">
        <span class="admin-invitation-card__info-label">{{ $t('ADMIN_ADMINS_EXPIRES_AT') }}</span>
        <span
          class="admin-invitation-card__info-value"
          :class="{ 'admin-invitation-card__info-value--expired': isNearExpiry }"
        >
          {{ invitation.expiresAt }}
        </span>
      </div>
    </div>

    <div class="admin-invitation-card__footer">
      <AppButton variant="info" size="small" :icon-left="Send" :title="$t('ADMIN_ADMINS_RESEND')" @click="$emit('resend', invitation.id)" />
      <AppButton variant="error" size="small" :icon-left="X" :title="$t('ADMIN_ADMINS_CANCEL')" @click="$emit('cancel', invitation.id)" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Send, X } from 'lucide-vue-next'
import type { IAdminInvitation } from '../domain'

const props = defineProps<{
  invitation: IAdminInvitation
}>()

defineEmits<{
  resend: [id: string]
  cancel: [id: string]
}>()

const isNearExpiry = computed(() => {
  const expiryDate = new Date(props.invitation.expiresAt)
  const now = new Date()
  const diffMs = expiryDate.getTime() - now.getTime()
  const diffDays = diffMs / (1000 * 60 * 60 * 24)
  return diffDays <= 3
})
</script>

<style lang="scss" scoped>
.admin-invitation-card {
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

  &__badge {
    display: flex;
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

    &--expired {

      color: var(--color-primary);

      font-weight: 600;

    }
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
