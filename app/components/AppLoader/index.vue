<template>
  <Loader class="app-loader" :size="props.size" color="currentColor" />
</template>

<script setup lang="ts">
import { Loader } from "lucide-vue-next";

interface IProps {
  size?: number;
}

const props = withDefaults(defineProps<IProps>(), {
  size: 20,
});
</script>

<style scoped lang="scss">
.app-loader {
  animation: spin 2s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}
</style>
