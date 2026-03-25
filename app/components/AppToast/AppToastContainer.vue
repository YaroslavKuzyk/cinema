<template>
  <Teleport to="body">
    <div class="app-toast-container">
      <TransitionGroup name="toast">
        <AppToast
          v-for="toast in toasts"
          :key="toast.id"
          :toast="toast"
          @close="remove(toast.id)"
        />
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import AppToast from "./index.vue";

const { toasts, remove } = useToast();
</script>

<style lang="scss">
.app-toast-container {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 24px;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 9999;
}

.toast-enter-active {
  animation: toast-in 0.3s ease;
}

.toast-leave-active {
  animation: toast-out 0.3s ease;
}

.toast-move {
  transition: transform 0.3s ease;
}

@keyframes toast-in {
  from {
    opacity: 0;
    transform: translateX(100%);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes toast-out {
  from {
    opacity: 1;
    transform: translateX(0);
  }

  to {
    opacity: 0;
    transform: translateX(100%);
  }
}
</style>
