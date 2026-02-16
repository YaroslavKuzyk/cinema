export interface IProfile {
  userId: string
  keyword: string | null
  description: string | null
  state: string | null
  createdAt: Date
  updatedAt: Date
}

export interface IUpdateProfilePayload {
  keyword?: string
  description?: string
  state?: string
  avatarKey?: string | null
}

export interface IProfileRepository {
  get(): Promise<IProfile>
  update(payload: IUpdateProfilePayload): Promise<IProfile>
}
