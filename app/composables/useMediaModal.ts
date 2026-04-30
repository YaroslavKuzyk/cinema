import type {
  IMediaDetails,
  TMediaType,
} from '~/components/Public/MediaDetails/index.types'

const DETAILS_QUERY_KEY = 'details'
const VALID_TYPES: TMediaType[] = ['movie', 'series', 'anime']

function parseDetailsQuery(value: unknown): { type: TMediaType, id: string } | null {
  if (typeof value !== 'string') return null
  const sep = value.indexOf(':')
  if (sep <= 0) return null
  const type = value.slice(0, sep)
  const id = value.slice(sep + 1)
  if (!id) return null
  if (!VALID_TYPES.includes(type as TMediaType)) return null
  return { type: type as TMediaType, id }
}

export function useMediaModal() {
  const route = useRoute()
  const router = useRouter()

  const cached = useState<IMediaDetails | null>('media-modal:cached', () => null)

  const params = computed(() => parseDetailsQuery(route.query[DETAILS_QUERY_KEY]))

  const current = computed<IMediaDetails | null>(() => {
    if (!params.value) return null
    if (
      cached.value
      && cached.value.type === params.value.type
      && cached.value.id === params.value.id
    ) {
      return cached.value
    }
    return null
  })

  const isOpen = computed({
    get: () => params.value !== null,
    set: (value: boolean) => {
      if (!value) close()
    },
  })

  function open(details: IMediaDetails) {
    cached.value = details
    const query = { ...route.query, [DETAILS_QUERY_KEY]: `${details.type}:${details.id}` }
    router.push({ path: route.path, query, hash: route.hash })
  }

  function close() {
    cached.value = null
    const { [DETAILS_QUERY_KEY]: _omit, ...query } = route.query
    router.push({ path: route.path, query, hash: route.hash })
  }

  return { current, isOpen, params, open, close }
}
