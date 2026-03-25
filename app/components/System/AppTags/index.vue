<template>
  <div class="app-tags">
    <div
      v-for="tag in props.modelValue"
      :key="tag.id"
      class="app-tags__tag"
      :class="[`app-tags__tag--${tag.variant || 'basic'}`]"
    >
      <span class="app-tags__label">{{ tag.label }}</span>
      <button
        v-if="!props.readOnly"
        class="app-tags__remove"
        :disabled="props.disabled"
        @click="removeTag(tag.id)"
      >
        <X :size="14" />
      </button>
    </div>

    <button
      v-if="!props.readOnly"
      class="app-tags__add"
      :class="{ 'app-tags__add--disabled': props.disabled }"
      :disabled="props.disabled"
      @click="$emit('add')"
    >
      <Plus :size="14" />
      {{ props.addButtonText }}
    </button>
  </div>
</template>

<script setup lang="ts">
import type { IProps } from "./index.types";
import { X, Plus } from "lucide-vue-next";

const props = withDefaults(defineProps<IProps>(), {
  readOnly: false,
  disabled: false,
  addButtonText: "Додати",
});

const emit = defineEmits<{
  "update:modelValue": [value: typeof props.modelValue];
  add: [];
}>();

const removeTag = (id: string | number) => {
  if (props.disabled) return;
  const newTags = props.modelValue.filter((tag) => tag.id !== id);
  emit("update:modelValue", newTags);
};
</script>

<style lang="scss" scoped>
.app-tags {
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-xs);

  &__tag {
    @include FluidFontCaption;
    align-items: center;
    border: 1px solid transparent;
    border-radius: var(--radius-xs);
    display: flex;
    font-weight: 500;
    gap: var(--spacing-2xs);
    padding: var(--spacing-xs) var(--spacing-sm);
  }

  &__tag--basic {
    background: var(--color-border);
    color: var(--color-text-secondary);
  }

  &__tag--primary {
    background: var(--color-primary-bg);
    border-color: var(--color-primary-bg-hover);
    color: var(--color-primary);
  }

  &__tag--danger {
    background: var(--color-danger-bg);
    border-color: var(--color-danger-border);
    color: var(--color-danger);
  }

  &__tag--success {
    background: var(--color-success-bg);
    border-color: var(--color-success-border);
    color: var(--color-success);
  }

  &__tag--info {
    background: var(--color-info-bg);
    border-color: var(--color-info-border);
    color: var(--color-info);
  }

  &__tag--purple {
    background: var(--color-purple-bg);
    border-color: var(--color-purple-border);
    color: var(--color-purple);
  }

  &__tag--warning {
    background: var(--color-warning-bg);
    border-color: var(--color-warning-border);
    color: var(--color-warning);
  }

  &__label {
    line-height: 1;
  }

  &__remove {
    align-items: center;
    background: transparent;
    border: none;
    color: inherit;
    cursor: pointer;
    display: flex;
    opacity: 0.7;
    padding: 0;
    transition: opacity 0.2s ease;

    &:hover:not(:disabled) {
      opacity: 1;
    }

    &:disabled {
      cursor: default;
      opacity: 0.3;
    }
  }

  &__add {
    @include FluidFontCaption;
    align-items: center;
    background: transparent;
    border: 1px dashed var(--color-border);
    border-radius: var(--radius-xs);
    color: var(--color-text-secondary);
    cursor: pointer;
    display: flex;
    font-weight: 500;
    gap: var(--spacing-2xs);
    padding: var(--spacing-xs) var(--spacing-sm);
    transition: all 0.2s ease;

    &:hover:not(:disabled) {
      border-color: var(--color-text-secondary);
      color: var(--color-text-primary);
    }

    &--disabled {
      cursor: default;
      opacity: 0.4;
    }
  }
}
</style>
