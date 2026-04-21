import type { IUserForm, UserFormMode, IUserActivityStats } from '../domain'

export function useAdminUserForm(mode: Ref<UserFormMode>) {
  const { t } = useI18n()

  const isReadonly = computed(() => mode.value === 'view')
  const isCreate = computed(() => mode.value === 'create')

  const form = reactive<IUserForm>({
    firstName: mode.value !== 'create' ? 'Олександр' : '',
    lastName: mode.value !== 'create' ? 'Петренко' : '',
    email: mode.value !== 'create' ? 'olexandr@gmail.com' : '',
    phone: mode.value !== 'create' ? '+380 67 123 4567' : '',
    status: mode.value !== 'create' ? 'active' : 'active',
    country: mode.value !== 'create' ? 'Україна' : '',
    language: mode.value !== 'create' ? 'Українська' : '',
    bio: '',
    isEmailVerified: mode.value !== 'create',
    planId: mode.value !== 'create' ? '3' : '',
    planDuration: mode.value !== 'create' ? '12' : '',
    premiumUntil: mode.value !== 'create' ? '01.01.2027' : '',
    notes: '',
  })

  const activityStats = computed<IUserActivityStats>(() => {
    if (mode.value === 'create') return { watchedHours: 0, favoriteGenre: '—', watchlistCount: 0, commentsCount: 0, ratingsCount: 0, lastActive: '—' }
    return { watchedHours: 342, favoriteGenre: 'Sci-Fi', watchlistCount: 47, commentsCount: 23, ratingsCount: 89, lastActive: '01.04.2026' }
  })

  const statusOptions = computed(() => [
    { title: t('ADMIN_USERS_STATUS_ACTIVE'), value: 'active' },
    { title: t('ADMIN_USERS_STATUS_BANNED'), value: 'banned' },
    { title: t('ADMIN_USERS_STATUS_INACTIVE'), value: 'inactive' },
  ])

  const countryOptions = computed(() => [
    { title: 'Україна', value: 'Україна' },
    { title: 'США', value: 'США' },
    { title: 'Великобританія', value: 'Великобританія' },
    { title: 'Німеччина', value: 'Німеччина' },
    { title: 'Франція', value: 'Франція' },
    { title: 'Канада', value: 'Канада' },
    { title: 'Японія', value: 'Японія' },
  ])

  const languageOptions = computed(() => [
    { title: 'Українська', value: 'Українська' },
    { title: 'English', value: 'English' },
  ])

  const planOptions = computed(() => [
    { title: t('ADMIN_USER_FORM_NO_PLAN'), value: '' },
    { title: 'Free', value: '1' },
    { title: 'Basic — 149 ₴/міс', value: '2' },
    { title: 'Premium — 249 ₴/міс', value: '3' },
    { title: 'Ultra — 399 ₴/міс', value: '4' },
    { title: 'Annual Premium — 2499 ₴/рік', value: '5' },
    { title: 'Lifetime — 9999 ₴', value: '6' },
  ])

  const durationOptions = computed(() => [
    { title: '1 ' + t('ADMIN_USER_FORM_MONTH'), value: '1' },
    { title: '3 ' + t('ADMIN_USER_FORM_MONTHS'), value: '3' },
    { title: '6 ' + t('ADMIN_USER_FORM_MONTHS'), value: '6' },
    { title: '12 ' + t('ADMIN_USER_FORM_MONTHS'), value: '12' },
    { title: t('ADMIN_USER_FORM_UNLIMITED'), value: 'unlimited' },
  ])

  const save = () => { console.log('Save user', toRaw(form)) }

  return {
    form, isReadonly, isCreate, mode,
    activityStats, statusOptions, countryOptions, languageOptions,
    planOptions, durationOptions,
    save,
  }
}
