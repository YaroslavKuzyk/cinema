import type { IScrubCue } from '../domain'

// HH:MM:SS.mmm | MM:SS.mmm
const TIME_RE = /^(?:(\d+):)?(\d+):(\d+)\.(\d+)$/

function parseTime(raw: string): number {
  const m = raw.trim().match(TIME_RE)
  if (!m) return Number.NaN
  const [, hh, mm, ss, ms] = m
  const h = hh ? Number(hh) : 0
  return h * 3600 + Number(mm) * 60 + Number(ss) + Number(ms) / 10 ** ms!.length
}

function parseXYWH(fragment: string): { x: number, y: number, w: number, h: number } | null {
  const m = fragment.match(/xywh=(\d+),(\d+),(\d+),(\d+)/)
  if (!m) return null
  return { x: Number(m[1]), y: Number(m[2]), w: Number(m[3]), h: Number(m[4]) }
}

function resolveSrc(payload: string, baseUrl?: string): string {
  const hashIdx = payload.indexOf('#')
  const url = hashIdx >= 0 ? payload.slice(0, hashIdx) : payload
  if (!baseUrl) return url
  try {
    return new URL(url, baseUrl).toString()
  } catch {
    return url
  }
}

/**
 * Parse a WebVTT file containing thumbnail cues.
 * Each cue payload is a URL optionally followed by a `#xywh=x,y,w,h` media fragment.
 * If no xywh is present, the entire referenced image is treated as the thumbnail.
 */
export function parseVTT(text: string, baseUrl?: string): IScrubCue[] {
  const lines = text.replace(/\r\n?/g, '\n').split('\n')
  const cues: IScrubCue[] = []
  let i = 0

  // Skip header + first blank line
  while (i < lines.length && !lines[i]!.includes('-->')) i++

  while (i < lines.length) {
    const timingLine = lines[i]
    if (!timingLine || !timingLine.includes('-->')) {
      i++
      continue
    }
    const [startRaw, endRaw] = timingLine.split('-->').map(s => s.trim())
    const startSec = parseTime(startRaw!)
    const endSec = parseTime(endRaw!.split(' ')[0]!) // settings after timing are ignored
    i++

    const payloadLines: string[] = []
    while (i < lines.length && lines[i]!.trim() !== '') {
      payloadLines.push(lines[i]!.trim())
      i++
    }
    i++ // skip blank

    if (Number.isNaN(startSec) || Number.isNaN(endSec) || payloadLines.length === 0) continue

    const payload = payloadLines[0]!
    const src = resolveSrc(payload, baseUrl)
    const xywh = parseXYWH(payload)

    cues.push({
      startSec,
      endSec,
      src,
      x: xywh?.x ?? 0,
      y: xywh?.y ?? 0,
      w: xywh?.w ?? 0,
      h: xywh?.h ?? 0,
    })
  }

  return cues
}
