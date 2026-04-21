export type MovieStatus = 'published' | 'moderation' | 'draft'

export interface IMovie {
  id: string
  title: string
  director: string
  duration: number
  image: string
  genre: string
  year: number
  status: MovieStatus
  views: string
  rating: number | null
}

export interface IMovieStats {
  total: number
  published: number
  drafts: number
  moderation: number
  views: string
  avgRating: number
}

export interface IMovieFilters {
  search: string
  genre: string
  status: string
  year: string
}
