import type { IMovie, TMovieCardVariant } from '~/components/Public/MovieCard/index.types'

export interface IMovieRowProps {
  title: string
  items: IMovie[]
  columns?: 3 | 4 | 5 | 6
  variant?: TMovieCardVariant
  numbered?: boolean
  moreLink?: string
}

export interface ICategoryRow {
  key: string
  title: string
  items: IMovie[]
  columns?: 3 | 4 | 5 | 6
  variant?: TMovieCardVariant
  numbered?: boolean
}
