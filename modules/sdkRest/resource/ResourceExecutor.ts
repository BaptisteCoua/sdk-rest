import type { Connector, ApiRequest, ApiResponse } from '../types/Connector'
import { HttpMethod } from '../types/Connector'

import type {
  ResourceDefinition,
  ResourceIdentifier,
  ResourceSearchQuery,
} from './ResourceDefinition'

export class ResourceExecutor<T> implements ResourceDefinition<T> {
  constructor(
    private readonly resource: string,
    private readonly connector: Connector,
  ) {}

  async details(params: ResourceIdentifier): Promise<T> {
    const response = await this.execute<T>({
      resource: `${this.resource}/:id`,
      params,
      method: HttpMethod.READ
    })

    return response
  }

  async search(params?: ResourceSearchQuery): Promise<T[]> {
    const response = await this.execute<T[]>({
      resource: this.resource,
      query: params?.query,
      method: HttpMethod.READ
    })

    return response
  }

  async create(payload: Partial<T>): Promise<T> {
    const response = await this.execute<T>({
      resource: this.resource,
      payload,
      method: HttpMethod.CREATE
    })

    return response
  }

  async update(
    params: ResourceIdentifier,
    payload: Partial<T>,
  ): Promise<T> {
    const response = await this.execute<T>({
      resource: `${this.resource}/:id`,
      params,
      payload,
      method: HttpMethod.UPDATE
    })

    return response
  }

  async delete(params: ResourceIdentifier): Promise<void> {
    await this.execute({
      resource: `${this.resource}/:id`,
      params,
      method: HttpMethod.DELETE
    })
  }
  
  private async execute<R>(input: {
    resource: string
    method: HttpMethod
    params?: ResourceIdentifier | ResourceSearchQuery
    query?: Record<string, string | number | boolean>
    payload?: unknown
  }): Promise<R> {
    const request: ApiRequest = {
      resource: input.resource,
      method: input.method,
      params: input.params,
      query: input.query,
      payload: input.payload,
    }

    const response: ApiResponse<R> =
      await this.connector.execute<R>(request)

    if (!response.success) {
      throw response.error
    }

    return response.data as R
  }
}
