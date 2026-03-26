export { default as LoginPage } from './LoginPage.vue'
export { default as RegisterPage } from './RegisterPage.vue'
export { default as ForgotPasswordPage } from './ForgotPasswordPage.vue'
export { default as ResetPasswordPage } from './ResetPasswordPage.vue'

export const routes = {
    login: 'auth-login',
    register: 'auth-register',
    forgotPassword: 'auth-forgot-password',
    resetPassword: 'auth-reset-password',
}