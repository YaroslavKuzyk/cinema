<template>
  <button class="admin-roles-create-button" @click="$emit('create')">
    <Plus :size="18" />
    <span>{{ $t('ADMIN_ROLES_CREATE_NEW') }}</span>
  </button>
</template>

<script setup lang="ts">
import { Plus } from 'lucide-vue-next'

defineEmits<{
  create: []
}>()
</script>

<style lang="scss" scoped>
.admin-roles-create-button {
  @include FluidFontBodyMd;
  align-items: center;
  background: transparent;
  border: 1px dashed var(--color-border);
  border-radius: var(--radius-xl);
  color: var(--color-text-secondary);
  cursor: pointer;
  display: flex;
  gap: var(--spacing-xs);
  justify-content: center;
  outline: 3px solid transparent;
  padding: var(--spacing-lg);
  transition: all 0.3s ease;
  width: 100%;

  &:hover {
    border-color: var(--color-text-secondary);
    color: var(--color-white);
    outline: 3px solid var(--color-white);
  }
}
</style>
