<template>
  <div v-show="visible" class="scrub-preview">
    <div
      class="scrub-preview__inner"
      :style="{ left: `${trackOffset}px`, width: `${trackWidth}px` }"
    >
      <div ref="stripEl" class="scrub-preview__strip">
        <div
          v-for="tile in visibleTiles"
          :key="tile.key"
          class="scrub-preview__tile"
          :class="{ 'scrub-preview__tile--active': isActive(tile) }"
          :style="tileStyle(tile)"
        />
      </div>
    </div>
    <span
      class="scrub-preview__time"
      :style="{ left: `${trackOffset + hoverX}px` }"
    >
      {{ timeLabel }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { formatTime, useScrubThumbnails } from '../composables'
import type { IScrubCue } from '../domain'

const props = defineProps<{
  visible: boolean
  ratio: number
  hoverX: number
  trackOffset: number
  trackWidth: number
  duration: number
  vtt: string
}>()

const stripEl = ref<HTMLElement | null>(null)
const stripWidth = ref(0)

function measure() {
  stripWidth.value = stripEl.value?.clientWidth ?? 0
}

let ro: ResizeObserver | null = null
onMounted(() => {
  measure()
  if (typeof ResizeObserver !== 'undefined' && stripEl.value) {
    ro = new ResizeObserver(measure)
    ro.observe(stripEl.value)
  }
})
onBeforeUnmount(() => ro?.disconnect())

// v-show toggles display:none, so re-measure once the strip becomes visible
// in case the initial measurement happened while it was hidden.
watch(() => props.visible, (v) => { if (v) nextTick(measure) })

const vttRef = computed(() => props.vtt)
const durationRef = computed(() => props.duration)

const { visibleTiles } = useScrubThumbnails({
  vtt: vttRef,
  duration: durationRef,
  width: stripWidth,
  targetTileWidth: 180,
})

function isActive(tile: { cue: IScrubCue, x: number, w: number }): boolean {
  const hoverPx = props.ratio * stripWidth.value
  return hoverPx >= tile.x && hoverPx < tile.x + tile.w
}

const timeLabel = computed(() => formatTime(props.ratio * props.duration))

// Render a sprite-sheet tile: scale the whole source image so that the chosen
// rect fills the tile exactly, then shift it with background-position.
function tileStyle(tile: { cue: IScrubCue, x: number, w: number }) {
  const { cue, x, w } = tile
  const h = 110
  // If the cue has no explicit xywh, fall back to treating the whole image as the tile.
  if (!cue.w || !cue.h) {
    return {
      backgroundImage: `url(${cue.src})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      left: `${x}px`,
      width: `${w}px`,
      height: `${h}px`,
    }
  }
  const scaleX = w / cue.w
  const scaleY = h / cue.h
  return {
    backgroundImage: `url(${cue.src})`,
    backgroundSize: `${cue.w * scaleX}px ${cue.h * scaleY}px`,
    backgroundPosition: `${-cue.x * scaleX}px ${-cue.y * scaleY}px`,
    left: `${x}px`,
    width: `${w}px`,
    height: `${h}px`,
  }
}
</script>

<style lang="scss" scoped>
.scrub-preview {
  background: linear-gradient(180deg, rgba(10, 10, 10, 0) 0%, rgba(10, 10, 10, 0.7) 40%, rgba(10, 10, 10, 0.92) 100%);
  bottom: calc(var(--spacing-xl) + 64px + var(--spacing-xs));
  left: 0;
  padding: var(--spacing-2xl) 0 var(--spacing-md);
  pointer-events: none;
  position: absolute;
  right: 0;
  z-index: 4;

  &__inner {
    position: relative;
  }

  &__strip {
    height: 110px;
    position: relative;
    width: 100%;
  }

  &__tile {
    background-repeat: no-repeat;
    border: 3px solid transparent;
    border-radius: var(--radius-sm);
    box-sizing: border-box;
    position: absolute;
    top: 0;
    transition: transform 0.15s ease;

    &--active {
      border-color: var(--color-primary);
      transform: scale(1.04);
      z-index: 1;
    }
  }

  &__time {
    @include FluidFontBodyMd;
    background: var(--color-primary);
    border-radius: var(--radius-sm);
    bottom: var(--spacing-xs);
    color: var(--color-white);
    font-weight: 600;
    padding: var(--spacing-3xs) var(--spacing-sm);
    position: absolute;
    transform: translateX(-50%);
    white-space: nowrap;
  }
}
</style>
