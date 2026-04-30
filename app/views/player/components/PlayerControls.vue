<template>
  <div ref="rootEl" class="controls">
    <!-- Floating next episode card -->
    <div v-if="nextEpisode && !panel" class="controls__next">
      <PlayerNextEpisode :episode="nextEpisode" @play="$emit('play-next')" />
    </div>

    <PlayerScrubPreview
      :visible="showPreview"
      :ratio="hoverRatio"
      :hover-x="hoverX"
      :track-offset="trackOffset"
      :track-width="trackWidth"
      :duration="duration"
      :vtt="thumbnailVtt"
    />

    <div class="controls__bar">
      <div class="controls__playback">
        <button
          type="button"
          class="controls__play"
          :aria-label="isPlaying ? $t('PLAYER_PAUSE') : $t('PLAYER_PLAY')"
          @click="$emit('toggle-play')"
        >
          <Pause v-if="isPlaying" :size="28" fill="currentColor" />
          <Play v-else :size="28" fill="currentColor" />
        </button>

        <span class="controls__time">
          {{ formatTime(currentTime) }} <span class="controls__time-sep">/</span> {{ formatTime(duration) }}
        </span>
      </div>

      <div class="controls__track-pill">
        <div
          ref="trackEl"
          class="controls__track"
          :class="{ 'controls__track--dragging': isDragging }"
          @pointerdown="onPointerDown"
          @pointermove="onPointerMove"
          @pointerenter="isHovering = true"
          @pointerleave="isHovering = false"
        >
          <div class="controls__track-bg" />
          <div
            class="controls__track-fill"
            :style="{ width: `${displayProgress * 100}%` }"
          />
          <div
            class="controls__track-thumb"
            :style="{ left: `${displayProgress * 100}%` }"
          />
        </div>
      </div>

      <div class="controls__actions">
        <button
          type="button"
          class="controls__action"
          :class="{ 'controls__action--active': panel === 'episodes' }"
          :aria-label="$t('PLAYER_EPISODES')"
          @click="$emit('toggle-episodes')"
        >
          <ListVideo :size="26" />
        </button>

        <button
          type="button"
          class="controls__action"
          :aria-label="isFullscreen ? $t('PLAYER_EXIT_FULLSCREEN') : $t('PLAYER_FULLSCREEN')"
          @click="$emit('toggle-fullscreen')"
        >
          <Minimize v-if="isFullscreen" :size="26" />
          <Maximize v-else :size="26" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ListVideo, Maximize, Minimize, Pause, Play } from 'lucide-vue-next'
import { formatTime } from '../composables'
import type { IPlayerEpisode, TPlayerPanel } from '../domain'
import PlayerNextEpisode from './PlayerNextEpisode.vue'
import PlayerScrubPreview from './PlayerScrubPreview.vue'

const props = defineProps<{
  currentTime: number
  duration: number
  progress: number
  isPlaying: boolean
  isFullscreen: boolean
  panel: TPlayerPanel
  nextEpisode: IPlayerEpisode | null
  thumbnailVtt: string
}>()

const emit = defineEmits<{
  'toggle-play': []
  'toggle-episodes': []
  'toggle-fullscreen': []
  'play-next': []
  seek: [ratio: number]
}>()

const rootEl = ref<HTMLElement | null>(null)
const trackEl = ref<HTMLElement | null>(null)
const isHovering = ref(false)
const isDragging = ref(false)
const hoverRatio = ref(0)
const hoverX = ref(0)
const dragRatio = ref(0)
const trackOffset = ref(0)
const trackWidth = ref(0)

const showPreview = computed(() => isHovering.value || isDragging.value)
const displayProgress = computed(() => (isDragging.value ? dragRatio.value : props.progress))

function measureTrack() {
  const track = trackEl.value
  const root = rootEl.value
  if (!track || !root) return
  const trackRect = track.getBoundingClientRect()
  const rootRect = root.getBoundingClientRect()
  trackOffset.value = trackRect.left - rootRect.left
  trackWidth.value = trackRect.width
}

function updateFromEvent(e: PointerEvent): number {
  const track = trackEl.value
  if (!track) return 0
  const trackRect = track.getBoundingClientRect()
  const x = Math.min(Math.max(0, e.clientX - trackRect.left), trackRect.width)
  const ratio = trackRect.width > 0 ? x / trackRect.width : 0
  hoverRatio.value = ratio
  hoverX.value = x
  return ratio
}

function onPointerMove(e: PointerEvent) {
  if (isDragging.value) return // global listener handles this
  updateFromEvent(e)
}

function onPointerDown(e: PointerEvent) {
  if (e.button !== 0 && e.pointerType === 'mouse') return
  e.preventDefault()
  isDragging.value = true
  const ratio = updateFromEvent(e)
  dragRatio.value = ratio
  emit('seek', ratio)
  window.addEventListener('pointermove', onWindowPointerMove)
  window.addEventListener('pointerup', onWindowPointerUp)
  window.addEventListener('pointercancel', onWindowPointerUp)
}

function onWindowPointerMove(e: PointerEvent) {
  if (!isDragging.value) return
  const ratio = updateFromEvent(e)
  dragRatio.value = ratio
  emit('seek', ratio)
}

function onWindowPointerUp() {
  if (!isDragging.value) return
  isDragging.value = false
  window.removeEventListener('pointermove', onWindowPointerMove)
  window.removeEventListener('pointerup', onWindowPointerUp)
  window.removeEventListener('pointercancel', onWindowPointerUp)
}

let trackRO: ResizeObserver | null = null
onMounted(() => {
  measureTrack()
  if (typeof ResizeObserver !== 'undefined' && rootEl.value) {
    trackRO = new ResizeObserver(measureTrack)
    trackRO.observe(rootEl.value)
  }
})

onBeforeUnmount(() => {
  trackRO?.disconnect()
  window.removeEventListener('pointermove', onWindowPointerMove)
  window.removeEventListener('pointerup', onWindowPointerUp)
  window.removeEventListener('pointercancel', onWindowPointerUp)
})
</script>

<style lang="scss" scoped>
.controls {
  bottom: 0;
  left: 0;
  padding: var(--spacing-xl);
  position: absolute;
  right: 0;
  z-index: 3;

  &__next {
    display: flex;
    justify-content: flex-end;
    margin-bottom: var(--spacing-md);
  }

  &__bar {
    align-items: center;
    display: flex;
    gap: var(--spacing-sm);
  }

  &__playback {
    align-items: center;
    backdrop-filter: blur(8px);
    background: rgba(10, 10, 10, 0.55);
    border-radius: var(--radius-full);
    display: inline-flex;
    flex-shrink: 0;
    height: 64px;
    padding-right: var(--spacing-lg);
  }

  &__play {
    align-items: center;
    background: transparent;
    border: none;
    border-radius: var(--radius-full);
    color: var(--color-white);
    cursor: pointer;
    display: flex;
    flex-shrink: 0;
    height: 52px;
    justify-content: center;
    margin: 0 var(--spacing-2xs);
    transition: background 0.2s ease;
    width: 52px;

    &:hover {
      background: rgba(255, 255, 255, 0.1);
    }
  }

  &__time {
    @include FluidFontBodyLg;
    color: var(--color-white);
    font-variant-numeric: tabular-nums;
    padding-left: var(--spacing-xs);
    white-space: nowrap;
  }

  &__time-sep {
    color: rgba(255, 255, 255, 0.55);
  }

  &__track-pill {
    align-items: center;
    backdrop-filter: blur(8px);
    background: rgba(10, 10, 10, 0.55);
    border-radius: var(--radius-full);
    display: flex;
    flex: 1;
    height: 64px;
    padding: 0 var(--spacing-lg);
  }

  &__track {
    cursor: pointer;
    flex: 1;
    height: 64px;
    position: relative;
    touch-action: none;
    user-select: none;

    &--dragging {
      cursor: grabbing;
    }
  }

  &__track-bg {
    background: rgba(255, 255, 255, 0.2);
    border-radius: var(--radius-full);
    height: 6px;
    left: 0;
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
  }

  &__track-fill {
    background: var(--color-primary);
    border-radius: var(--radius-full);
    height: 6px;
    left: 0;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }

  &__track-thumb {
    background: var(--color-primary);
    border: 4px solid var(--color-white);
    border-radius: var(--radius-full);
    height: 24px;
    pointer-events: none;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    transition: transform 0.15s ease;
    width: 24px;
  }

  &__track:hover &__track-thumb,
  &__track--dragging &__track-thumb {
    transform: translate(-50%, -50%) scale(1.1);
  }

  &__actions {
    align-items: center;
    backdrop-filter: blur(8px);
    background: rgba(10, 10, 10, 0.55);
    border-radius: var(--radius-full);
    display: inline-flex;
    flex-shrink: 0;
    gap: var(--spacing-2xs);
    height: 64px;
    padding: 0 var(--spacing-2xs);
  }

  &__action {
    align-items: center;
    background: transparent;
    border: none;
    border-radius: var(--radius-full);
    color: var(--color-white);
    cursor: pointer;
    display: flex;
    flex-shrink: 0;
    height: 52px;
    justify-content: center;
    transition: background 0.2s ease;
    width: 52px;

    &:hover,
    &--active {
      background: rgba(255, 255, 255, 0.12);
    }
  }
}
</style>
