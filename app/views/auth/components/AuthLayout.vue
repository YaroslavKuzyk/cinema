<template>
  <div class="auth-layout">
    <AppCard class="auth-layout__card" :title="title" :subtitle="subtitle">
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
  title: string;
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
