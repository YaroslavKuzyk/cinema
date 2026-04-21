import type { IMovie } from '~/components/Public/MovieCard/index.types'

export type TMediaType = 'movie' | 'series' | 'anime'

export interface IMediaEpisode {
  number: number
  title: string
  duration: string
  note?: string
  description: string
  image: string
}

export interface IMediaSeason {
  key: string
  title: string
  episodes: IMediaEpisode[]
}

export interface IMediaInfoRow {
  label: string
  value: string
}

export interface IMediaDetails {
  id: string
  type: TMediaType
  typeBadge: string
  title: string
  description: string
  image: string
  matchPercent: number
  year: number
  duration: string
  flags: string[]
  watchLabel: string
  info: IMediaInfoRow[]
  ratingLabel: string
  rating: number
  seasons?: IMediaSeason[]
  similar: IMovie[]
  similarTitle: string
}
