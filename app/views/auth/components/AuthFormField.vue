<template>
  <div class="auth-form-field">
    <label v-if="label" class="auth-form-field__label">{{ label }}</label>
    <div class="auth-form-field__content" :class="{ 'auth-form-field__content--stretch': stretch }">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  label?: string;
  stretch?: boolean;
}

withDefaults(defineProps<Props>(), {
  label: "",
  stretch: false,
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

    &--stretch > :deep(*) {
      flex: 1;
    }
  }
}
</style>
