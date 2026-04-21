import type { IMovie } from '~/components/Public/MovieCard/index.types'
import type { IHeroFeatured } from '~/components/Public/Hero/index.types'
import type { IGenreTile } from '~/components/Public/GenresRow/index.types'

export type IHomeFeatured = IHeroFeatured
export type IHomeGenre = IGenreTile

export interface IHomeRow {
  title: string
  items: IMovie[]
}
