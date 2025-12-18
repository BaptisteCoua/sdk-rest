import { RestConnector } from '~~/modules/sdkRest/transport/RestConnector'

export default defineNuxtPlugin(() => {
  const runtimeConfig = useRuntimeConfig()

  if(!runtimeConfig.public.apiBase) return

  const connector = new RestConnector(
    runtimeConfig.public.apiBase as string,
  )

  return {
    provide: {
      connector,
    },
  }
})
