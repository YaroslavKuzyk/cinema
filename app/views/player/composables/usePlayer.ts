import type { IPlayerEpisode, IPlayerSeason, TPlayerPanel } from '../domain'
import { usePlayerMocks } from './usePlayerMocks'

export function formatTime(totalSec: number): string {
  const s = Math.max(0, Math.floor(totalSec))
  const hours = Math.floor(s / 3600)
  const minutes = Math.floor((s % 3600) / 60)
  const seconds = s % 60
  const mm = String(minutes).padStart(2, '0')
  const ss = String(seconds).padStart(2, '0')
  return hours > 0 ? `${hours}:${mm}:${ss}` : `${minutes}:${ss}`
}

export function usePlayer() {
  const { context, seasons, subtitleTracks, audioTracks, qualities, speeds, getThumbnailVTT } = usePlayerMocks()

  const currentEpisodeId = useState<string>('player:current-ep', () => context.value.currentEpisodeId)

  const currentEpisode = computed<IPlayerEpisode | null>(() => {
    for (const season of seasons.value) {
      const ep = season.episodes.find(e => e.id === currentEpisodeId.value)
      if (ep) return ep
    }
    return seasons.value[0]?.episodes[0] ?? null
  })

  const currentSeason = computed<IPlayerSeason | null>(() =>
    seasons.value.find(s => s.episodes.some(e => e.id === currentEpisodeId.value)) ?? seasons.value[0] ?? null,
  )

  const nextEpisode = computed<IPlayerEpisode | null>(() => {
    const season = currentSeason.value
    if (!season) return null
    const idx = season.episodes.findIndex(e => e.id === currentEpisodeId.value)
    return season.episodes[idx + 1] ?? null
  })

  const duration = computed(() => currentEpisode.value?.durationSec ?? 0)

  const currentTime = ref(18 * 60 + 42) // 18:42
  const isPlaying = ref(true)
  const volume = ref(0.7)
  const speed = ref(1)
  const subtitleTrack = ref('uk')
  const audioTrack = ref('en')
  const quality = ref('4k')
  const isFullscreen = ref(false)

  const panel = ref<TPlayerPanel>(null)

  let timer: ReturnType<typeof setInterval> | null = null

  function start() {
    if (timer) return
    timer = setInterval(() => {
      if (isPlaying.value && currentTime.value < duration.value) {
        currentTime.value = Math.min(duration.value, currentTime.value + 1 * speed.value)
      }
    }, 1000)
  }

  function stop() {
    if (timer) {
      clearInterval(timer)
      timer = null
    }
  }

  function togglePlay() {
    isPlaying.value = !isPlaying.value
  }

  function seekTo(sec: number) {
    currentTime.value = Math.min(Math.max(0, sec), duration.value)
  }

  function seekRatio(ratio: number) {
    seekTo(ratio * duration.value)
  }

  function togglePanel(next: Exclude<TPlayerPanel, null>) {
    panel.value = panel.value === next ? null : next
  }

  function closePanel() {
    panel.value = null
  }

  function playEpisode(id: string) {
    currentEpisodeId.value = id
    currentTime.value = 0
    isPlaying.value = true
    closePanel()
  }

  function toggleFullscreen() {
    isFullscreen.value = !isFullscreen.value
  }

  const progress = computed(() => {
    if (duration.value <= 0) return 0
    return Math.min(1, Math.max(0, currentTime.value / duration.value))
  })

  // WebVTT thumbnail track for the current episode. Real deployments would
  // fetch this from `currentEpisode.value.thumbnailVttUrl`; we synthesize it
  // from mocks so the scrubber's parser + virtualization path is exercised.
  const thumbnailVtt = computed(() =>
    currentEpisode.value ? getThumbnailVTT(currentEpisode.value.id) : '',
  )

  return {
    context,
    seasons,
    subtitleTracks,
    audioTracks,
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
    subtitleTrack,
    audioTrack,
    quality,
    isFullscreen,
    panel,
    start,
    stop,
    togglePlay,
    seekTo,
    seekRatio,
    togglePanel,
    closePanel,
    playEpisode,
    toggleFullscreen,
  }
}
