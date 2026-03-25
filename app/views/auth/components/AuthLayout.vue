<template>
  <div class="auth-layout">
    <AppCard
      class="auth-layout__card"
      :title="$slots.icon ? undefined : title"
      :subtitle="$slots.icon ? undefined : subtitle"
    >
      <template v-if="$slots.icon" #header>
        <div class="auth-layout__centered-header">
          <div class="auth-layout__icon">
            <slot name="icon" />
          </div>
          <h3 v-if="title" class="auth-layout__title">{{ title }}</h3>
          <p v-if="subtitle" class="auth-layout__subtitle">{{ subtitle }}</p>
        </div>
      </template>

      <slot />

      <template v-if="$slots.footer" #footer>
        <div class="auth-layout__footer">
          <slot name="footer" />
        </div>
      </template>
    </AppCard>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title?: string;
  subtitle?: string;
}

defineProps<Props>();
</script>

<style lang="scss" scoped>
.auth-layout {
  align-items: center;
  display: flex;
  justify-content: center;
  min-height: 100svh;
  padding: var(--spacing-lg);

  &__card {
    max-width: var(--container-md);
    width: 100%;
  }

  &__centered-header {
    align-items: center;
    display: flex;
    flex-direction: column;
    text-align: center;
  }

  &__icon {
    align-items: center;
    background: var(--color-primary-bg);
    border: 1px solid var(--color-primary);
    border-radius: var(--radius-full);
    color: var(--color-primary);
    display: flex;
    height: fluid(56px, 72px);
    justify-content: center;
    margin-bottom: var(--spacing-md);
    width: fluid(56px, 72px);
  }

  &__title {
    @include FluidFontH3;
    color: var(--color-white);
    font-weight: 700;
    margin: 0 0 var(--spacing-xs);
  }

  &__subtitle {
    @include FluidFontBodySm;
    color: var(--color-text-secondary);
    margin: 0;
  }

  &__footer {
    @include FluidFontBodyMd;
    align-items: center;
    color: var(--color-text-tertiary);
    display: flex;
    gap: var(--spacing-2xs);
    justify-content: center;
  }
}
</style>
