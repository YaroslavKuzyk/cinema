<template>
  <div class="media-page">
    <PublicMediaDetails v-if="data" :current="data" />
    <div v-else class="media-page__empty">
      {{ $t("MEDIA_NOT_FOUND") }}
    </div>
  </div>
</template>

<script setup lang="ts">
import PublicMediaDetails from "~/components/Public/MediaDetails/index.vue";

definePageMeta({ layout: "public" });

const route = useRoute();
const id = String(route.params.id);

const { data } = await useMediaDetails("movie", id);

if (!data.value) {
  throw createError({ statusCode: 404, statusMessage: "Movie not found", fatal: true });
}

useMediaSeo(data, "movie");
</script>

<style lang="scss" scoped>
.media-page {
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 60px);

  &__empty {
    display: flex;
    justify-content: center;
    padding: var(--spacing-3xl);
  }
}
</style>
