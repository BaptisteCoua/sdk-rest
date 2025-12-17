import { RestConnector } from ''

export default defineNuxtPlugin(() => {
  const runtimeConfig = useRuntimeConfig()

  const connector = new RestConnector(
    runtimeConfig.public.apiBaseUrl,
  )

  return {
    provide: {
      connector,
    },
  }
})
