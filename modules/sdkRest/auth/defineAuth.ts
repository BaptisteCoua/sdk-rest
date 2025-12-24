import { useNuxtApp } from 'nuxt/app'
import { AuthExecutor } from './AuthExecutor'

export function defineAuth() {
  return function useAuth() {
    const { $connector } = useNuxtApp()
    if (!$connector) throw new Error('[sdkRest] Connector not available')
    return new AuthExecutor($connector)
  }
}
