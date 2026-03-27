<template>
  <div class="app-popup" :class="[`app-popup--${position}`, { 'app-popup--full-width': fullWidth }]">
    <div
      ref="triggerRef"
      class="app-popup__trigger"
      @click="handleTriggerClick"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
    >
      <slot name="trigger" />
    </div>

    <Transition name="popup">
      <div
        v-if="isOpen"
        ref="contentRef"
        class="app-popup__content"
        @click="handleContentClick"
        @mouseenter="handleContentMouseEnter"
        @mouseleave="handleContentMouseLeave"
      >
        <slot />
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import type { IProps } from './index.types'

const props = withDefaults(defineProps<IProps>(), {
  modelValue: undefined,
  position: 'bottom-start',
  trigger: 'click',
  offset: 8,
  disabled: false,
  closeOnClickOutside: true,
  closeOnContentClick: false,
  fullWidth: false,
  matchTriggerWidth: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const triggerRef = ref<HTMLElement | null>(null)
const contentRef = ref<HTMLElement | null>(null)

const internalOpen = ref(false)
const hoverTimeout = ref<ReturnType<typeof setTimeout> | null>(null)

const isControlled = computed(() => props.modelValue !== undefined)

const isOpen = computed({
  get: () => (isControlled.value ? props.modelValue : internalOpen.value),
  set: (value: boolean) => {
    if (isControlled.value) {
      emit('update:modelValue', value)
    } else {
      internalOpen.value = value
    }
  },
})

const handleTriggerClick = () => {
  if (props.disabled || props.trigger !== 'click') return
  isOpen.value = !isOpen.value
}

const handleMouseEnter = () => {
  if (props.disabled || props.trigger !== 'hover') return
  if (hoverTimeout.value) {
    clearTimeout(hoverTimeout.value)
    hoverTimeout.value = null
  }
  isOpen.value = true
}

const handleMouseLeave = () => {
  if (props.disabled || props.trigger !== 'hover') return
  hoverTimeout.value = setTimeout(() => {
    isOpen.value = false
  }, 100)
}

const handleContentMouseEnter = () => {
  if (props.trigger !== 'hover') return
  if (hoverTimeout.value) {
    clearTimeout(hoverTimeout.value)
    hoverTimeout.value = null
  }
}

const handleContentMouseLeave = () => {
  if (props.trigger !== 'hover') return
  hoverTimeout.value = setTimeout(() => {
    isOpen.value = false
  }, 100)
}

const handleContentClick = () => {
  if (props.closeOnContentClick) {
    isOpen.value = false
  }
}

const handleClickOutside = (event: MouseEvent) => {
  if (!props.closeOnClickOutside) return

  const target = event.target as HTMLElement
  const isInsideTrigger = triggerRef.value?.contains(target)
  const isInsideContent = contentRef.value?.contains(target)

  if (!isInsideTrigger && !isInsideContent) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
  if (hoverTimeout.value) {
    clearTimeout(hoverTimeout.value)
  }
})
</script>

<style lang="scss" scoped>
.app-popup {
  display: inline-block;
  position: relative;

  &--full-width {
    display: block;
    width: 100%;
  }

  &__trigger {
    cursor: pointer;
    display: inline-block;
  }

  &--full-width &__trigger {
    display: flex;
    width: 100%;
  }

  &__content {
    background-color: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    box-shadow: 0 8px 32px rgb(0 0 0 / 60%);
    position: absolute;
    z-index: 100;
  }

  // Bottom positions
  &--bottom &__content,
  &--bottom-start &__content,
  &--bottom-end &__content {
    top: calc(100% + 8px);
  }

  &--bottom &__content {
    left: 50%;
    transform: translateX(-50%);
  }

  &--bottom-start &__content {
    left: 0;
  }

  &--bottom-end &__content {
    right: 0;
  }

  // Top positions
  &--top &__content,
  &--top-start &__content,
  &--top-end &__content {
    bottom: 100%;
    margin-bottom: 8px;
  }

  &--top &__content {
    left: 50%;
    transform: translateX(-50%);
  }

  &--top-start &__content {
    left: 0;
  }

  &--top-end &__content {
    right: 0;
  }

  // Left positions
  &--left &__content,
  &--left-start &__content,
  &--left-end &__content {
    right: calc(100% + 8px);
  }

  &--left &__content {
    top: 50%;
    transform: translateY(-50%);
  }

  &--left-start &__content {
    top: 0;
  }

  &--left-end &__content {
    bottom: 0;
  }

  // Right positions
  &--right &__content,
  &--right-start &__content,
  &--right-end &__content {
    left: calc(100% + 8px);
  }

  &--right &__content {
    top: 50%;
    transform: translateY(-50%);
  }

  &--right-start &__content {
    top: 0;
  }

  &--right-end &__content {
    bottom: 0;
  }

  // Full width - must be last to override position-specific left/right
  &--full-width &__content {
    left: 0;
    right: 0;
  }
}

.popup-enter-active,
.popup-leave-active {
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
}

.popup-enter-from,
.popup-leave-to {
  opacity: 0;
}
</style>
