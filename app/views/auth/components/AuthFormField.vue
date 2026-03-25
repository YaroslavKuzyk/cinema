<template>
  <div class="auth-form-field">
    <label v-if="label" class="auth-form-field__label">{{ label }}</label>
    <div class="auth-form-field__content">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  label?: string;
}

withDefaults(defineProps<Props>(), {
  label: "",
});
</script>

<style lang="scss" scoped>
.auth-form-field {
  margin-bottom: var(--spacing-md);

  &__label {
    @include FluidFontLabel;
    color: var(--color-text-secondary);
    display: block;
    margin-bottom: var(--spacing-xs);
  }

  &__content {
    display: flex;
    gap: var(--spacing-xs);
  }
}
</style>
