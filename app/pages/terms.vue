<template>
  <div class="terms-page">
    <div class="terms-page__container">
      <h1 class="terms-page__title">{{ $t("TERMS_OF_SERVICE") }}</h1>
      <p class="terms-page__placeholder">{{ $t("PAGE_IN_DEVELOPMENT") }}</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.terms-page {
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
