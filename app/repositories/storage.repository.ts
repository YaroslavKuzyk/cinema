import type { $Fetch } from 'ofetch'

export interface IUploadUrlRequest {
  fileName: string
  contentType: string
  folder?: string
}

export interface IUploadUrlResponse {
  url: string
  key: string
  expiresAt: string
}

export interface IDownloadUrlRequest {
  key: string
}

export interface IDownloadUrlResponse {
  url: string
  key: string
  expiresAt: string
}

export class StorageRepository {
  constructor(private readonly api: $Fetch) {}

  getUploadUrl(payload: IUploadUrlRequest) {
    return this.api<IUploadUrlResponse>('/storage/upload-url', {
      method: 'POST',
      body: payload
    })
  }

  getDownloadUrl(payload: IDownloadUrlRequest) {
    return this.api<IDownloadUrlResponse>('/storage/download-url', {
      method: 'POST',
      body: payload
    })
  }

  delete(key: string) {
    return this.api(`/storage/${key}`, {
      method: 'DELETE'
    })
  }
}
