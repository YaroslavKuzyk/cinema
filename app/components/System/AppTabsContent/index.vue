<template>
  <div v-if="isActive" class="app-tabs-content">
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { APP_TABS_INJECTION_KEY } from "../AppTabs/index.constants";
import type { IProps } from "./index.types";

const props = defineProps<IProps>();

const activeTab = inject(APP_TABS_INJECTION_KEY);

const isActive = computed(() => activeTab?.value === props.value);
</script>
