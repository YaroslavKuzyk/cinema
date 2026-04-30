import type {
  IMediaDetails,
  TMediaType,
} from '~/components/Public/MediaDetails/index.types'

export async function useMediaDetails(type: TMediaType, id: string) {
  const mocks = useMediaMocks()

  const { data } = await useAsyncData<IMediaDetails | null>(
    `media-${type}-${id}`,
    () => {
      if (type === 'movie') return Promise.resolve(mocks.movie.value)
      if (type === 'series') return Promise.resolve(mocks.series.value)
      if (type === 'anime') return Promise.resolve(mocks.anime.value)
      return Promise.resolve(null)
    },
  )

  return { data }
}
