<template>
  <div class="admin-roles-header">
    <div class="admin-roles-header__text">
      <h1>{{ $t('ADMIN_ROLES_TITLE') }}</h1>
      <p>{{ $t('ADMIN_ROLES_SUBTITLE') }}</p>
    </div>
    <AppButton size="medium" :icon-left="Plus" @click="$emit('create')">
      {{ $t('ADMIN_ROLES_CREATE') }}
    </AppButton>
  </div>
</template>

<script setup lang="ts">
import { Plus } from 'lucide-vue-next'

defineEmits<{
  create: []
}>()
</script>

<style lang="scss" scoped>
.admin-roles-header {
  align-items: center;
  display: flex;
  justify-content: space-between;
  padding-bottom: var(--spacing-lg);

  &__text {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-2xs);

    h1 {
      @include FluidFontH2;

      color: var(--color-white);

    }

    p {
      @include FluidFontBodySm;

      color: var(--color-text-secondary);

    }
  }
}
</style>
