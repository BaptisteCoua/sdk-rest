export interface AuthDefinition {
  login(payload: { email: string; password: string }): Promise<void>
  logout(): Promise<void>
  me(): Promise<{ id: number; email: string } | null>
}