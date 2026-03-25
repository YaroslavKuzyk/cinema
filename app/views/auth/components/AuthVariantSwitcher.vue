<template>
  <div class="auth-variant-switcher">
    <AppButton
      v-for="option in options"
      :key="option.value"
      :variant="modelValue === option.value ? activeVariant : 'ghost'"
      size="small"
      @click="$emit('update:modelValue', option.value)"
    >
      {{ option.label }}
    </AppButton>
  </div>
</template>

<script setup lang="ts">
interface Option {
  value: string;
  label: string;
}

interface Props {
  modelValue: string;
  options: Option[];
  activeVariant?: "primary" | "secondary";
}

withDefaults(defineProps<Props>(), {
  activeVariant: "secondary",
});
defineEmits<{
  "update:modelValue": [value: string];
}>();
</script>

<style lang="scss" scoped>
.auth-variant-switcher {
  background: var(--color-background-hover);
  border-radius: var(--radius-lg);
  display: flex;
  margin-bottom: var(--spacing-lg);
  padding: 4px;

  .app-button {
    flex: 1;
  }
}
</style>
