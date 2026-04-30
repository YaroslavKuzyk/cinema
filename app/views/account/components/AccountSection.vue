<template>
  <section class="account-section" :class="{ 'account-section--danger': danger }">
    <header v-if="title" class="account-section__head">
      <h2 class="account-section__title">{{ title }}</h2>
      <p v-if="description" class="account-section__desc">{{ description }}</p>
    </header>

    <div class="account-section__body">
      <slot />
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  title?: string
  description?: string
  danger?: boolean
}>()
</script>

<style lang="scss" scoped>
.account-section {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-base);
  padding: var(--spacing-lg);

  &--danger {
    border-color: rgba(var(--color-danger-rgb, 239, 68, 68), 0.4);
  }

  &__head {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-3xs);
  }

  &__title {
    @include FluidFontBodyLg;
    color: var(--color-white);
    font-weight: 700;
    margin: 0;
  }

  &--danger &__title {
    color: var(--color-danger);
  }

  &__desc {
    @include FluidFontBodySm;
    color: var(--color-text-tertiary);
    margin: 0;
  }

  &__body {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-base);
  }
}
</style>
