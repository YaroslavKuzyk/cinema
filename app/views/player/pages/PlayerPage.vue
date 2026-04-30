<template>
  <div class="player">
    <section class="player__stage">
      <img
        :src="context.backgroundImage"
        :alt="context.title"
        class="player__video"
      >
      <div class="player__shade" />

      <PlayerHeader
        :title="context.title"
        :subtitle="subtitleText"
        :show-settings="panel === null"
        @back="goBack"
        @settings="togglePanel('settings')"
      />

      <PlayerControls
        :current-time="currentTime"
        :duration="duration"
        :progress="progress"
        :is-playing="isPlaying"
        :is-fullscreen="isFullscreen"
        :panel="panel"
        :next-episode="nextEpisode"
        :thumbnail-vtt="thumbnailVtt"
        @toggle-play="togglePlay"
        @toggle-episodes="togglePanel('episodes')"
        @toggle-fullscreen="toggleFullscreen"
        @play-next="onPlayNext"
        @seek="seekRatio"
      />

      <Transition name="panel">
        <aside v-if="panel" class="player__panel">
          <PlayerSettingsPanel
            v-if="panel === 'settings'"
            :qualities="qualities"
            :speeds="speeds"
            :quality="quality"
            :speed="speed"
            :volume="volume"
            @close="closePanel"
            @update:quality="quality = $event"
            @update:speed="speed = $event"
            @update:volume="volume = $event"
          />

          <PlayerEpisodesPanel
            v-else-if="panel === 'episodes'"
            :seasons="seasons"
            :current-episode-id="currentEpisode?.id ?? ''"
            :is-playing="isPlaying"
            @close="closePanel"
            @play="playEpisode"
          />
        </aside>
      </Transition>
    </section>
  </div>
</template>

<script setup lang="ts">
import {
  PlayerControls,
  PlayerEpisodesPanel,
  PlayerHeader,
  PlayerSettingsPanel,
} from "../components";
import { usePlayer } from "../composables";

const {
  context,
  seasons,
  qualities,
  speeds,
  currentEpisode,
  currentSeason,
  nextEpisode,
  currentTime,
  duration,
  progress,
  thumbnailVtt,
  isPlaying,
  volume,
  speed,
  quality,
  isFullscreen,
  panel,
  start,
  stop,
  togglePlay,
  seekRatio,
  togglePanel,
  closePanel,
  playEpisode,
  toggleFullscreen,
} = usePlayer();

const router = useRouter();
const localePath = useLocalePath();

const subtitleText = computed(() => {
  const ep = currentEpisode.value;
  const season = currentSeason.value;
  if (!ep || !season) return "";
  const seasonNum = season.key.replace(/\D/g, "") || "1";
  return `S${seasonNum}:E${ep.number} · ${ep.title}`;
});

function goBack() {
  if (window.history.length > 1) router.back();
  else router.push(localePath("/"));
}

function onPlayNext() {
  if (nextEpisode.value) playEpisode(nextEpisode.value.id);
}

onMounted(() => start());
onBeforeUnmount(() => stop());

useHead({ title: "Cinema — Плеєр" });

definePageMeta({ layout: false });
</script>

<style lang="scss" scoped>
.player {
  background: var(--color-background, #0a0a0a);
  min-height: 100vh;

  &__stage {
    isolation: isolate;
    min-height: 100vh;
    overflow: hidden;
    position: relative;
  }

  &__video {
    display: block;
    height: 100%;
    inset: 0;
    object-fit: cover;
    position: absolute;
    width: 100%;
    z-index: -2;
  }

  &__shade {
    background:
      linear-gradient(180deg, rgba(0, 0, 0, 0.55) 0%, rgba(0, 0, 0, 0) 20%, rgba(0, 0, 0, 0) 60%, rgba(0, 0, 0, 0.65) 100%);
    inset: 0;
    position: absolute;
    z-index: -1;
  }

  &__panel {
    bottom: 0;
    height: 100%;
    position: absolute;
    right: 0;
    top: 0;
    width: 560px;
    z-index: 10;
  }
}

.panel-enter-active,
.panel-leave-active {
  transition: transform 0.32s ease;
}

.panel-enter-from,
.panel-leave-to {
  transform: translateX(100%);
}
</style>
