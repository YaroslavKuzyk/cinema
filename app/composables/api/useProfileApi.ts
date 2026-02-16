import { ProfileRepository } from '~/repositories'
import type { IUpdateProfilePayload } from '~/domain'

// Application Layer
// - Адаптація repository до Vue runtime
// - НЕ містить UI-логіки, form-state, global state

export function useProfileApi() {
  const { $api } = useNuxtApp()
  const profileRepo = new ProfileRepository($api)

  return {
    get: () => profileRepo.get(),
    update: (payload: IUpdateProfilePayload) => profileRepo.update(payload)
  }
}
