export type AnimeStatus = 'published' | 'moderation' | 'draft'

export interface IAnime {
  id: string
  title: string
  studio: string
  episodes: number
  image: string
  genres: string
  seasons: string
  status: AnimeStatus
  views: string
  rating: number | null
  date: string
}

export interface IAnimeStats {
  total: number
  published: number
  drafts: number
  moderation: number
  views: string
  avgRating: number
}

export interface IAnimeFilters {
  search: string
  genre: string
  status: string
  seasons: string
}
