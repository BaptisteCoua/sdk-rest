export type PasswordLoginPayload = {
  type?: 'password'
  username: string
  password: string
}

export type OAuthLoginPayload = {  
  type: 'oauth'
  provider?: string
  accessToken?: string
  idToken?: string
  redirectUri?: string
  azureCode?: string
  azureSessionState?: string
}

export type AuthLoginPayload = PasswordLoginPayload | OAuthLoginPayload

export interface AuthDefinition {
  login(payload: AuthLoginPayload): Promise<void>
  logout(): Promise<void>
  me(): Promise<{ id: number; email: string } | null>
}
