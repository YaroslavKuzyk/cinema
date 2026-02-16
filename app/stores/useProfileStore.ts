import type { IProfile } from '~/domain'

// Domain State
// - Зберігання глобальних даних
// - Source of truth
// - НЕ містить UI state (isLoading, form state)

export const useProfileStore = defineStore('profile', () => {
  const profileApi = useProfileApi()

  const profile = ref<IProfile | null>(null)

  async function fetchProfile(): Promise<void> {
    try {
      profile.value = await profileApi.get()
    } catch {
      profile.value = null
    }
  }

  function setProfile(data: IProfile) {
    profile.value = data
  }

  function clear() {
    profile.value = null
  }

  return {
    profile,
    fetchProfile,
    setProfile,
    clear
  }
})
