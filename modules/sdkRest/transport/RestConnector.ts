import type { Connector, ApiRequest, ApiResponse, ApiError} from '../types/Connector'

export class RestConnector implements Connector {
  constructor(private readonly connector: string) {}

  async execute<T = unknown>(request: ApiRequest): Promise<ApiResponse<T>> {
    try {
      const url = this.buildUrl(request)

      const data = await $fetch<T>(url, {
        method: request.method,
        body: request.payload,
        query: request.query,
        headers: request.metadata?.headers,
        timeout: request.metadata?.timeoutMs,
      })

      return { success: true, data }
    } catch (error: any) {
      return {
        success: false,
        error: this.mapError(error),
      }
    }
  }


  private buildUrl(request: ApiRequest): string {
    let path = request.resource
    if (request.params) {
      for (const [key, value] of Object.entries(request.params)) {
        path = path.replace(
          `:${key}`,
          encodeURIComponent(String(value)),
        )
      }
    } else {
       path = path.replace(/\/:[^/]+$/, '')
    }
    return `${this.connector}/${path}`
  }

  private mapError(error: any): ApiError {
    return {
      code: error?.statusCode?.toString() ?? 'NETWORK_ERROR',
      message: error?.message ?? 'Unexpected REST error',
      cause: error,
      retryable: error?.statusCode >= 500,
    }
  }
}
