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
  gap: 8px;

  &__tag {
    align-items: center;
    border: 1px solid transparent;
    border-radius: $radiusXs;
    display: flex;
    font-size: 14px;
    font-weight: 500;
    gap: 6px;
    padding: 7px 14px;
  }

  &__tag--basic {
    background: $borderColor;
    color: $textSecondaryColor;
  }

  &__tag--primary {
    background: rgba($color: $primaryColor, $alpha: 0.12);
    border-color: rgba($color: $primaryColor, $alpha: 0.2);
    color: $primaryColor;
  }

  &__tag--danger {
    background: rgba($color: $dangerColor, $alpha: 0.15);
    border-color: rgba($color: $dangerColor, $alpha: 0.2);
    color: $dangerColor;
  }

  &__tag--success {
    background: rgba($color: $successColor, $alpha: 0.15);
    border-color: rgba($color: $successColor, $alpha: 0.2);
    color: $successColor;
  }

  &__tag--info {
    background: rgba($color: $infoColor, $alpha: 0.15);
    border-color: rgba($color: $infoColor, $alpha: 0.2);
    color: $infoColor;
  }

  &__tag--purple {
    background: rgba($color: $purpleColor, $alpha: 0.12);
    border-color: rgba($color: $purpleColor, $alpha: 0.2);
    color: $purpleColor;
  }

  &__tag--warning {
    background: rgba($color: $warningColor, $alpha: 0.15);
    border-color: rgba($color: $warningColor, $alpha: 0.2);
    color: $warningColor;
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
    align-items: center;
    background: transparent;
    border: 1px dashed $borderColor;
    border-radius: $radiusXs;
    color: $textSecondaryColor;
    cursor: pointer;
    display: flex;
    font-size: 14px;
    font-weight: 500;
    gap: 4px;
    padding: 8px 12px;
    transition: all 0.2s ease;

    &:hover:not(:disabled) {
      border-color: $textSecondaryColor;
      color: $textPrimaryColor;
    }

    &--disabled {
      cursor: default;
      opacity: 0.4;
    }
  }
}
</style>
