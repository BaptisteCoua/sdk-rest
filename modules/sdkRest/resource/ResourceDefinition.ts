export interface ResourceIdentifier {
  id: string | number
}
export interface ResourceSearchQuery {
  page?: number
  limit?: number
  query?: Record<string, string | number | boolean>
}

export interface ResourceDefinition<T> {
  details(params?: ResourceIdentifier): Promise<T>
  
  search(params?: ResourceSearchQuery): Promise<T[]>

  create(payload: Partial<T>): Promise<T>

  update(params: ResourceIdentifier, payload: Partial<T>): Promise<T>
  
  delete(params: ResourceIdentifier): Promise<void>
}
