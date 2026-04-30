import type {
  IPlayerContext,
  IPlayerEpisode,
  IPlayerQuality,
  IPlayerSeason,
  IPlayerSpeed,
  IPlayerTrack,
} from '../domain'

const img = (id: string, w: number, h: number) =>
  `https://images.unsplash.com/${id}?w=${w}&h=${h}&fit=crop&auto=format&q=80`

const THUMB_W = 240
const THUMB_H = 140
const CUE_DURATION_SEC = 6

function formatVttTime(sec: number): string {
  const h = Math.floor(sec / 3600)
  const m = Math.floor((sec % 3600) / 60)
  const s = Math.floor(sec % 60)
  const ms = Math.floor((sec - Math.floor(sec)) * 1000)
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}.${String(ms).padStart(3, '0')}`
}

// Generates a WebVTT string that simulates a thumbnail track. In production this
// would be fetched from a CDN alongside the video manifest; here we synthesize
// many dense cues so the virtualization path is exercised.
export function buildThumbnailVTT(durationSec: number, photos: string[]): string {
  const lines: string[] = ['WEBVTT', '']
  const total = Math.max(1, Math.ceil(durationSec / CUE_DURATION_SEC))
  for (let i = 0; i < total; i++) {
    const start = i * CUE_DURATION_SEC
    const end = Math.min(start + CUE_DURATION_SEC, durationSec)
    const src = img(photos[i % photos.length]!, THUMB_W, THUMB_H)
    lines.push(`${formatVttTime(start)} --> ${formatVttTime(end)}`)
    lines.push(`${src}#xywh=0,0,${THUMB_W},${THUMB_H}`)
    lines.push('')
  }
  return lines.join('\n')
}

export function usePlayerMocks() {
  const { t } = useI18n()

  const episodeTitles = [
    'PLAYER_EP_1', 'PLAYER_EP_2', 'PLAYER_EP_3', 'PLAYER_EP_4',
    'PLAYER_EP_5', 'PLAYER_EP_6', 'PLAYER_EP_7', 'PLAYER_EP_8',
  ]

  const photos = [
    'photo-1446776653964-20c1d3a81b06',
    'photo-1517976547714-720226b864c1',
    'photo-1534447677768-be436bb09401',
    'photo-1478720568477-152d9b164e26',
    'photo-1547234935-80c7145ec969',
    'photo-1485846234645-a62644f84728',
    'photo-1489599849927-2ee91cede3ba',
    'photo-1536440136628-849c177e76a1',
  ]

  const durationsSec = [52 * 60, 48 * 60, 55 * 60, 58 * 60, 45 * 60, 62 * 60, 58 * 60, 65 * 60]
  const durationLabels = durationsSec.map(s => `${Math.round(s / 60)} ${t('HOME_MIN_SHORT')}`)

  function makeEpisodes(seasonKey: string): IPlayerEpisode[] {
    return episodeTitles.map((titleKey, i) => ({
      id: `${seasonKey}-ep${i + 1}`,
      number: i + 1,
      seasonKey,
      title: t(titleKey),
      durationLabel: durationLabels[i] ?? '',
      durationSec: durationsSec[i] ?? 45 * 60,
      image: img(photos[i] ?? photos[0]!, 240, 140),
      note: i === 7 ? t('PLAYER_EP_FINAL') : undefined,
    }))
  }

  const seasons = computed<IPlayerSeason[]>(() => [
    { key: 's1', title: `${t('MEDIA_SEASON')} 1`, episodes: makeEpisodes('s1') },
    { key: 's2', title: `${t('MEDIA_SEASON')} 2`, episodes: makeEpisodes('s2') },
    { key: 's3', title: `${t('MEDIA_SEASON')} 3`, episodes: makeEpisodes('s3') },
  ])

  const context = computed<IPlayerContext>(() => ({
    title: t('HOME_MOVIE_INTERSTELLAR_2'),
    seasons: seasons.value,
    currentEpisodeId: 's1-ep4',
    backgroundImage: img('photo-1478720568477-152d9b164e26', 1920, 1080),
  }))

  const subtitleTracks = computed<IPlayerTrack[]>(() => [
    { id: 'off', label: t('PLAYER_TRACK_OFF') },
    { id: 'uk', label: 'Українська' },
    { id: 'en', label: 'English' },
  ])

  const audioTracks = computed<IPlayerTrack[]>(() => [
    { id: 'uk', label: 'Українська' },
    { id: 'en', label: 'English' },
    { id: 'orig', label: t('PLAYER_TRACK_ORIGINAL') },
  ])

  const qualities = computed<IPlayerQuality[]>(() => [
    { id: 'auto', label: t('ACCOUNT_QUALITY_AUTO') },
    { id: '4k', label: '4K HDR', isHdr: true },
    { id: '1080p', label: '1080p' },
    { id: '720p', label: '720p' },
  ])

  const speeds: IPlayerSpeed[] = [
    { value: 0.5, label: '0.5x' },
    { value: 0.75, label: '0.75x' },
    { value: 1, label: '1.0x' },
    { value: 1.25, label: '1.25x' },
    { value: 1.5, label: '1.5x' },
    { value: 2, label: '2.0x' },
  ]

  function getThumbnailVTT(episodeId: string): string {
    for (const season of seasons.value) {
      const ep = season.episodes.find(e => e.id === episodeId)
      if (ep) {
        const offset = ep.number % photos.length
        const rotated = [...photos.slice(offset), ...photos.slice(0, offset)]
        return buildThumbnailVTT(ep.durationSec, rotated)
      }
    }
    return 'WEBVTT\n\n'
  }

  return { context, seasons, subtitleTracks, audioTracks, qualities, speeds, getThumbnailVTT }
}
