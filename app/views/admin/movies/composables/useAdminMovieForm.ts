import type { IMovieForm, MovieFormMode, ITranscodeJob, IAudioTrack, ISubtitle, IReadinessItem, ISeason } from '../domain'

export function useAdminMovieForm(mode: Ref<MovieFormMode>) {
  const { t } = useI18n()

  const isReadonly = computed(() => mode.value === 'view')
  const isCreate = computed(() => mode.value === 'create')

  const form = reactive<IMovieForm>({
    contentType: 'single',
    title: mode.value !== 'create' ? 'Інтерстеллар 2: За межею' : '',
    year: mode.value !== 'create' ? '2026' : '',
    rating: mode.value !== 'create' ? '9.1' : '',
    duration: mode.value !== 'create' ? '165' : '',
    ageRestriction: mode.value !== 'create' ? '12+' : '',
    country: mode.value !== 'create' ? 'США' : '',
    language: mode.value !== 'create' ? 'Англійська' : '',
    studio: mode.value !== 'create' ? 'Paramount Pictures' : '',
    description: '',
    genres: mode.value !== 'create' ? [
      { id: '1', label: 'Sci-Fi', variant: 'primary' },
      { id: '2', label: 'Драма', variant: 'primary' },
      { id: '3', label: 'Пригоди', variant: 'primary' },
    ] : [],
    directors: mode.value !== 'create' ? [
      { id: '1', label: 'Christopher Nolan', variant: 'success' },
      { id: '2', label: 'Jonathan Nolan', variant: 'success' },
    ] : [],
    actors: mode.value !== 'create' ? [
      { id: '1', label: 'Matthew McConaughey' },
      { id: '2', label: 'Anne Hathaway' },
      { id: '3', label: 'Jessica Chastain' },
      { id: '4', label: 'Timothée Chalamet' },
    ] : [],
    countries: mode.value !== 'create' ? [
      { id: '1', label: 'США', variant: 'info' },
      { id: '2', label: 'Великобританія', variant: 'info' },
    ] : [],
    posterLarge: '',
    posterSmall: '',
    videoFile: mode.value !== 'create' ? {
      name: 'interstellar_2_beyond_4k_master.mkv',
      format: 'MKV',
      size: '32.4 GB',
      resolution: '3840×2160',
      duration: '165 хв',
      codec: 'H.265',
      uploadedAt: '20.03.2026',
      status: 'done',
    } : null,
    relatedContent: mode.value !== 'create' ? [
      { id: '1', title: 'Інтерстеллар', year: 2014, genre: 'Sci-Fi', image: '' },
      { id: '2', title: 'Гравітація', year: 2013, genre: 'Sci-Fi', image: '' },
      { id: '3', title: 'Марсіанин', year: 2015, genre: 'Sci-Fi', image: '' },
      { id: '4', title: 'Дюна: Частина 2', year: 2024, genre: 'Sci-Fi', image: '' },
      { id: '5', title: 'Прибуття', year: 2016, genre: 'Sci-Fi', image: '' },
      { id: '6', title: 'Ad Astra', year: 2019, genre: 'Sci-Fi', image: '' },
    ] : [],
    seoUrl: mode.value !== 'create' ? '/watch/interstellar-2' : '',
    isPublic: true,
    isFeatured: true,
  })

  const transcodeJobs = ref<ITranscodeJob[]>(mode.value !== 'create' ? [
    { quality: '480p', progress: 100, status: 'done' },
    { quality: '720p', progress: 100, status: 'done' },
    { quality: '1080p', progress: 100, status: 'done' },
    { quality: '4K', progress: 68, status: 'processing' },
  ] : [])

  const audioTracks = ref<IAudioTrack[]>(mode.value !== 'create' ? [
    { id: '1', language: '🇬🇧', label: 'Англійська (Original)', codec: 'AAC 5.1' },
    { id: '2', language: '🇺🇦', label: 'Українська (Дубляж)', codec: 'AAC 5.1' },
  ] : [])

  const subtitles = ref<ISubtitle[]>(mode.value !== 'create' ? [
    { id: '1', language: 'Українська', format: 'SRT', flag: '🇺🇦' },
    { id: '2', language: 'Англійська', format: 'SRT', flag: '🇬🇧' },
  ] : [])

  const seasons = ref<ISeason[]>(mode.value !== 'create' ? [
    {
      id: 's1', number: 1, title: 'Пробудження', premiereDate: '15.01.2026', description: '',
      status: 'published', isCurrent: false, isExpanded: false,
      episodes: Array.from({ length: 12 }, (_, i) => ({
        id: `s1e${i + 1}`, number: i + 1, title: `Епізод ${i + 1}`,
        duration: `${22 + Math.floor(Math.random() * 4)} хв`, size: `${(1 + Math.random()).toFixed(1)} GB`, status: 'uploaded' as const,
      })),
    },
    {
      id: 's2', number: 2, title: 'Хаос', premiereDate: '12.09.2026', description: '',
      status: 'published', isCurrent: false, isExpanded: false,
      episodes: Array.from({ length: 10 }, (_, i) => ({
        id: `s2e${i + 1}`, number: i + 1, title: `Епізод ${i + 1}`,
        duration: `${22 + Math.floor(Math.random() * 4)} хв`, size: `${(1 + Math.random()).toFixed(1)} GB`, status: 'uploaded' as const,
      })),
    },
    {
      id: 's3', number: 3, title: 'Втеча', premiereDate: '15.03.2026',
      description: 'Герої тікають з зруйнованого Токіо через небезпечні території',
      status: 'draft', isCurrent: true, isExpanded: true,
      episodes: [
        { id: 's3e1', number: 1, title: 'Землетрус', duration: '24 хв', size: '1.2 GB', status: 'uploaded' },
        { id: 's3e2', number: 2, title: 'Шлях на захід', duration: '22 хв', size: '1.1 GB', status: 'uploaded' },
        { id: 's3e3', number: 3, title: 'Зона відчуження', duration: '25 хв', size: '1.3 GB', status: 'uploaded' },
        { id: 's3e4', number: 4, title: 'Нічний поїзд', duration: '23 хв', size: '1.2 GB', status: 'uploaded' },
        { id: 's3e5', number: 5, title: 'Останній міст', duration: '24 хв', size: '1.1 GB', status: 'uploaded' },
        { id: 's3e6', number: 6, title: 'Точка неповернення', duration: '26 хв', size: '1.4 GB', status: 'processing' },
        { id: 's3e7', number: 7, title: '', duration: '', size: '', status: 'pending' },
        { id: 's3e8', number: 8, title: '', duration: '', size: '', status: 'pending' },
      ],
    },
    {
      id: 's4', number: 4, title: '', premiereDate: '', description: '',
      status: 'draft', isCurrent: false, isExpanded: false,
      episodes: [],
    },
  ] : [])

  const statusLabel = computed(() => {
    return t('ADMIN_MOVIES_STATUS_DRAFT')
  })

  const ageOptions = computed(() => [
    { title: '0+', value: '0+' },
    { title: '6+', value: '6+' },
    { title: '12+', value: '12+' },
    { title: '16+', value: '16+' },
    { title: '18+', value: '18+' },
  ])

  const countryOptions = computed(() => [
    { title: 'США', value: 'США' },
    { title: 'Великобританія', value: 'Великобританія' },
    { title: 'Канада', value: 'Канада' },
    { title: 'Франція', value: 'Франція' },
    { title: 'Німеччина', value: 'Німеччина' },
    { title: 'Японія', value: 'Японія' },
    { title: 'Корея', value: 'Корея' },
  ])

  const languageOptions = computed(() => [
    { title: 'Англійська', value: 'Англійська' },
    { title: 'Українська', value: 'Українська' },
    { title: 'Японська', value: 'Японська' },
    { title: 'Корейська', value: 'Корейська' },
    { title: 'Французька', value: 'Французька' },
  ])

  const readiness = computed<IReadinessItem[]>(() => [
    { label: t('ADMIN_MOVIE_FORM_READY_TITLE'), done: !!form.title },
    { label: t('ADMIN_MOVIE_FORM_READY_DESC'), done: !!form.description },
    { label: t('ADMIN_MOVIE_FORM_READY_POSTER_LG'), done: !!form.posterLarge },
    { label: t('ADMIN_MOVIE_FORM_READY_POSTER_SM'), done: !!form.posterSmall },
    { label: t('ADMIN_MOVIE_FORM_READY_GENRES', { count: form.genres.length }), done: form.genres.length > 0 },
    { label: t('ADMIN_MOVIE_FORM_READY_VIDEO'), done: !!form.videoFile },
    { label: t('ADMIN_MOVIE_FORM_READY_TRANSCODE'), done: false, progress: 68 },
  ])

  const saveDraft = () => { console.log('Save draft', toRaw(form)) }
  const publish = () => { console.log('Publish', toRaw(form)) }
  const schedulePublish = () => { console.log('Schedule publish') }

  return {
    form, isReadonly, isCreate, mode,
    seasons, transcodeJobs, audioTracks, subtitles,
    statusLabel, ageOptions, countryOptions, languageOptions,
    readiness,
    saveDraft, publish, schedulePublish,
  }
}
