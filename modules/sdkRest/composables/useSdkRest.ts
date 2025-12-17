import { useNuxtApp } from 'nuxt/app'

export function useSdkRest() {
  const { $connector } = useNuxtApp()

  if (!$connector) {
    throw new Error('[sdkRest] Connector is not available')
  }

  return $connector
}
