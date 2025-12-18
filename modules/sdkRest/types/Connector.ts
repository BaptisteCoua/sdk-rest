import type { ResourceIdentifier, ResourceSearchQuery } from "../resource/ResourceDefinition"

export interface ApiRequest {
  resource: string
  method: HttpMethod
  params?: ResourceIdentifier | ResourceSearchQuery
  query?: Record<string, string | number | boolean>
  payload?: Serializable
  metadata?: {
    headers?: Record<string, string>
    timeoutMs?: number
  }
}

type Serializable =
  | Record<string, any>
  | Array<any>


export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  error?: ApiError
}

export interface ApiError {
  code: string
  message: string
  cause?: unknown
  retryable?: boolean
}

export interface Connector {
  execute<T = unknown>(request: ApiRequest): Promise<ApiResponse<T>>
}

export const HttpMethod = {
  READ: 'GET',
  CREATE: 'POST',
  UPDATE: 'PUT',
  DELETE: 'DELETE',
} as const

export type HttpMethod = typeof HttpMethod[keyof typeof HttpMethod]

