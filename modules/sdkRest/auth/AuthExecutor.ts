import type { Connector } from '../types/Connector'
import type { AuthDefinition, AuthLoginPayload } from './AuthDefinition'

export class AuthExecutor implements AuthDefinition {
  constructor(private readonly connector: Connector) {}
  login(payload: AuthLoginPayload): Promise<any> {
    return this.connector.execute({
      resource: 'auth/login',
      method: 'POST',
      payload,
    })
  }

  logout(): Promise<any> {
    return this.connector.execute({
      resource: 'auth/logout',
      method: 'POST',
    })
  }

  async me(): Promise<{ id: number; email: string } | null> {
    const res = await this.connector.execute<{ id: number; email: string }>({
      resource: 'auth/me',
      method: 'GET',
    })
    return res.success ? res.data : null
  }
}
