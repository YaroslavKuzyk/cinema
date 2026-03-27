import type {
  IAdminAccountPersonalInfo,
  IAdminAccountSecurity,
  IAdminAccountNotifications,
  IAdminSession,
  IAdminActivity,
  IAdminAccountStats,
  IAdminAccountInfo,
  IAdminAccountTab,
} from '../domain'

export function useAdminAccount() {
  const { t } = useI18n()

  const isReadonly = ref(true)
  const activeTab = ref('profile')

  // Personal Info
  const personalInfo = reactive<IAdminAccountPersonalInfo>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    about: '',
  })

  // Security
  const security = reactive<IAdminAccountSecurity>({
    currentPassword: '',
    newPassword: '',
    is2faEnabled: false,
    isEmailLoginEnabled: false,
  })

  // Notifications
  const notifications = reactive<IAdminAccountNotifications>({
    emailNotifications: true,
    pushNotifications: false,
    dailyDigest: true,
    marketingEmails: false,
  })

  // Stats (mock data)
  const stats = reactive<IAdminAccountStats>({
    actionsPerMonth: 1247,
    contentAdded: 342,
    daysActive: 89,
  })

  // Account Info (mock data)
  const accountInfo = reactive<IAdminAccountInfo>({
    role: 'Super Admin',
    status: 'online',
    joinedAt: '01.01.2026',
    lastLogin: 'now',
    is2faEnabled: true,
    ipAddress: '194.28.xxx.xxx',
  })

  // Sessions (mock data)
  const sessions = ref<IAdminSession[]>([
    {
      id: '1',
      device: 'macOS',
      browser: 'Chrome 122',
      location: 'Kyiv, Ukraine',
      ipAddress: '194.28.xxx.xxx',
      lastActive: 'now',
      isCurrent: true,
    },
    {
      id: '2',
      device: 'iOS 18',
      browser: 'Safari',
      location: 'Kyiv, Ukraine',
      ipAddress: '194.28.xxx.xxx',
      lastActive: '2h',
      isCurrent: false,
    },
  ])

  // Activities (mock data)
  const activities = ref<IAdminActivity[]>([
    {
      id: '1',
      type: 'published',
      description: 'фільм "Інтерстеллар 2"',
      timestamp: '12m',
      dotColor: 'success',
    },
    {
      id: '2',
      type: 'edited',
      description: 'серіал "Втеча з Токіо" — Сезон 3',
      timestamp: '28m',
      dotColor: 'info',
    },
    {
      id: '3',
      type: 'deleted',
      description: '42 спам-коментарі',
      timestamp: '1h',
      dotColor: 'danger',
    },
    {
      id: '4',
      type: 'blocked',
      description: 'користувача @spam_bot_123',
      timestamp: '1h',
      dotColor: 'purple',
    },
    {
      id: '5',
      type: 'created',
      description: 'жанр "Кіберпанк"',
      timestamp: '3h',
      dotColor: 'warning',
    },
    {
      id: '6',
      type: 'invited',
      description: 'адміна taras@gmail.com',
      timestamp: '5h',
      dotColor: 'muted',
    },
    {
      id: '7',
      type: 'updated',
      description: 'налаштування плеєра',
      timestamp: 'yesterday:22:15',
      dotColor: 'info',
    },
  ])

  // Tabs
  const tabs = computed<IAdminAccountTab[]>(() => [
    { title: t('ADMIN_ACCOUNT_TAB_PROFILE'), value: 'profile' },
    { title: t('ADMIN_ACCOUNT_TAB_SECURITY'), value: 'security' },
    { title: t('ADMIN_ACCOUNT_TAB_NOTIFICATIONS'), value: 'notifications' },
    { title: t('ADMIN_ACCOUNT_TAB_SESSIONS'), value: 'sessions' },
  ])

  // Actions
  const toggleEditMode = () => {
    isReadonly.value = !isReadonly.value
  }

  const savePersonalInfo = async () => {
    // TODO: Implement API call
    console.log('Saving personal info:', personalInfo)
    isReadonly.value = true
  }

  const saveSecurity = async () => {
    // TODO: Implement API call
    console.log('Saving security settings:', security)
    isReadonly.value = true
  }

  const saveNotifications = async () => {
    // TODO: Implement API call
    console.log('Saving notification settings:', notifications)
    isReadonly.value = true
  }

  const endSession = async (sessionId: string) => {
    // TODO: Implement API call
    console.log('Ending session:', sessionId)
    sessions.value = sessions.value.filter((s) => s.id !== sessionId)
  }

  const logoutAllDevices = async () => {
    // TODO: Implement API call
    console.log('Logging out from all devices')
  }

  const deactivateAccount = async () => {
    // TODO: Implement API call
    console.log('Deactivating account')
  }

  return {
    // State
    isReadonly: readonly(isReadonly),
    activeTab,
    personalInfo,
    security,
    notifications,
    stats: readonly(stats),
    accountInfo: readonly(accountInfo),
    sessions: computed(() => sessions.value),
    activities: computed(() => activities.value),
    tabs,

    // Actions
    toggleEditMode,
    savePersonalInfo,
    saveSecurity,
    saveNotifications,
    endSession,
    logoutAllDevices,
    deactivateAccount,
  }
}
