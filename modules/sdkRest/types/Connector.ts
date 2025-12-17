export interface ApiRequest {
  resource: string
  params?: Record<string, string | number>
  query?: Record<string, string | number | boolean>
  payload?: unknown
  metadata?: {
    operation: Operation
    timeoutMs?: number
    headers?: Record<string, string>
  }
}

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


export const Operation = {
  READ: 'read',
  CREATE: 'create',
  UPDATE: 'update',
  DELETE: 'delete',
} as const

export type Operation = typeof Operation[keyof typeof Operation]

