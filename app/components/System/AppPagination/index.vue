<template>
  <div class="app-pagination">
    <span class="app-pagination__info">
      Показано {{ startItem }}-{{ endItem }} з {{ formatNumber(props.totalItems) }}
    </span>

    <div class="app-pagination__controls">
      <button
        class="app-pagination__button"
        :disabled="props.currentPage === 1"
        @click="goToPage(props.currentPage - 1)"
      >
        <ChevronLeft :size="16" />
      </button>

      <template v-for="page in visiblePages" :key="page">
        <button
          v-if="page !== '...'"
          class="app-pagination__button"
          :class="{ 'app-pagination__button--active': page === props.currentPage }"
          @click="goToPage(page as number)"
        >
          {{ page }}
        </button>
        <span v-else class="app-pagination__ellipsis">...</span>
      </template>

      <button
        class="app-pagination__button"
        :disabled="props.currentPage === totalPages"
        @click="goToPage(props.currentPage + 1)"
      >
        <ChevronRight :size="16" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IProps } from "./index.types";
import { ChevronLeft, ChevronRight } from "lucide-vue-next";

const props = withDefaults(defineProps<IProps>(), {
  itemsPerPage: 10,
  maxVisiblePages: 5,
});

const emit = defineEmits<{
  "update:currentPage": [value: number];
}>();

const totalPages = computed(() => Math.ceil(props.totalItems / props.itemsPerPage));

const startItem = computed(() => (props.currentPage - 1) * props.itemsPerPage + 1);

const endItem = computed(() =>
  Math.min(props.currentPage * props.itemsPerPage, props.totalItems)
);

const visiblePages = computed(() => {
  const pages: (number | string)[] = [];
  const total = totalPages.value;
  const current = props.currentPage;
  const maxVisible = props.maxVisiblePages;

  if (total <= maxVisible + 2) {
    for (let i = 1; i <= total; i++) {
      pages.push(i);
    }
  } else {
    pages.push(1);

    if (current <= 3) {
      for (let i = 2; i <= Math.min(maxVisible, total - 1); i++) {
        pages.push(i);
      }
      pages.push("...");
    } else if (current >= total - 2) {
      pages.push("...");
      for (let i = total - maxVisible + 1; i < total; i++) {
        pages.push(i);
      }
    } else {
      pages.push("...");
      for (let i = current - 1; i <= current + 1; i++) {
        pages.push(i);
      }
      pages.push("...");
    }

    pages.push(total);
  }

  return pages;
});

const formatNumber = (num: number): string => {
  return num.toLocaleString("uk-UA");
};

const goToPage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    emit("update:currentPage", page);
  }
};
</script>

<style lang="scss" scoped>
.app-pagination {
  align-items: center;
  display: flex;
  justify-content: space-between;

  &__info {
    @include FluidFontCaption;
    color: var(--color-text-secondary);
  }

  &__controls {
    align-items: center;
    display: flex;
    gap: var(--spacing-2xs);
  }

  &__button {
    @include FluidFontCaption;
    align-items: center;
    background: transparent;
    border: 1px solid var(--color-border);
    border-radius: var(--radius-xs);
    color: var(--color-text-secondary);
    cursor: pointer;
    display: flex;
    height: var(--spacing-xl);
    justify-content: center;
    min-width: var(--spacing-xl);
    padding: 0 var(--spacing-xs);
    transition: all 0.2s ease;

    &:hover:not(:disabled, &--active) {
      background: var(--color-background-hover);
      color: var(--color-text-primary);
    }

    &:disabled {
      cursor: default;
      opacity: 0.4;
    }

    &--active {
      background: var(--color-primary);
      border-color: var(--color-primary);
      color: var(--color-white);
    }
  }

  &__ellipsis {
    color: var(--color-text-secondary);
    padding: 0 var(--spacing-xs);
  }
}
</style>
