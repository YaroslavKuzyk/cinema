import type { ISortState } from '~/components/System/AppTable/index.types'
import type { ITransaction, ITransactionStats, ITransactionFilters } from '../domain'

export function useAdminTransactions() {
  const { t } = useI18n()

  const transactions = ref<ITransaction[]>([])

  // Generate mock transactions
  const names = ['Олександр Петренко', 'Марія Коваленко', 'John Smith', 'Анна Шевченко', 'Дмитро Бондар', 'Emma Wilson', 'Максим Литвин', 'Sophie Müller', 'Тарас Кравченко', 'Юлія Ткаченко', 'Pierre Dubois', 'Катерина Полякова', 'Yuki Tanaka', 'Олена Романенко', 'Наталія Козак']
  const emails = ['olexandr@gmail.com', 'maria.k@gmail.com', 'john.smith@gmail.com', 'anna.sh@ukr.net', 'dmytro.b@gmail.com', 'emma.w@outlook.com', 'max.litvin@gmail.com', 'sophie.m@web.de', 'taras.kr@ukr.net', 'yulia.tk@gmail.com', 'pierre.d@orange.fr', 'kate.p@gmail.com', 'yuki.t@yahoo.jp', 'olena.r@gmail.com', 'natalia.k@gmail.com']
  const plans = ['Basic', 'Premium', 'Ultra', 'Annual Premium', 'Lifetime']
  const prices = [149, 249, 399, 2499, 9999]
  const statuses: ITransaction['status'][] = ['success', 'success', 'success', 'success', 'success', 'success', 'success', 'pending', 'failed', 'refunded']
  const methods: ITransaction['paymentMethod'][] = ['card', 'card', 'card', 'google_pay', 'apple_pay', 'paypal']

  for (let i = 0; i < 85; i++) {
    const planIdx = Math.floor(Math.random() * plans.length)
    const nameIdx = Math.floor(Math.random() * names.length)
    const day = String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')
    const month = String(Math.floor(Math.random() * 4) + 1).padStart(2, '0')
    transactions.value.push({
      id: `txn-${String(i + 1).padStart(4, '0')}`,
      userId: String(nameIdx + 1),
      userName: names[nameIdx],
      userEmail: emails[nameIdx],
      planName: plans[planIdx],
      amount: prices[planIdx],
      currency: 'UAH',
      status: statuses[Math.floor(Math.random() * statuses.length)],
      paymentMethod: methods[Math.floor(Math.random() * methods.length)],
      date: `${day}.${month}.2026`,
      invoiceId: `INV-2026${month}${day}-${String(i + 1).padStart(4, '0')}`,
    })
  }

  const filters = reactive<ITransactionFilters>({ search: '', status: '', method: '', dateRange: null })
  const sortBy = ref<ISortState>({ key: 'date', direction: 'desc' })
  const currentPage = ref(1)
  const itemsPerPage = ref(10)

  const stats = computed<ITransactionStats>(() => {
    const all = transactions.value
    const success = all.filter((t) => t.status === 'success')
    const totalRev = success.reduce((sum, t) => sum + t.amount, 0)
    const monthlyRev = success.filter((t) => t.date.includes('.04.2026')).reduce((sum, t) => sum + t.amount, 0)
    const refunds = all.filter((t) => t.status === 'refunded').length
    const avgCheck = success.length ? Math.round(totalRev / success.length) : 0
    return {
      totalRevenue: `${(totalRev / 1000).toFixed(0)}K ₴`,
      monthlyRevenue: `${(monthlyRev / 1000).toFixed(0)}K ₴`,
      totalTransactions: all.length,
      successRate: `${success.length ? Math.round((success.length / all.length) * 100) : 0}%`,
      refunds,
      avgCheck: `${avgCheck} ₴`,
    }
  })

  const filteredTransactions = computed(() => {
    let result = transactions.value.filter((tx) => {
      const matchesSearch = !filters.search || tx.userName.toLowerCase().includes(filters.search.toLowerCase()) || tx.userEmail.toLowerCase().includes(filters.search.toLowerCase()) || tx.invoiceId.toLowerCase().includes(filters.search.toLowerCase())
      const matchesStatus = !filters.status || tx.status === filters.status
      const matchesMethod = !filters.method || tx.paymentMethod === filters.method
      return matchesSearch && matchesStatus && matchesMethod
    })
    if (sortBy.value) {
      const { key, direction } = sortBy.value
      const mult = direction === 'asc' ? 1 : -1
      result = [...result].sort((a, b) => {
        const aVal = a[key as keyof ITransaction]; const bVal = b[key as keyof ITransaction]
        if (typeof aVal === 'number' && typeof bVal === 'number') return (aVal - bVal) * mult
        return String(aVal).localeCompare(String(bVal), 'uk') * mult
      })
    }
    return result
  })

  const paginatedTransactions = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value
    return filteredTransactions.value.slice(start, start + itemsPerPage.value)
  })

  const statusOptions = computed(() => [
    { title: t('ADMIN_TX_FILTER_ALL'), value: '' },
    { title: t('ADMIN_TX_STATUS_SUCCESS'), value: 'success' },
    { title: t('ADMIN_TX_STATUS_PENDING'), value: 'pending' },
    { title: t('ADMIN_TX_STATUS_FAILED'), value: 'failed' },
    { title: t('ADMIN_TX_STATUS_REFUNDED'), value: 'refunded' },
  ])

  const methodOptions = computed(() => [
    { title: t('ADMIN_TX_FILTER_ALL'), value: '' },
    { title: t('ADMIN_TX_METHOD_CARD'), value: 'card' },
    { title: t('ADMIN_TX_METHOD_GOOGLE'), value: 'google_pay' },
    { title: t('ADMIN_TX_METHOD_APPLE'), value: 'apple_pay' },
    { title: t('ADMIN_TX_METHOD_PAYPAL'), value: 'paypal' },
  ])

  const updateSort = (sort: ISortState) => { sortBy.value = sort }

  return {
    transactions, filters, sortBy, currentPage, itemsPerPage,
    stats, filteredTransactions, paginatedTransactions,
    statusOptions, methodOptions, updateSort,
  }
}
