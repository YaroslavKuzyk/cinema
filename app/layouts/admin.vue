<template>
  <div class="admin-layout">
    <div class="admin-layout__sidebar"></div>
    <div class="admin-layout__content">
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.admin-layout {
  min-height: 100vh;
  display: flex;

  &__sidebar {
    width: var(--container-xs);
    background-color: var(--color-sidebar);
    border-right: 1px solid var(--color-border);
  }

  &__content {
    flex: 1;
    padding: var(--spacing-xl);
  }
}
</style>
