import type { IMediaDetails } from '~/components/Public/MediaModal/index.types'

export function useMediaModal() {
  const current = useState<IMediaDetails | null>('media-modal:current', () => null)

  const isOpen = computed({
    get: () => current.value !== null,
    set: (value: boolean) => {
      if (!value) current.value = null
    },
  })

  function open(details: IMediaDetails) {
    current.value = details
  }

  function close() {
    current.value = null
  }

  return { current, isOpen, open, close }
}
