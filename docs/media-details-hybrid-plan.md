# Hybrid Media Details — план (модалка + SEO-сторінка)

Повертайся сюди коли будеш готовий імплементувати SEO-сторінки для фільмів, серіалів, аніме.

## Мета

Зробити так, щоб:
- Картка на листингу відкриває деталі як модалку (швидкий перегляд).
- Існували реальні URL `/movies/[id]`, `/series/[id]`, `/anime/[id]` для SEO, share-лінків, direct-visit.
- Контент (hero, опис, сезони, схожі) був один — і в модалці, і на сторінці.

## Ключове питання перед кодом — що обрати

### Варіант 1: Query-param (живий фон під модалкою)

```
Картка на /uk/movies → клік → /uk/movies?details=movie:id123
→ листинг ЖИВИЙ під модалкою (не розмонтовується)
→ закриття модалки прибирає ?details з URL
```

**Реалізація:** `useMediaModal.open(item)` робить `router.push({ query: { details: ... } })`. Route не змінюється, компонент не перемонтовується, модалка рендериться поверх.

- ✅ Листинг живий під модалкою — справжнє Netflix-відчуття
- ✅ Back-button / share / refresh працюють
- ⚠️ URL не такий чистий: `/movies?details=abc` замість `/movies/abc`
- ℹ️ Окремі сторінки `/movies/[id]` все одно потрібні для direct-visit + SEO
- ℹ️ На listing-сторінках при відкритій модалці — `<link rel="canonical" href="/movies">` щоб Google не індексував дублі

### Варіант 2: History state (чистий URL, чорний фон під модалкою)

```
Картка на /uk/movies → клік → /uk/movies/id123 з state.modal=true
→ Vue Router розмонтовує листинг (стандартна поведінка)
→ /movies/[id].vue рендерить <AppModal> з PublicMediaDetails
→ під модалкою — чорний overlay AppModal, НЕ листинг
→ закриття → router.back() → листинг перерендерюється
```

**Реалізація:**
```ts
// card click
navigateTo(`/movies/${id}`, { state: { modal: true } })

// /movies/[id].vue
const data = await useMediaDetails('movie', route.params.id)
const asModal = computed(() => history.state?.modal === true)
```

```vue
<AppModal v-if="asModal" model-value flush @closed="$router.back()">
  <PublicMediaDetails :current="data" />
</AppModal>
<PublicMediaDetails v-else :current="data" class="full-page" />
```

- ✅ Чисті URL `/movies/[id]`
- ✅ Direct-visit / refresh → повна сторінка автоматично (бо `history.state.modal` відсутній)
- ✅ Back-button повертає на листинг
- ⚠️ Під модалкою — чорний backdrop AppModal, не живий листинг. Nuxt не має intercepting routes як Next.js.
- ℹ️ Критично: перевірити що `history.state` доступний у SSR (він порожній на сервері — треба `onMounted` або `v-if="isClient && asModal"`)

### Чому не можна "живий фон + чистий URL"

Nuxt/Vue Router не підтримують Next.js-style intercepting routes (`(..)movies/[id]`). При зміні route завжди розмонтовується попередній компонент. Є хаки (`<keep-alive>`, власний `<NuxtPage>`-wrapper з кешем VNode), але вони ламаються на SSR і з i18n.

**Можливий компроміс:** `history.pushState` напряму (в обхід Vue Router) — листинг лишається живий, URL чистий, але втрачаємо Router guards, i18n-прекси, SSR для direct-visit. Не рекомендую.

### Рекомендація

Якщо UX на першому місці → **варіант 1 (query-param)**.
Якщо чистота URL важлива і OK з темним фоном → **варіант 2 (history state)**.

## Файлова структура (спільна для обох варіантів)

**Нові файли:**
```
app/components/Public/MediaDetails/
  index.vue            — весь UI з MediaModal (hero, інфо, сезони, схожі)
  index.types.ts       — перенести IMediaDetails сюди

app/composables/
  useMediaDetails.ts   — fetch деталей за (type, id), SSR-safe через useAsyncData

app/pages/
  movies/[id].vue      — SSR-сторінка з PublicMediaDetails + SEO meta + JSON-LD
  series/[id].vue
  anime/[id].vue
```

**Змінюється:**
```
app/components/Public/MediaModal/index.vue
  — стає тонкою обгорткою навколо PublicMediaDetails

app/composables/useMediaModal.ts
  — open/close через router.push (query-param або navigateTo зі state)
  — current/isOpen computed з route

Усі *Page.vue (Home/Movies/Series/Anime/MyList)
  — передають item з правильним id та type в open()
```

## Послідовність імплементації

1. Винести `IMediaDetails` в `app/components/Public/MediaDetails/index.types.ts`.
2. Створити `PublicMediaDetails` (копія розмітки з `MediaModal`, без `<AppModal>`-обгортки).
3. Переписати `MediaModal` на тонку обгортку `<AppModal flush><PublicMediaDetails/></AppModal>`.
4. Створити `useMediaDetails(type, id)` — `useAsyncData` з ключем `media-${type}-${id}`, дані з mocks.
5. Переписати `useMediaModal` на обраний спосіб (query-param або history state).
6. Створити `app/pages/movies/[id].vue`, `series/[id].vue`, `anime/[id].vue` — SSR fetch + SEO meta + JSON-LD.
7. Додати кнопку "Детальніше" в модалці → `<NuxtLink>` на повну сторінку.
8. На listing-сторінках (при відкритій модалці) — canonical-тег на base URL.

## JSON-LD

Structured data для Google — rich results (картки з рейтингом/роком у пошуку).

### Варіант A: Модуль `nuxt-schema-org` (частина `@nuxtjs/seo`)

Встановити `@nuxtjs/seo`, включити SchemaOrg. Дає типізовані `defineMovie`, `defineTvSeries`.

```ts
useSchemaOrg([
  defineMovie({
    name: data.title,
    image: data.image,
    description: data.description,
    datePublished: String(data.year),
    director: data.info.find(i => i.label === 'Режисер')?.value,
    actor: data.info.find(i => i.label === 'Актори')?.value?.split(', '),
    aggregateRating: {
      ratingValue: data.rating,
      bestRating: 10,
      ratingCount: 1000,
    },
  }),
])
```

Плюси: типи, автокомпліт, інтеграція з `@nuxtjs/sitemap`.
Мінуси: +~30KB, ще один модуль.

### Варіант B: Вручну через `useHead`

```ts
useHead({
  script: [{
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Movie', // або 'TVSeries' для серіалів/аніме
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
    }),
  }],
})
```

Плюси: нульова залежність.
Мінуси: без типів, ручна валідація через [Google Rich Results Test](https://search.google.com/test/rich-results).

### Типи schema.org

- `Movie` — для фільмів
- `TVSeries` — для серіалів І аніме (Schema.org не має окремого типу для аніме). Поля: `numberOfSeasons`, `numberOfEpisodes`.
- `TVSeason`, `TVEpisode` — якщо хочеш розмітити окремі сезони/епізоди (опційно, для глибокої індексації).

### SEO meta (на кожній `[id].vue`)

```ts
useSeoMeta({
  title: () => `${data.value?.title} — Cinema`,
  description: () => data.value?.description,
  ogTitle: () => data.value?.title,
  ogDescription: () => data.value?.description,
  ogImage: () => data.value?.image,
  ogType: 'video.movie', // або 'video.tv_show'
  twitterCard: 'summary_large_image',
})
```

## Канонікалізація

Проблема: при query-param підході на `/movies?details=abc` і `/movies/abc` контент однаковий → дубль для Google.

Рішення: на listing-сторінках коли є `?details=`, додати:
```ts
useHead({
  link: [{
    rel: 'canonical',
    href: () => `${baseUrl}${route.path}`, // без query
  }],
})
```

А на `/movies/[id]` canonical = сам URL.

## i18n

Роути автоматично матимуть префікс (`/uk/movies/[id]`, `/en/movies/[id]`) бо `strategy: 'prefix'` в `nuxt.config.ts`. Додати `hreflang`-теги:

```ts
useHead({
  link: [
    { rel: 'alternate', hreflang: 'uk', href: `${baseUrl}/uk${route.path}` },
    { rel: 'alternate', hreflang: 'en', href: `${baseUrl}/en${route.path}` },
    { rel: 'alternate', hreflang: 'x-default', href: `${baseUrl}/uk${route.path}` },
  ],
})
```

## Робочі рішення для обговорення / прийняття

- [ ] **Query-param vs history-state** — обрати один.
- [ ] **`nuxt-schema-org` vs ручний JSON-LD** — обрати один.
- [ ] **URL-схема** — `/movies/[id]` (slug як id) чи `/movies/[slug]` (human-readable)? Для SEO краще slug.
- [ ] **Джерело даних** — наразі `useMediaMocks`. При переході на API — `useMediaDetails` треба буде перевести на `$fetch`/`useFetch`.
- [ ] **Sitemap** — `@nuxtjs/sitemap` (частина `@nuxtjs/seo`) для автогенерації з детальними URL-ами.
