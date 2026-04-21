export type PlanStatus = 'active' | 'hidden'
export type PlanInterval = 'month' | 'year' | 'lifetime'
export type PlanFormMode = 'create' | 'edit' | 'view'

export type FeatureValueType = 'boolean' | 'number' | 'text'

export interface ISystemFeature {
  id: string
  key: string
  label: string
  description: string
  category: string
  valueType: FeatureValueType
}

export interface IPlanFeatureValue {
  featureId: string
  enabled: boolean
  value?: string | number
}

export interface IPlan {
  id: string
  name: string
  slug: string
  description: string
  price: number
  currency: string
  interval: PlanInterval
  color: string
  icon: string
  status: PlanStatus
  usersCount: number
  featureValues: IPlanFeatureValue[]
  isFeatured: boolean
  trialDays: number
}

export interface IPlanStats {
  total: number
  active: number
  totalSubscribers: number
  monthlyRevenue: string
}

export interface IPlanFilters {
  search: string
  status: string
}

export interface IPlanForm {
  name: string
  slug: string
  description: string
  price: string
  currency: string
  interval: PlanInterval
  color: string
  icon: string
  status: PlanStatus
  isFeatured: boolean
  trialDays: string
  featureValues: IPlanFeatureValue[]
}
