<template>
  <AppModal v-model="isOpen" size="full" flush class="media-modal">
    <PublicMediaDetails v-if="details" :current="details" is-modal />
  </AppModal>
</template>

<script setup lang="ts">
import PublicMediaDetails from "~/components/Public/MediaDetails/index.vue";

const { current, isOpen, params } = useMediaModal();
const mocks = useMediaMocks();

const details = computed(() => {
  if (current.value) return current.value;
  if (!params.value) return null;
  if (params.value.type === "movie") return mocks.movie.value;
  if (params.value.type === "series") return mocks.series.value;
  if (params.value.type === "anime") return mocks.anime.value;
  return null;
});
</script>

<style lang="scss" scoped>
.media-modal {
  :deep(.app-modal__close) {
    backdrop-filter: blur(8px);
    background: rgba(10, 10, 10, 0.55);
    color: var(--color-white);
    z-index: 2;

    &:hover {
      background: rgba(10, 10, 10, 0.8);
    }
  }
}
</style>
