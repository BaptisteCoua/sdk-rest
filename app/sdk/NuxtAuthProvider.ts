import type { AuthProvider } from '~~/modules/sdkRest/auth/AuthProvider'

export class NuxtAuthProvider implements AuthProvider {
  async getAuthHeaders() {
    const session = useUserSession()
    const token = session.value?.secure?.apiToken

    return token
      ? { Authorization: `Bearer ${token}` }
      : {}
  }
}
