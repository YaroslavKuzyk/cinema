<script setup lang="ts">
const { locale, locales, setLocale } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const availableLocales = computed(() =>
  locales.value.filter((l): l is { code: string; name: string } => typeof l !== 'string')
)
</script>

<template>
  <div class="flex gap-2">
    <NuxtLink
      v-for="loc in availableLocales"
      :key="loc.code"
      :to="switchLocalePath(loc.code)"
      class="px-2 py-1 text-sm rounded"
      :class="locale === loc.code ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-gray-300'"
    >
      {{ loc.code.toUpperCase() }}
    </NuxtLink>
  </div>
</template>
