export type TPlayerPanel = 'settings' | 'episodes' | null

export interface IPlayerEpisode {
  id: string
  number: number
  seasonKey: string
  title: string
  durationLabel: string
  durationSec: number
  image: string
  note?: string
}

export interface IPlayerSeason {
  key: string
  title: string
  episodes: IPlayerEpisode[]
}

export interface IPlayerTrack {
  id: string
  label: string
}

export interface IPlayerQuality {
  id: string
  label: string
  isHdr?: boolean
}

export interface IPlayerSpeed {
  value: number
  label: string
}

export interface IPlayerContext {
  title: string
  seasons: IPlayerSeason[]
  currentEpisodeId: string
  backgroundImage: string
}

export interface IScrubCue {
  startSec: number
  endSec: number
  src: string
  x: number
  y: number
  w: number
  h: number
}
