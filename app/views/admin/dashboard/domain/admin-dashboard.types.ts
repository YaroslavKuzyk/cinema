export interface IDashboardStats {
  activeUsers: number
  activeUsersChange: number
  monthlyRevenue: string
  revenueChange: number
  monthlyViews: string
  viewsChange: number
  totalContent: number
  contentChange: number
}

export interface IViewsChartData {
  label: string
  value: number
}

export interface IDashboardActivity {
  id: string
  text: string
  highlight: string
  time: string
  dotColor: string
}

export interface IDashboardContent {
  id: string
  title: string
  type: string
  genre: string
  status: string
  statusVariant: string
  views: string
  rating: number | null
  date: string
}

export interface ISubscriptionStats {
  basic: number
  standard: number
  premium: number
  conversion: string
  churn: string
}

export interface ITopContent {
  id: string
  rank: number
  title: string
  meta: string
  views: string
}

export interface IPlatformStats {
  name: string
  percentage: string
}
