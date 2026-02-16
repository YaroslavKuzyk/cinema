import { StorageRepository } from '~/repositories/storage.repository'
import type { IUploadUrlRequest, IDownloadUrlRequest } from '~/repositories/storage.repository'

export function useStorageApi() {
  const { $api } = useNuxtApp()
  const storageRepo = new StorageRepository($api)

  async function uploadFile(file: File, folder?: string): Promise<string> {
    const { url, key } = await storageRepo.getUploadUrl({
      fileName: file.name,
      contentType: file.type,
      folder
    })

    // Use native fetch to avoid ofetch adding extra headers
    const response = await fetch(url, {
      method: 'PUT',
      body: file,
      mode: 'cors'
    })

    if (!response.ok) {
      throw new Error(`Upload failed: ${response.status} ${response.statusText}`)
    }

    return key
  }

  async function getFileUrl(key: string): Promise<string> {
    const { url } = await storageRepo.getDownloadUrl({ key })
    return url
  }

  return {
    getUploadUrl: (payload: IUploadUrlRequest) => storageRepo.getUploadUrl(payload),
    getDownloadUrl: (payload: IDownloadUrlRequest) => storageRepo.getDownloadUrl(payload),
    delete: (key: string) => storageRepo.delete(key),
    uploadFile,
    getFileUrl
  }
}
