<template>
  <div ref="selectRef" class="app-select" :class="{ 'app-select--disabled': props.disabled }">
    <label v-if="props.label" :for="selectId" class="app-select__label">
      {{ props.label }}
    </label>
    <div class="app-select__wrapper">
      <button
        :id="selectId"
        ref="triggerRef"
        type="button"
        class="app-select__trigger"
        :class="{ 'app-select__trigger--open': isOpen }"
        :disabled="props.disabled"
        @click="toggle"
      >
        <span class="app-select__value" :class="{ 'app-select__value--placeholder': !displayValue }">
          <span v-if="props.prefix && displayValue" class="app-select__prefix">{{ props.prefix }}:</span>
          {{ displayValue || props.placeholder }}
        </span>
        <ChevronDown
          class="app-select__arrow"
          :class="{ 'app-select__arrow--open': isOpen }"
          :size="16"
        />
      </button>
      <Teleport to="body">
        <Transition :name="dropdownDirection === 'up' ? 'dropdown-up' : 'dropdown'">
          <div
            v-if="isOpen"
            ref="dropdownRef"
            class="app-select__dropdown"
            :style="dropdownStyle"
          >
            <button
              v-for="(option, index) in props.options"
              :key="getOptionKey(option, index)"
              type="button"
              class="app-select__option"
              :class="{ 'app-select__option--selected': isSelected(option) }"
              @click="selectOption(option)"
            >
              <span v-if="props.multiple" class="app-select__checkbox">
                <svg
                  v-if="isSelected(option)"
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                >
                  <path
                    d="M2 6L5 9L10 3"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </span>
              {{ getOptionTitle(option) }}
            </button>
          </div>
        </Transition>
      </Teleport>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useId, computed, ref } from "vue";
import { ChevronDown } from "lucide-vue-next";
import type { IProps, IOption, IValue, IEmits } from "./index.types";

const props = withDefaults(defineProps<IProps>(), {
  label: "",
  placeholder: "Select...",
  multiple: false,
  disabled: false,
  itemTitle: "title",
  itemValue: "value",
  fullObject: false,
  prefix: "",
});

const emit = defineEmits<IEmits>();

const selectId = useId();
const isOpen = ref(false);
const selectRef = ref<HTMLElement | null>(null);
const triggerRef = ref<HTMLElement | null>(null);
const dropdownRef = ref<HTMLElement | null>(null);
const dropdownStyle = ref<Record<string, string>>({});

const isPrimitive = (value: unknown): value is string | number => {
  return typeof value === "string" || typeof value === "number";
};

const getOptionTitle = (option: IOption): string => {
  if (isPrimitive(option)) {
    return String(option);
  }
  return String(option[props.itemTitle] ?? "");
};

const getOptionValue = (option: IOption): IValue => {
  if (isPrimitive(option)) {
    return option;
  }
  if (props.fullObject) {
    return option;
  }
  return option[props.itemValue] as IValue;
};

const getOptionKey = (option: IOption, index: number): string | number => {
  if (isPrimitive(option)) {
    return option;
  }
  const val = option[props.itemValue];
  if (typeof val === "string" || typeof val === "number") {
    return val;
  }
  return index;
};

const compareValues = (a: IValue, b: IValue): boolean => {
  if (isPrimitive(a) && isPrimitive(b)) {
    return a === b;
  }
  if (!isPrimitive(a) && !isPrimitive(b)) {
    const aVal = a[props.itemValue];
    const bVal = b[props.itemValue];
    return aVal === bVal;
  }
  return false;
};

const displayValue = computed(() => {
  if (props.multiple) {
    const modelValueArray = Array.isArray(props.modelValue)
      ? (props.modelValue as IValue[])
      : [];
    if (modelValueArray.length === 0) return "";
    const selectedLabels = props.options
      .filter((opt) => {
        const optValue = getOptionValue(opt);
        return modelValueArray.some((v: IValue) => compareValues(v, optValue));
      })
      .map((opt) => getOptionTitle(opt));
    return selectedLabels.join(", ");
  }

  const selected = props.options.find((opt) => {
    const optValue = getOptionValue(opt);
    return compareValues(props.modelValue as IValue, optValue);
  });
  return selected ? getOptionTitle(selected) : "";
});

const isSelected = (option: IOption): boolean => {
  const optionValue = getOptionValue(option);

  if (props.multiple) {
    const modelValueArray = Array.isArray(props.modelValue)
      ? (props.modelValue as IValue[])
      : [];
    return modelValueArray.some((v: IValue) => compareValues(v, optionValue));
  }
  return compareValues(props.modelValue as IValue, optionValue);
};

const dropdownDirection = ref<'down' | 'up'>('down');

const updateDropdownPosition = () => {
  if (!triggerRef.value) return;
  const rect = triggerRef.value.getBoundingClientRect();
  const dropdownHeight = dropdownRef.value?.offsetHeight || 200;
  const spaceBelow = window.innerHeight - rect.bottom;
  const spaceAbove = rect.top;

  const openUp = spaceBelow < dropdownHeight + 8 && spaceAbove > spaceBelow;
  dropdownDirection.value = openUp ? 'up' : 'down';

  dropdownStyle.value = {
    position: "fixed",
    ...(openUp
      ? { bottom: `${window.innerHeight - rect.top + 4}px` }
      : { top: `${rect.bottom + 4}px` }),
    left: `${rect.left}px`,
    width: `${rect.width}px`,
    zIndex: "9999",
  };
};

const toggle = () => {
  if (!props.disabled) {
    isOpen.value = !isOpen.value;
    if (isOpen.value) {
      updateDropdownPosition();
      nextTick(updateDropdownPosition);
    }
  }
};

const selectOption = (option: IOption) => {
  const value = getOptionValue(option);

  if (props.multiple) {
    const modelValueArray = Array.isArray(props.modelValue)
      ? (props.modelValue as IValue[])
      : [];
    const isAlreadySelected = modelValueArray.some((v: IValue) =>
      compareValues(v, value),
    );
    const newValue = isAlreadySelected
      ? modelValueArray.filter((v: IValue) => !compareValues(v, value))
      : [...modelValueArray, value];
    emit("update:modelValue", newValue);
  } else {
    emit("update:modelValue", value);
    isOpen.value = false;
  }
};

const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement;
  if (
    selectRef.value && !selectRef.value.contains(target) &&
    dropdownRef.value && !dropdownRef.value.contains(target)
  ) {
    isOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<style lang="scss" scoped>
.app-select {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
  position: relative;

  &--disabled {
    opacity: 0.5;
    pointer-events: none;
  }

  &__label {
    @include FluidFontLabel;
    color: var(--color-text-secondary);
  }

  &__wrapper {
    position: relative;
  }

  &__trigger {
    @include FluidFontBodySm;
    align-items: center;
    background-color: var(--color-divider);
    border: 2px solid var(--color-border);
    border-radius: var(--radius-md);
    color: var(--color-white);
    cursor: pointer;
    display: flex;
    gap: var(--spacing-xs);
    justify-content: space-between;
    outline: 3px solid transparent;
    padding: var(--spacing-sm) var(--spacing-base);
    text-align: left;
    transition: all 0.3s ease;
    width: 100%;

    &:hover:not(:disabled) {
      outline: 3px solid var(--color-white);
    }

    &--open {
      border-color: var(--color-primary);
    }
  }

  &__value {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    &--placeholder {
      color: var(--color-text-tertiary);
    }
  }

  &__prefix {
    color: var(--color-text-secondary);
    margin-right: var(--spacing-3xs);
  }

  &__arrow {
    display: flex;
    transition: transform 0.2s ease;

    &--open {
      transform: rotate(180deg);
    }
  }
}
</style>

<style lang="scss">
.app-select__dropdown {
  @include FluidShadowMd;
  background-color: var(--color-surface-alt);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  display: flex;
  flex-direction: column;
  max-height: fluid(180px, 300px);
  overflow-y: auto;
}

.app-select__option {
  @include FluidFontBodySm;
  align-items: center;
  background: none;
  border: none;
  color: var(--color-text-primary);
  cursor: pointer;
  display: flex;
  gap: var(--spacing-xs);
  padding: var(--spacing-xs) var(--spacing-base);
  text-align: left;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: var(--color-white-10);
  }

  &--selected {
    background-color: var(--color-primary-bg-hover);
    color: var(--color-white);
  }
}

.app-select__checkbox {
  align-items: center;
  border: 2px solid currentcolor;
  border-radius: var(--radius-2xs);
  display: flex;
  height: var(--spacing-base);
  justify-content: center;
  width: var(--spacing-base);
}

.dropdown-enter-active,
.dropdown-leave-active {
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(calc(var(--spacing-xs) * -1));
}

.dropdown-up-enter-active,
.dropdown-up-leave-active {
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
}

.dropdown-up-enter-from,
.dropdown-up-leave-to {
  opacity: 0;
  transform: translateY(var(--spacing-xs));
}
</style>
