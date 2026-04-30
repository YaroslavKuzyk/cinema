import { scaleLinear } from 'd3-scale'
import type { IScrubCue } from '../domain'
import { parseVTT } from './parseVTT'

export interface IScrubThumbnailsOptions {
  /** WebVTT text (already fetched) or a ref to it. */
  vtt: Ref<string> | ComputedRef<string>
  /** Episode duration in seconds — used as the scale domain. */
  duration: Ref<number> | ComputedRef<number>
  /** Strip width in pixels — used as the scale range. */
  width: Ref<number> | ComputedRef<number>
  /** Optional base URL used to resolve relative cue src. */
  baseUrl?: string
  /** Target visible tile width; controls the virtualization sample rate. */
  targetTileWidth?: number
}

export function useScrubThumbnails(options: IScrubThumbnailsOptions) {
  const cues = computed<IScrubCue[]>(() => parseVTT(options.vtt.value, options.baseUrl))

  const timeScale = computed(() =>
    scaleLinear()
      .domain([0, Math.max(1, options.duration.value)])
      .range([0, Math.max(1, options.width.value)])
      .clamp(true),
  )

  function timeToX(sec: number): number {
    return timeScale.value(sec)
  }

  function xToTime(px: number): number {
    return timeScale.value.invert(px)
  }

  // Binary-search the cue whose [startSec, endSec) contains `sec`.
  function cueAt(sec: number): IScrubCue | null {
    const list = cues.value
    if (list.length === 0) return null
    let lo = 0
    let hi = list.length - 1
    while (lo <= hi) {
      const mid = (lo + hi) >>> 1
      const c = list[mid]!
      if (sec < c.startSec) hi = mid - 1
      else if (sec >= c.endSec) lo = mid + 1
      else return c
    }
    return list[Math.min(Math.max(0, lo), list.length - 1)] ?? null
  }

  // Sample cues evenly so the rendered strip shows ~W / targetTileWidth tiles,
  // regardless of how many cues the VTT contains. Each visible tile carries
  // its own x-position (in px) derived from the d3 scale.
  const visibleTiles = computed(() => {
    const list = cues.value
    const width = options.width.value
    const target = options.targetTileWidth ?? 160
    if (list.length === 0 || width <= 0) return []

    const count = Math.max(1, Math.floor(width / target))
    const tileW = width / count
    const tiles: Array<{ cue: IScrubCue, x: number, w: number, key: number }> = []
    for (let i = 0; i < count; i++) {
      const centerPx = i * tileW + tileW / 2
      const sec = xToTime(centerPx)
      const cue = cueAt(sec)
      if (cue) tiles.push({ cue, x: i * tileW, w: tileW, key: i })
    }
    return tiles
  })

  return {
    cues,
    visibleTiles,
    timeToX,
    xToTime,
    cueAt,
  }
}
