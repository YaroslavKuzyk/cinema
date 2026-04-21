export type SeriesStatus = 'published' | 'moderation' | 'draft' | 'archived'

export interface ISeries {
  id: string
  title: string
  studio: string
  seasonsCount: number
  image: string
  genre: string
  seasons: string
  status: SeriesStatus
  views: string
  rating: number | null
  date: string
}

export interface ISeriesStats {
  total: number
  published: number
  drafts: number
  moderation: number
  views: string
  avgRating: number
}

export interface ISeriesFilters {
  search: string
  genre: string
  status: string
  seasons: string
}
