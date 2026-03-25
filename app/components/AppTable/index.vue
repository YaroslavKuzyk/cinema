<template>
  <div class="app-table">
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
              :class="[`app-table__cell--${column.align || 'left'}`]"
              :style="{ width: column.width }"
            >
              {{ column.label }}
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
              <slot :name="`cell-${column.key}`" :row="row" :value="row[column.key]" :index="index">
                {{ row[column.key] }}
              </slot>
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
import type { IProps } from "./index.types";
import AppCheckbox from "../AppCheckbox/index.vue";

const props = withDefaults(defineProps<IProps>(), {
  selectable: false,
  selectedRows: () => [],
  rowKey: "id",
  loading: false,
  emptyText: "Немає даних",
});

const emit = defineEmits<{
  "update:selectedRows": [value: (string | number)[]];
}>();

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

  &__wrapper {
    background: $surfaceColor;
    border: 1px solid $borderColor;
    border-radius: $radiusMd;
    overflow: hidden;
  }

  &__table {
    border-collapse: collapse;
    width: 100%;
  }

  &__head {
    background: $surfaceAltColor;
  }

  &__row {
    border-bottom: 1px solid $borderColor;
    transition: background-color 0.2s ease;

    &:last-child {
      border-bottom: none;
    }

    &--header {
      border-bottom: 1px solid $borderColor;
    }

    &--selected {
      background: $activeBgColor;
    }

    &:not(&--header, &--empty):hover {
      background: $backgroundHoverColor;
    }
  }

  &__cell {
    color: $textPrimaryColor;
    font-size: 14px;
    padding: 16px 20px;
    vertical-align: middle;

    &--header {
      color: $textSecondaryColor;
      font-size: 12px;
      font-weight: 600;
      letter-spacing: 0.5px;
      text-transform: uppercase;
    }

    &--checkbox {
      padding-left: 20px;
      padding-right: 0;
      width: 56px;
    }

    &--left {
      text-align: left;
    }

    &--center {
      text-align: center;
    }

    &--right {
      text-align: right;
    }

    &--empty {
      color: $textSecondaryColor;
      padding: 48px 20px;
      text-align: center;
    }
  }

  &__pagination {
    margin-top: 16px;
  }
}
</style>
