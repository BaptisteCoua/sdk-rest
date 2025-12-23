// modules/sdkRest/auth/AuthProvider.ts
export interface AuthProvider {
  getAuthHeaders(): Promise<Record<string, string>>
}