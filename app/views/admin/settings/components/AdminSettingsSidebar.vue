<template>
  <nav class="admin-settings-sidebar">
    <button
      v-for="tab in tabs"
      :key="tab.value"
      class="admin-settings-sidebar__item"
      :class="{ 'admin-settings-sidebar__item--active': activeTab === tab.value }"
      @click="$emit('update:activeTab', tab.value)"
    >
      <component :is="getIcon(tab.icon)" :size="16" />
      {{ tab.title }}
    </button>
  </nav>
</template>

<script setup lang="ts">
import {
  Settings,
  Palette,
  Bell,
  Play,
  Shield,
  Link,
  AlertTriangle,
} from 'lucide-vue-next'
import type { ISettingsTab } from '../domain'

defineProps<{
  tabs: ISettingsTab[]
  activeTab: string
}>()

defineEmits<{
  'update:activeTab': [value: string]
}>()

const iconMap: Record<string, typeof Settings> = {
  settings: Settings,
  palette: Palette,
  bell: Bell,
  play: Play,
  shield: Shield,
  link: Link,
  'alert-triangle': AlertTriangle,
}

const getIcon = (icon: string) => iconMap[icon] || Settings
</script>

<style lang="scss" scoped>
.admin-settings-sidebar {
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  gap: var(--spacing-2xs);
  min-width: 200px;

  &__item {
    @include FluidFontBodySm;
    align-items: center;
    background: none;
    border: none;
    border-radius: var(--radius-md);
    color: var(--color-text-secondary);
    cursor: pointer;
    display: flex;
    gap: var(--spacing-sm);
    padding: var(--spacing-sm) var(--spacing-base);
    text-align: left;
    transition: all 0.2s ease;

    &:hover {

      background: var(--color-white-10);

      color: var(--color-white);

    }

    &--active {

      background: var(--color-primary-bg);

      color: var(--color-white);

    }
  }
}
</style>
