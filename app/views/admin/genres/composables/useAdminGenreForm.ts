import type { IGenreForm, GenreFormMode, IGenreContentStats } from '../domain'

export function useAdminGenreForm(mode: Ref<GenreFormMode>) {
  const { t } = useI18n()

  const isReadonly = computed(() => mode.value === 'view')
  const isCreate = computed(() => mode.value === 'create')

  const form = reactive<IGenreForm>({
    name: mode.value !== 'create' ? 'Екшн' : '',
    slug: mode.value !== 'create' ? 'action' : '',
    description: mode.value !== 'create' ? 'Бойовики, перестрілки, гонитви, вибухи та напружені сцени. Жанр для тих, хто любить адреналін та динамічний сюжет.' : '',
    icon: mode.value !== 'create' ? '🔥' : '',
    color: mode.value !== 'create' ? '#E50914' : '#E50914',
    status: mode.value !== 'create' ? 'active' : 'active',
    seoTitle: mode.value !== 'create' ? 'Екшн фільми та серіали — дивитися онлайн | Cinema' : '',
    seoDescription: mode.value !== 'create' ? 'Найкращі екшн фільми, серіали та аніме. Дивіться онлайн в HD якості на Cinema.' : '',
  })

  const contentStats = computed<IGenreContentStats>(() => {
    if (mode.value === 'create') return { movies: 0, series: 0, anime: 0, total: 0 }
    return { movies: 342, series: 87, anime: 64, total: 493 }
  })

  const colorPresets = [
    '#E50914', '#3B82F6', '#A855F7', '#22C55E', '#FBBF24', '#EC4899',
    '#F97316', '#6366F1', '#14B8A6', '#EF4444', '#6B7280', '#0EA5E9',
  ]

  const iconOptions = [
    '🔥', '🚀', '😈', '🎭', '😂', '👻', '💕', '🎨', '📚', '🗺️',
    '🔍', '🐉', '⚔️', '🌙', '🌟', '🎵', '🎬', '🏆', '👽', '🧙',
  ]

  const statusOptions = computed(() => [
    { title: t('ADMIN_GENRE_FORM_STATUS_ACTIVE'), value: 'active' },
    { title: t('ADMIN_GENRE_FORM_STATUS_HIDDEN'), value: 'hidden' },
  ])

  const generateSlug = () => {
    if (form.name && !isReadonly.value) {
      form.slug = form.name
        .toLowerCase()
        .replace(/[а-яієїґ]/g, (c) => {
          const map: Record<string, string> = { а: 'a', б: 'b', в: 'v', г: 'h', ґ: 'g', д: 'd', е: 'e', є: 'ye', ж: 'zh', з: 'z', и: 'y', і: 'i', ї: 'yi', й: 'y', к: 'k', л: 'l', м: 'm', н: 'n', о: 'o', п: 'p', р: 'r', с: 's', т: 't', у: 'u', ф: 'f', х: 'kh', ц: 'ts', ч: 'ch', ш: 'sh', щ: 'shch', ь: '', ю: 'yu', я: 'ya' }
          return map[c] || c
        })
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '')
    }
  }

  const save = () => { console.log('Save genre', toRaw(form)) }
  const publish = () => { console.log('Publish genre', toRaw(form)) }

  return {
    form, isReadonly, isCreate, mode,
    contentStats, colorPresets, iconOptions, statusOptions,
    generateSlug, save, publish,
  }
}
