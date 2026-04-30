export function useListingCanonical() {
  const route = useRoute()
  const url = useRequestURL()
  const origin = url.origin

  useHead({
    link: () => [{ rel: 'canonical', href: `${origin}${route.path}` }],
  })
}
