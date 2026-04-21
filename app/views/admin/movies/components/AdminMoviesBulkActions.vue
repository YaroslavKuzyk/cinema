<template>
  <Transition name="bulk">
    <div v-if="count > 0" class="admin-movies-bulk">
      <span class="admin-movies-bulk__count">{{ count }} {{ $t('ADMIN_MOVIES_BULK_SELECTED') }}</span>
      <AppButton variant="success" size="small" @click="$emit('publish')">{{ $t('ADMIN_MOVIES_BULK_PUBLISH') }}</AppButton>
      <AppButton variant="secondary" size="small" @click="$emit('archive')">{{ $t('ADMIN_MOVIES_BULK_ARCHIVE') }}</AppButton>
      <AppButton variant="error" size="small" @click="$emit('delete')">{{ $t('ADMIN_MOVIES_BULK_DELETE') }}</AppButton>
    </div>
  </Transition>
</template>

<script setup lang="ts">
defineProps<{ count: number }>()
defineEmits<{ publish: []; archive: []; delete: [] }>()
</script>

<style lang="scss" scoped>
.admin-movies-bulk {
  align-items: center;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  display: flex;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm) var(--spacing-lg);

  &__count { @include FluidFontBodySm;
  color: var(--color-white);
  font-weight: 600;
  margin-right: var(--spacing-sm);
  };
}
.bulk-enter-active, .bulk-leave-active { transition: all 0.2s ease; }

.bulk-enter-from, .bulk-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
