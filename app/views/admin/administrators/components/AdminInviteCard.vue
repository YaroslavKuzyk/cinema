<template>
  <button class="admin-invite-card" @click="$emit('click')">
    <div class="admin-invite-card__icon">
      <UserPlus :size="24" />
    </div>
    <span class="admin-invite-card__title">{{ $t('ADMIN_ADMINS_INVITE_CTA') }}</span>
    <span class="admin-invite-card__subtitle">{{ $t('ADMIN_ADMINS_INVITE_CTA_DESC') }}</span>
  </button>
</template>

<script setup lang="ts">
import { UserPlus } from 'lucide-vue-next'

defineEmits<{
  click: []
}>()
</script>

<style lang="scss" scoped>
.admin-invite-card {
  align-items: center;
  background: transparent;
  border: 2px dashed var(--color-border);
  border-radius: var(--radius-xl);
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
  justify-content: center;
  min-height: fluid(200px, 260px);
  padding: var(--spacing-lg);
  transition: all 0.3s ease;

  &:hover {

    background: var(--color-white-5);

    border-color: var(--color-text-secondary);

  }

  &__icon {
    align-items: center;
    background: var(--color-white-10);
    border-radius: var(--radius-full);
    color: var(--color-text-secondary);
    display: flex;
    height: fluid(48px, 56px);
    justify-content: center;
    width: fluid(48px, 56px);
  }

  &__title {
    @include FluidFontBodyMd;
    color: var(--color-white);
    font-weight: 600;
  }

  &__subtitle {
    @include FluidFontCaption;
    color: var(--color-text-tertiary);
    text-align: center;
  }
}
</style>
