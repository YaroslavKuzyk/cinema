import type { Ref } from 'vue'
import type {
  IMediaDetails,
  TMediaType,
} from '~/components/Public/MediaDetails/index.types'

export function useMediaSeo(details: Ref<IMediaDetails | null | undefined>, type: TMediaType) {
  const route = useRoute()
  const url = useRequestURL()
  const origin = url.origin

  const canonical = computed(() => `${origin}${route.path}`)

  const ogType = type === 'movie' ? 'video.movie' : 'video.tv_show'

  useSeoMeta({
    title: () => details.value?.title ? `${details.value.title} — Cinema` : 'Cinema',
    description: () => details.value?.description ?? '',
    ogTitle: () => details.value?.title ?? '',
    ogDescription: () => details.value?.description ?? '',
    ogImage: () => details.value?.image ?? '',
    ogType,
    twitterCard: 'summary_large_image',
    twitterTitle: () => details.value?.title ?? '',
    twitterDescription: () => details.value?.description ?? '',
    twitterImage: () => details.value?.image ?? '',
  })

  const alternateLinks = computed(() => {
    // Strip any leading locale prefix, then rebuild per locale.
    const basePath = route.path.replace(/^\/(en|uk)(?=\/|$)/, '') || '/'
    const withLocale = (locale: string) => `${origin}/${locale}${basePath === '/' ? '' : basePath}`

    return [
      { rel: 'canonical', href: canonical.value },
      { rel: 'alternate', hreflang: 'uk', href: withLocale('uk') },
      { rel: 'alternate', hreflang: 'en', href: withLocale('en') },
      { rel: 'alternate', hreflang: 'x-default', href: withLocale('uk') },
    ]
  })

  const schemaScript = computed(() => {
    const data = details.value
    if (!data) return []

    const director = data.info.find(r => /director|режисер/i.test(r.label))?.value
    const actors = data.info.find(r => /cast|актор/i.test(r.label))?.value?.split(/,\s*/).filter(Boolean)

    const payload: Record<string, unknown> = {
      '@context': 'https://schema.org',
      '@type': type === 'movie' ? 'Movie' : 'TVSeries',
      name: data.title,
      image: data.image,
      description: data.description,
      datePublished: String(data.year),
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: data.rating,
        bestRating: 10,
        ratingCount: 1000,
      },
    }

    if (director) payload.director = director
    if (actors?.length) payload.actor = actors

    if (type !== 'movie' && data.seasons?.length) {
      payload.numberOfSeasons = data.seasons.length
      payload.numberOfEpisodes = data.seasons.reduce(
        (sum, s) => sum + (s.episodes?.length ?? 0),
        0,
      )
    }

    return [{
      type: 'application/ld+json',
      innerHTML: JSON.stringify(payload),
    }]
  })

  useHead({
    link: () => alternateLinks.value,
    script: () => schemaScript.value,
  })
}
