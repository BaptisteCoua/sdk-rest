import type { Connector } from '../types/Connector'
import { ResourceExecutor } from './ResourceExecutor'
import type { ResourceDefinition } from './ResourceDefinition'
import { useNuxtApp } from 'nuxt/app'

export function defineResource<T>(resource: string) {
  return function useResource(): ResourceDefinition<T> {
    const { $connector } = useNuxtApp()

    if (!$connector) {
      throw new Error('[sdkRest] Connector not available')
    }

    return new ResourceExecutor<T>(resource, $connector as Connector)
  }
}
