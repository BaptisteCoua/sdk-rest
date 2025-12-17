import type { Connector, ApiRequest, ApiResponse } from '../types/Connector'
import { Operation } from '../types/Connector'

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
      operation: Operation.READ,
    })

    return response
  }

  async search(params?: ResourceSearchQuery): Promise<T[]> {
    const response = await this.execute<T[]>({
      resource: this.resource,
      query: params?.query,
      operation: Operation.READ,
    })

    return response
  }

  async create(payload: Partial<T>): Promise<T> {
    const response = await this.execute<T>({
      resource: this.resource,
      payload,
      operation: Operation.CREATE,
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
      operation: Operation.UPDATE,
    })

    return response
  }

  async delete(params: ResourceIdentifier): Promise<void> {
    await this.execute({
      resource: `${this.resource}/:id`,
      params,
      operation: Operation.DELETE,
    })
  }
  
  private async execute<R>(input: {
    resource: string
    params?: Record<string, string | number>
    query?: Record<string, string | number | boolean>
    payload?: unknown
    operation: Operation
  }): Promise<R> {
    const request: ApiRequest = {
      resource: input.resource,
      params: input.params,
      query: input.query,
      payload: input.payload,
      metadata: {
        operation: input.operation,
      },
    }

    const response: ApiResponse<R> =
      await this.connector.execute<R>(request)

    if (!response.success) {
      throw response.error
    }

    return response.data as R
  }
}
