<template>
  <div class="app-code-input">
    <input
      v-for="(_, index) in length"
      :key="index"
      ref="inputs"
      type="text"
      inputmode="numeric"
      maxlength="1"
      :value="digits[index]"
      :placeholder="String(index + 1)"
      :disabled="disabled"
      class="app-code-input__field"
      @input="onInput(index, $event)"
      @keydown="onKeydown(index, $event)"
      @paste="onPaste"
    >
  </div>
</template>

<script lang="ts" setup>
import type { IProps } from "./index.types";

const props = withDefaults(defineProps<IProps>(), {
  length: 4,
  disabled: false,
});

const emit = defineEmits<{
  "update:modelValue": [value: string];
  complete: [value: string];
}>();

const inputs = ref<HTMLInputElement[]>([]);
const digits = computed(() => props.modelValue.split("").slice(0, props.length));

const focusInput = (index: number) => {
  if (index >= 0 && index < props.length) {
    inputs.value[index]?.focus();
  }
};

const onInput = (index: number, event: Event) => {
  const input = event.target as HTMLInputElement;
  const value = input.value.replace(/\D/g, "");

  if (value) {
    input.value = value[0];
    emitValue();
    focusInput(index + 1);
  } else {
    input.value = "";
  }
};

const onKeydown = (index: number, event: KeyboardEvent) => {
  if (event.key === "Backspace") {
    const currentInput = inputs.value[index];

    if (currentInput?.value) {
      currentInput.value = "";
      emitValue();
    } else if (index > 0) {
      const prevInput = inputs.value[index - 1];
      if (prevInput) {
        prevInput.value = "";
        focusInput(index - 1);
        emitValue();
      }
    }

    event.preventDefault();
  } else if (event.key === "ArrowLeft") {
    focusInput(index - 1);
  } else if (event.key === "ArrowRight") {
    focusInput(index + 1);
  }
};

const emitValue = () => {
  const value = inputs.value.map((input) => input?.value || "").join("");
  emit("update:modelValue", value);

  if (value.length === props.length && !value.includes("")) {
    emit("complete", value);
  }
};

const onPaste = (event: ClipboardEvent) => {
  event.preventDefault();
  const pastedData = event.clipboardData?.getData("text").replace(/\D/g, "");

  if (pastedData) {
    const digits = pastedData.slice(0, props.length).split("");
    digits.forEach((digit, i) => {
      if (inputs.value[i]) {
        inputs.value[i].value = digit;
      }
    });
    emitValue();
    focusInput(Math.min(digits.length, props.length - 1));
  }
};
</script>

<style lang="scss" scoped>
.app-code-input {
  display: flex;
  gap: var(--spacing-sm);

  &__field {
    @include FluidFontBodySm;
    background-color: var(--color-divider);
    border: 2px solid var(--color-border);
    border-radius: var(--radius-md);
    color: var(--color-white);
    height: var(--input-field-height);
    outline: 3px solid transparent;
    text-align: center;
    transition: all 0.2s ease;
    width: var(--input-field-height);

    &::placeholder {
      color: var(--color-placeholder);
    }

    &:hover:not(:disabled) {
      outline: 3px solid var(--color-white);
    }

    &:focus {
      border-color: var(--color-primary);
      outline: none;
    }

    &:disabled {
      cursor: default;
      opacity: 0.5;
    }
  }
}
</style>
