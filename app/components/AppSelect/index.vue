<template>
  <div class="app-select" :class="{ 'app-select--disabled': props.disabled }">
    <label v-if="props.label" :for="selectId" class="app-select__label">
      {{ props.label }}
    </label>
    <div class="app-select__wrapper">
      <button
        :id="selectId"
        type="button"
        class="app-select__trigger"
        :class="{ 'app-select__trigger--open': isOpen }"
        :disabled="props.disabled"
        @click="toggle"
      >
        <span class="app-select__value">
          {{ displayValue || props.placeholder }}
        </span>
        <ChevronDown
          class="app-select__arrow"
          :class="{ 'app-select__arrow--open': isOpen }"
          :size="16"
        />
      </button>
      <Transition name="dropdown">
        <div v-if="isOpen" class="app-select__dropdown">
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
});

const emit = defineEmits<IEmits>();

const selectId = useId();
const isOpen = ref(false);

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

const toggle = () => {
  if (!props.disabled) {
    isOpen.value = !isOpen.value;
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
  if (!target.closest(".app-select")) {
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
  gap: 8px;
  position: relative;

  &--disabled {
    opacity: 0.5;
    pointer-events: none;
  }

  &__label {
    @include FontLable;
    color: $textSecondaryColor;
  }

  &__wrapper {
    position: relative;
  }

  &__trigger {
    align-items: center;
    background-color: $dividerColor;
    border: 2px solid $borderColor;
    border-radius: $radiusMd;
    color: $whiteColor;
    cursor: pointer;
    display: flex;
    gap: 8px;
    justify-content: space-between;
    outline: 3px solid transparent;
    padding: 16.5px 18px;
    text-align: left;
    transition: all 0.3s ease;
    width: 100%;

    @include FontBodySm;

    &:hover:not(:disabled) {
      outline: 3px solid $whiteColor;
    }

    &--open {
      border-color: $primaryColor;
    }
  }

  &__value {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &__arrow {
    display: flex;
    transition: transform 0.2s ease;

    &--open {
      transform: rotate(180deg);
    }
  }

  &__dropdown {
    background-color: $dividerColor;
    border: 2px solid $borderColor;
    border-radius: $radiusMd;
    display: flex;
    flex-direction: column;
    left: 0;
    margin-top: 4px;
    max-height: 200px;
    overflow-y: auto;
    position: absolute;
    right: 0;
    z-index: 10;
  }

  &__option {
    align-items: center;
    background: none;
    border: none;
    color: $textPrimaryColor;
    cursor: pointer;
    display: flex;
    gap: 8px;
    padding: 12px 18px;
    text-align: left;
    transition: background-color 0.2s ease;

    @include FontBodySm;

    &:hover {
      background-color: $borderColor;
    }

    &--selected {
      background-color: $primaryDarkColor;
      color: $whiteColor;
    }
  }

  &__checkbox {
    align-items: center;
    border: 2px solid currentcolor;
    border-radius: 4px;
    display: flex;
    height: 16px;
    justify-content: center;
    width: 16px;
  }
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
  transform: translateY(-8px);
}
</style>
