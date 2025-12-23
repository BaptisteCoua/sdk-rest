// app/plugins/sdkRest.ts
import { RestConnector } from '~~/modules/sdkRest/transport/RestConnector'
import { NuxtAuthProvider } from '~/sdk/NuxtAuthProvider'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  if (!config.public.apiBase) return

  const authProvider = new NuxtAuthProvider()

  const connector = new RestConnector(
    config.public.apiBase,
    authProvider
  )

  return {
    provide: { connector },
  }
})
