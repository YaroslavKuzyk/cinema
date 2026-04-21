export type GenreStatus = 'active' | 'hidden'

export interface IGenre {
  id: string
  name: string
  description: string
  icon: string
  color: string
  slug: string
  status: GenreStatus
  moviesCount: number
  seriesCount: number
  animeCount: number
}

export interface IGenreStats {
  total: number
  active: number
  hidden: number
  popular: number
  totalContent: number
}

export interface IGenreFilters {
  search: string
  status: string
  sort: string
}
