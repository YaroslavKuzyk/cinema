<template>
  <div class="public-layout">
    <PublicHeader />
    <slot />
    <PublicFooter />
    <PublicMediaModal />
  </div>
</template>

<script setup lang="ts">
import PublicHeader from '~/components/Public/Header/index.vue'
import PublicFooter from '~/components/Public/Footer/index.vue'
import PublicMediaModal from '~/components/Public/MediaModal/index.vue'
</script>

<style lang="scss" scoped>
.public-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
</style>
