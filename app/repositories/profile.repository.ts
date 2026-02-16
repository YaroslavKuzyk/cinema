import type { $Fetch } from 'ofetch'
import type { IProfileRepository, IProfile, IUpdateProfilePayload } from '~/domain'

export class ProfileRepository implements IProfileRepository {
  constructor(private readonly api: $Fetch) {}

  get() {
    return this.api<IProfile>('/profile')
  }

  update(payload: IUpdateProfilePayload) {
    return this.api<IProfile>('/profile', {
      method: 'PATCH',
      body: payload
    })
  }
}
