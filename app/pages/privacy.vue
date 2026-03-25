<template>
  <div class="privacy-page">
    <div class="privacy-page__container">
      <h1 class="privacy-page__title">{{ $t("PRIVACY_POLICY") }}</h1>
      <p class="privacy-page__placeholder">{{ $t("PAGE_IN_DEVELOPMENT") }}</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.privacy-page {
  align-items: center;
  display: flex;
  justify-content: center;
  min-height: 100svh;
  padding: var(--spacing-lg);

  &__container {
    max-width: var(--container-md);
    text-align: center;
  }

  &__title {
    @include FluidFontH2;
    color: var(--color-white);
    margin-bottom: var(--spacing-md);
  }

  &__placeholder {
    @include FluidFontBodyMd;
    color: var(--color-text-secondary);
  }
}
</style>
