import type { IMovie } from '~/components/Public/MovieCard/index.types'

export type TMyListFilter = 'all' | 'movies' | 'series' | 'anime'

export interface IMyListStats {
  movies: number
  series: number
  anime: number
}

export interface IMyListFilterOption {
  key: TMyListFilter
  label: string
  count: number
}

export type TMyListCategory = 'movies' | 'series' | 'anime'

export interface IMyListItem extends IMovie {
  category: TMyListCategory
}
