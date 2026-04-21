import type { ISortState } from '~/components/System/AppTable/index.types'
import type { IUser, IUserStats, IUserFilters } from '../domain'

export function useAdminUsers() {
  const { t } = useI18n()

  const users = ref<IUser[]>([
    { id: '1', firstName: 'Олександр', lastName: 'Петренко', email: 'olexandr@gmail.com', avatar: '', status: 'active', registeredAt: '01.01.2025', lastLogin: '01.04.2026', watchedHours: 342, country: 'Україна' },
    { id: '2', firstName: 'Марія', lastName: 'Коваленко', email: 'maria.k@gmail.com', avatar: '', status: 'active', registeredAt: '15.02.2025', lastLogin: '02.04.2026', watchedHours: 567, country: 'Україна' },
    { id: '3', firstName: 'John', lastName: 'Smith', email: 'john.smith@gmail.com', avatar: '', status: 'active', registeredAt: '10.03.2025', lastLogin: '30.03.2026', watchedHours: 89, country: 'США' },
    { id: '4', firstName: 'Анна', lastName: 'Шевченко', email: 'anna.sh@ukr.net', avatar: '', status: 'banned', registeredAt: '20.04.2025', lastLogin: '15.02.2026', watchedHours: 156, country: 'Україна' },
    { id: '5', firstName: 'Дмитро', lastName: 'Бондар', email: 'dmytro.b@gmail.com', avatar: '', status: 'active', registeredAt: '05.05.2025', lastLogin: '31.03.2026', watchedHours: 45, country: 'Україна' },
    { id: '6', firstName: 'Emma', lastName: 'Wilson', email: 'emma.w@outlook.com', avatar: '', status: 'active', registeredAt: '12.06.2025', lastLogin: '29.03.2026', watchedHours: 234, country: 'Великобританія' },
    { id: '7', firstName: 'Ірина', lastName: 'Мельник', email: 'iryna.m@gmail.com', avatar: '', status: 'inactive', registeredAt: '18.07.2025', lastLogin: '10.01.2026', watchedHours: 12, country: 'Україна' },
    { id: '8', firstName: 'Максим', lastName: 'Литвин', email: 'max.litvin@gmail.com', avatar: '', status: 'active', registeredAt: '25.08.2025', lastLogin: '02.04.2026', watchedHours: 789, country: 'Україна' },
    { id: '9', firstName: 'Sophie', lastName: 'Müller', email: 'sophie.m@web.de', avatar: '', status: 'active', registeredAt: '03.09.2025', lastLogin: '28.03.2026', watchedHours: 67, country: 'Німеччина' },
    { id: '10', firstName: 'Тарас', lastName: 'Кравченко', email: 'taras.kr@ukr.net', avatar: '', status: 'active', registeredAt: '14.10.2025', lastLogin: '01.04.2026', watchedHours: 198, country: 'Україна' },
    { id: '11', firstName: 'Юлія', lastName: 'Ткаченко', email: 'yulia.tk@gmail.com', avatar: '', status: 'active', registeredAt: '22.11.2025', lastLogin: '30.03.2026', watchedHours: 34, country: 'Україна' },
    { id: '12', firstName: 'Pierre', lastName: 'Dubois', email: 'pierre.d@orange.fr', avatar: '', status: 'active', registeredAt: '01.12.2025', lastLogin: '25.03.2026', watchedHours: 78, country: 'Франція' },
    { id: '13', firstName: 'Василь', lastName: 'Грищенко', email: 'vasyl.g@gmail.com', avatar: '', status: 'banned', registeredAt: '10.01.2026', lastLogin: '05.02.2026', watchedHours: 5, country: 'Україна' },
    { id: '14', firstName: 'Катерина', lastName: 'Полякова', email: 'kate.p@gmail.com', avatar: '', status: 'active', registeredAt: '18.01.2026', lastLogin: '02.04.2026', watchedHours: 145, country: 'Україна' },
    { id: '15', firstName: 'Андрій', lastName: 'Савченко', email: 'andriy.s@ukr.net', avatar: '', status: 'active', registeredAt: '25.01.2026', lastLogin: '01.04.2026', watchedHours: 56, country: 'Україна' },
    { id: '16', firstName: 'Олена', lastName: 'Романенко', email: 'olena.r@gmail.com', avatar: '', status: 'active', registeredAt: '02.02.2026', lastLogin: '02.04.2026', watchedHours: 423, country: 'Україна' },
    { id: '17', firstName: 'David', lastName: 'Johnson', email: 'david.j@gmail.com', avatar: '', status: 'inactive', registeredAt: '10.02.2026', lastLogin: '01.02.2026', watchedHours: 3, country: 'Канада' },
    { id: '18', firstName: 'Наталія', lastName: 'Козак', email: 'natalia.k@gmail.com', avatar: '', status: 'active', registeredAt: '20.02.2026', lastLogin: '31.03.2026', watchedHours: 167, country: 'Україна' },
    { id: '19', firstName: 'Сергій', lastName: 'Марченко', email: 'serhiy.m@ukr.net', avatar: '', status: 'active', registeredAt: '01.03.2026', lastLogin: '30.03.2026', watchedHours: 28, country: 'Україна' },
    { id: '20', firstName: 'Yuki', lastName: 'Tanaka', email: 'yuki.t@yahoo.jp', avatar: '', status: 'active', registeredAt: '10.03.2026', lastLogin: '29.03.2026', watchedHours: 312, country: 'Японія' },
  ])

  const filters = reactive<IUserFilters>({ search: '', status: '', country: '' })
  const sortBy = ref<ISortState>({ key: 'registeredAt', direction: 'desc' })
  const selectedRows = ref<string[]>([])
  const currentPage = ref(1)
  const itemsPerPage = ref(10)

  const stats = computed<IUserStats>(() => {
    const all = users.value
    return {
      total: all.length,
      active: all.filter((u) => u.status === 'active').length,
      banned: all.filter((u) => u.status === 'banned').length,
      newThisMonth: all.filter((u) => u.registeredAt.includes('.03.2026') || u.registeredAt.includes('.04.2026')).length,
      totalWatchHours: `${(all.reduce((sum, u) => sum + u.watchedHours, 0) / 1000).toFixed(1)}K`,
    }
  })

  const filteredUsers = computed(() => {
    let result = users.value.filter((u) => {
      const matchesSearch = !filters.search || `${u.firstName} ${u.lastName}`.toLowerCase().includes(filters.search.toLowerCase()) || u.email.toLowerCase().includes(filters.search.toLowerCase())
      const matchesStatus = !filters.status || u.status === filters.status
      const matchesCountry = !filters.country || u.country === filters.country
      return matchesSearch && matchesStatus && matchesCountry
    })
    if (sortBy.value) {
      const { key, direction } = sortBy.value
      const mult = direction === 'asc' ? 1 : -1
      result = [...result].sort((a, b) => {
        const aVal = a[key as keyof IUser]; const bVal = b[key as keyof IUser]
        if (typeof aVal === 'number' && typeof bVal === 'number') return (aVal - bVal) * mult
        return String(aVal).localeCompare(String(bVal), 'uk') * mult
      })
    }
    return result
  })

  const paginatedUsers = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value
    return filteredUsers.value.slice(start, start + itemsPerPage.value)
  })

  const statusOptions = computed(() => [
    { title: t('ADMIN_USERS_FILTER_ALL'), value: '' },
    { title: t('ADMIN_USERS_STATUS_ACTIVE'), value: 'active' },
    { title: t('ADMIN_USERS_STATUS_BANNED'), value: 'banned' },
    { title: t('ADMIN_USERS_STATUS_INACTIVE'), value: 'inactive' },
  ])

  const countryOptions = computed(() => [
    { title: t('ADMIN_USERS_FILTER_ALL'), value: '' },
    { title: 'Україна', value: 'Україна' },
    { title: 'США', value: 'США' },
    { title: 'Великобританія', value: 'Великобританія' },
    { title: 'Німеччина', value: 'Німеччина' },
    { title: 'Франція', value: 'Франція' },
    { title: 'Канада', value: 'Канада' },
    { title: 'Японія', value: 'Японія' },
  ])

  const updateSort = (sort: ISortState) => { sortBy.value = sort }
  const bulkBan = () => { users.value = users.value.map((u) => selectedRows.value.includes(u.id) ? { ...u, status: 'banned' as const } : u); selectedRows.value = [] }
  const bulkActivate = () => { users.value = users.value.map((u) => selectedRows.value.includes(u.id) ? { ...u, status: 'active' as const } : u); selectedRows.value = [] }
  const bulkDelete = () => { users.value = users.value.filter((u) => !selectedRows.value.includes(u.id)); selectedRows.value = [] }

  return {
    users, filters, sortBy, selectedRows, currentPage, itemsPerPage,
    stats, filteredUsers, paginatedUsers,
    statusOptions, countryOptions,
    updateSort, bulkBan, bulkActivate, bulkDelete,
  }
}
