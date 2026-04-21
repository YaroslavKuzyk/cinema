<template>
  <div class="app-table" :class="{ 'app-table--has-pagination': $slots.pagination }">
    <div class="app-table__wrapper">
      <table class="app-table__table">
        <thead class="app-table__head">
          <tr class="app-table__row app-table__row--header">
            <th v-if="props.selectable" class="app-table__cell app-table__cell--checkbox">
              <AppCheckbox
                :model-value="isAllSelected"
                @update:model-value="toggleSelectAll"
              />
            </th>
            <th
              v-for="column in props.columns"
              :key="column.key"
              class="app-table__cell app-table__cell--header"
              :class="[
                `app-table__cell--${column.align || 'left'}`,
                { 'app-table__cell--sortable': column.sortable },
                { 'app-table__cell--sorted': props.sortBy?.key === column.key },
              ]"
              :style="{ width: column.width }"
              @click="column.sortable ? handleSort(column.key) : undefined"
            >
              <span class="app-table__header-content">
                {{ column.label }}
                <span v-if="column.sortable" class="app-table__sort-icon">
                  <ArrowUpDown v-if="props.sortBy?.key !== column.key" :size="14" />
                  <ArrowUp v-else-if="props.sortBy?.direction === 'asc'" :size="14" />
                  <ArrowDown v-else :size="14" />
                </span>
              </span>
            </th>
          </tr>
        </thead>
        <tbody class="app-table__body">
          <tr
            v-for="(row, index) in props.data"
            :key="getRowKey(row, index)"
            class="app-table__row"
            :class="{ 'app-table__row--selected': isRowSelected(row, index) }"
          >
            <td v-if="props.selectable" class="app-table__cell app-table__cell--checkbox">
              <AppCheckbox
                :model-value="isRowSelected(row, index)"
                @update:model-value="toggleRowSelection(row, index)"
              />
            </td>
            <td
              v-for="column in props.columns"
              :key="column.key"
              class="app-table__cell"
              :class="[`app-table__cell--${column.align || 'left'}`]"
            >
              <div class="app-table__cell-content" :class="[`app-table__cell-content--${column.align || 'left'}`]">
                <slot :name="`cell-${column.key}`" :row="row" :value="row[column.key]" :index="index">
                  {{ row[column.key] }}
                </slot>
              </div>
            </td>
          </tr>
          <tr v-if="props.data.length === 0" class="app-table__row app-table__row--empty">
            <td
              :colspan="props.selectable ? props.columns.length + 1 : props.columns.length"
              class="app-table__cell app-table__cell--empty"
            >
              {{ props.emptyText }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="$slots.pagination" class="app-table__pagination">
      <slot name="pagination" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IProps, ISortState } from "./index.types";
import AppCheckbox from "../AppCheckbox/index.vue";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-vue-next";

const props = withDefaults(defineProps<IProps>(), {
  selectable: false,
  selectedRows: () => [],
  rowKey: "id",
  loading: false,
  emptyText: "Немає даних",
  sortBy: null,
});

const emit = defineEmits<{
  "update:selectedRows": [value: (string | number)[]];
  "update:sortBy": [value: ISortState];
}>();

const handleSort = (key: string) => {
  if (props.sortBy?.key === key) {
    const nextDirection = props.sortBy.direction === 'asc' ? 'desc' : 'asc';
    emit("update:sortBy", { key, direction: nextDirection });
  } else {
    emit("update:sortBy", { key, direction: 'asc' });
  }
};

const getRowKey = (row: Record<string, unknown>, index: number): string | number => {
  return (row[props.rowKey] as string | number) ?? index;
};

const isRowSelected = (row: Record<string, unknown>, index: number): boolean => {
  const key = getRowKey(row, index);
  return props.selectedRows.includes(key as never);
};

const isAllSelected = computed(() => {
  if (props.data.length === 0) return false;
  return props.data.every((row, index) => isRowSelected(row, index));
});

const toggleRowSelection = (row: Record<string, unknown>, index: number) => {
  const key = getRowKey(row, index);
  const newSelection = isRowSelected(row, index)
    ? props.selectedRows.filter((k) => k !== key)
    : [...props.selectedRows, key];
  emit("update:selectedRows", newSelection as (string | number)[]);
};

const toggleSelectAll = () => {
  if (isAllSelected.value) {
    emit("update:selectedRows", []);
  } else {
    const allKeys = props.data.map((row, index) => getRowKey(row, index));
    emit("update:selectedRows", allKeys);
  }
};
</script>

<style lang="scss" scoped>
.app-table {
  width: 100%;

  &--has-pagination &__wrapper {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }

  &__wrapper {
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    max-height: 70vh;
    overflow: auto;

    &::-webkit-scrollbar {
      height: 6px;
      width: 6px;
    }

    &::-webkit-scrollbar-track {
      background: transparent;
    }

    &::-webkit-scrollbar-thumb {
      background: var(--color-white-15);
      border-radius: var(--radius-full);

      &:hover {
        background: var(--color-white-20);
      }
    }
  }

  &__table {
    border-collapse: collapse;
    min-width: 100%;
    width: 100%;
  }

  &__head {
    background: var(--color-surface-alt);
    position: sticky;
    top: 0;
    z-index: 2;
  }

  &__row {
    border-bottom: 1px solid var(--color-border);
    transition: background-color 0.2s ease;

    &:last-child {
      border-bottom: none;
    }

    &--header {
      border-bottom: 1px solid var(--color-border);
    }

    &--selected {
      background: var(--color-active-bg);
    }

    &:not(&--header, &--empty):hover {
      background: var(--color-background-hover);
    }
  }

  &__cell {
    @include FluidFontCaption;
    color: var(--color-text-primary);
    padding: var(--spacing-sm) var(--spacing-md);
    vertical-align: middle;
    white-space: nowrap;

    &--header {
      @include FluidFontCaption;
      color: var(--color-text-secondary);
      font-weight: 600;
      letter-spacing: fluid(0.5px, 1px);
      text-transform: uppercase;
    }

    &--sortable {
      cursor: pointer;
      user-select: none;

      &:hover {
        color: var(--color-text-primary);
      }
    }

    &--sorted {
      color: var(--color-white);
    }

    &--checkbox {
      padding-left: var(--spacing-md);
      padding-right: 0;
      width: var(--spacing-3xl);
    }

    &--left {
      text-align: left;

      .app-table__header-content {
        justify-content: flex-start;
      }
    }

    &--center {
      text-align: center;

      .app-table__header-content {
        justify-content: center;
      }
    }

    &--right {
      text-align: right;

      .app-table__header-content {
        justify-content: flex-end;
      }
    }

    &--empty {
      color: var(--color-text-secondary);
      padding: var(--spacing-3xl) var(--spacing-md);
      text-align: center;
    }
  }

  &__cell-content {
    align-items: center;
    display: flex;

    &--left {
      justify-content: flex-start;
    }

    &--center {
      justify-content: center;
    }

    &--right {
      justify-content: flex-end;
    }
  }

  &__header-content {
    align-items: center;
    display: flex;
    gap: var(--spacing-2xs);
  }

  &__sort-icon {
    color: var(--color-text-tertiary);
    display: flex;
  }

  &__pagination {
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: 0 0 var(--radius-md) var(--radius-md);
    border-top: none;
    padding: var(--spacing-sm) var(--spacing-md);
  }
}
</style>
