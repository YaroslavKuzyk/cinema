export type TransactionStatus = 'success' | 'pending' | 'failed' | 'refunded'
export type PaymentMethod = 'card' | 'google_pay' | 'apple_pay' | 'paypal'

export interface ITransaction {
  id: string
  userId: string
  userName: string
  userEmail: string
  planName: string
  amount: number
  currency: string
  status: TransactionStatus
  paymentMethod: PaymentMethod
  date: string
  invoiceId: string
}

export interface ITransactionStats {
  totalRevenue: string
  monthlyRevenue: string
  totalTransactions: number
  successRate: string
  refunds: number
  avgCheck: string
}

export interface ITransactionFilters {
  search: string
  status: string
  method: string
  dateRange: Date[] | null
}
