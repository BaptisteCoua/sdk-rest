import { RestConnector } from '~~/modules/sdkRest/transport/RestConnector'

export default defineNuxtPlugin(() => {
  const runtimeConfig = useRuntimeConfig()

  // SSR: forward headers/cookies du contexte de requête
  const fetcher = import.meta.server ? useRequestFetch() : $fetch
  const connector = new RestConnector(runtimeConfig.public.apiBase as string, fetcher)

  return { 
    provide: { 
      connector 
    } 
  }
})
