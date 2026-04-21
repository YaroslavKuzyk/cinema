import type { IDashboardStats, IViewsChartData, IDashboardActivity, IDashboardContent, ISubscriptionStats, ITopContent, IPlatformStats } from '../domain'

export function useAdminDashboard() {
  

  const chartPeriod = ref<'7d' | '30d' | '90d' | 'year'>('30d')

  const stats = reactive<IDashboardStats>({
    activeUsers: 124892,
    activeUsersChange: 12.5,
    monthlyRevenue: '₴2.4M',
    revenueChange: 8.3,
    monthlyViews: '3.8M',
    viewsChange: 23.1,
    totalContent: 1248,
    contentChange: 2.1,
  })

  const chartData = computed<IViewsChartData[]>(() => {
    
    const labels = chartPeriod.value === '7d'
      ? ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Нд']
      : chartPeriod.value === '30d'
        ? ['1 бер', '8 бер', '15 бер', '22 бер', '30 бер']
        : chartPeriod.value === '90d'
          ? ['Січ', 'Лют', 'Бер']
          : ['Кв1', 'Кв2', 'Кв3', 'Кв4']
    return labels.map((label) => ({
      label,
      value: 40 + Math.floor(Math.random() * 60),
    }))
  })

  const activities = ref<IDashboardActivity[]>([
    { id: '1', text: 'опубліковано', highlight: 'Інтерстеллар 2', time: '5 хв', dotColor: 'success' },
    { id: '2', text: 'нових реєстрацій', highlight: '342', time: '1 год', dotColor: 'info' },
    { id: '3', text: 'на модерації', highlight: 'Attack on Titan S4', time: '2 год', dotColor: 'warning' },
    { id: '4', text: 'скарги на контент', highlight: '3', time: '3 год', dotColor: 'danger' },
    { id: '5', text: 'завантажено', highlight: 'Гра престолів S6', time: '5 год', dotColor: 'success' },
    { id: '6', text: 'Оновлення серверу v2.4.1', highlight: '', time: '8 год', dotColor: 'info' },
    { id: '7', text: 'план: +89 підписок', highlight: 'Premium', time: '12 год', dotColor: 'purple' },
  ])

  const recentContent = ref<IDashboardContent[]>([
    { id: '1', title: 'Інтерстеллар 2', type: 'Фільм', genre: 'Sci-Fi', status: 'published', statusVariant: 'success', views: '1.2M', rating: 8.7, date: '19.03.2026' },
    { id: '2', title: 'Гра престолів: Нова ера', type: 'Серіал', genre: 'Фентезі', status: 'published', statusVariant: 'success', views: '892K', rating: 9.1, date: '18.03.2026' },
    { id: '3', title: 'Jujutsu Kaisen S3', type: 'Аніме', genre: 'Shonen', status: 'draft', statusVariant: 'basic', views: '', rating: null, date: '20.03.2026' },
    { id: '4', title: 'Останній рейс', type: 'Фільм', genre: 'Екшн', status: 'published', statusVariant: 'success', views: '654K', rating: 8.2, date: '15.03.2026' },
    { id: '5', title: 'Тінь вогню', type: 'Серіал', genre: 'Трилер', status: 'archived', statusVariant: 'info', views: '234K', rating: 7.8, date: '10.03.2026' },
  ])

  const subscriptions = reactive<ISubscriptionStats>({
    basic: 4231,
    standard: 6892,
    premium: 3769,
    conversion: '67.4%',
    churn: '2.1%',
  })

  const topContent = ref<ITopContent[]>([
    { id: '1', rank: 1, title: 'Інтерстеллар 2', meta: 'Sci-Fi · Фільм', views: '1.2M' },
    { id: '2', rank: 2, title: 'Гра престолів', meta: 'Фентезі · Серіал', views: '892K' },
    { id: '3', rank: 3, title: 'Останній рейс', meta: 'Екшн · Фільм', views: '654K' },
    { id: '4', rank: 4, title: 'Jujutsu Kaisen', meta: 'Shonen · Аніме', views: '531K' },
  ])

  const platforms = ref<IPlatformStats[]>([
    { name: 'Smart TV', percentage: '42.3%' },
    { name: 'Mobile', percentage: '28.7%' },
    { name: 'Web', percentage: '18.4%' },
    { name: 'Tablet', percentage: '6.8%' },
    { name: 'Console', percentage: '3.8%' },
  ])

  return {
    stats, chartPeriod, chartData, activities, recentContent,
    subscriptions, topContent, platforms,
  }
}
