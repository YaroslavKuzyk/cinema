import type { IAccountUser } from '../domain'

export function useAccountUser() {
  const user = useState<IAccountUser>('account-user', () => ({
    firstName: 'Ярослав',
    lastName: 'Кузик',
    email: 'yaroslav@cinema.ua',
    phoneCountry: '+380',
    phoneNumber: '97 123 45 67',
    avatarColor: 'var(--color-primary)',
    initials: 'ЯК',
  }))

  const fullName = computed(() => `${user.value.firstName} ${user.value.lastName}`.trim())

  function update(patch: Partial<IAccountUser>) {
    user.value = { ...user.value, ...patch }
  }

  return { user, fullName, update }
}
