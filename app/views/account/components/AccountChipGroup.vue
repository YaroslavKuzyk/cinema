<template>
  <div class="account-chip-group">
    <AppBadge
      v-for="opt in options"
      :key="String(opt.value)"
      :variant="modelValue === opt.value ? 'primary' : 'basic'"
      :read-only="false"
      @click="emit('update:modelValue', opt.value)"
    >
      {{ opt.label }}
    </AppBadge>
  </div>
</template>

<script setup lang="ts" generic="T extends string | number">
defineProps<{
  modelValue: T
  options: Array<{ value: T, label: string }>
}>()

const emit = defineEmits<{ 'update:modelValue': [value: T] }>()
</script>

<style lang="scss" scoped>
.account-chip-group {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-2xs);

  :deep(.app-badge) {
    @include FluidFontBodySm;
    border-radius: var(--radius-full);
    font-weight: 600;
    padding: var(--spacing-2xs) var(--spacing-base);
  }
}
</style>
