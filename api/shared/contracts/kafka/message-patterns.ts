// Identity Service Message Patterns
export const IDENTITY_PATTERNS = {
  // Auth
  AUTH_REGISTER: 'identity.auth.register',
  AUTH_LOGIN: 'identity.auth.login',
  AUTH_REFRESH: 'identity.auth.refresh',
  AUTH_LOGOUT: 'identity.auth.logout',
  AUTH_LOGOUT_ALL: 'identity.auth.logout-all',
  AUTH_ME: 'identity.auth.me',
  AUTH_RESEND_VERIFICATION: 'identity.auth.resend-verification',
  AUTH_VERIFY_EMAIL: 'identity.auth.verify-email',
  AUTH_FORGOT_PASSWORD: 'identity.auth.forgot-password',
  AUTH_RESET_PASSWORD: 'identity.auth.reset-password',

  // Profile
  PROFILE_GET: 'identity.profile.get',
  PROFILE_UPDATE: 'identity.profile.update',

  // Users
  USER_GET_BY_ID: 'identity.users.get-by-id',
} as const;

export type IdentityPattern =
  (typeof IDENTITY_PATTERNS)[keyof typeof IDENTITY_PATTERNS];

// Storage Service Message Patterns
export const STORAGE_PATTERNS = {
  GET_UPLOAD_URL: 'storage.upload-url',
  GET_DOWNLOAD_URL: 'storage.download-url',
  DELETE: 'storage.delete',
} as const;

export type StoragePattern =
  (typeof STORAGE_PATTERNS)[keyof typeof STORAGE_PATTERNS];
