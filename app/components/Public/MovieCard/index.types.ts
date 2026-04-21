export interface IMovie {
  id: string
  title: string
  meta: string
  image: string
  progress?: number
  badge?: string
}

export type TMovieCardVariant = 'wide' | 'poster'

export interface IMovieCardProps {
  item: IMovie
  variant?: TMovieCardVariant
  rank?: number
}
