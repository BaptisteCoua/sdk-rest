import { getMethod, getQuery, readBody, createError } from 'h3'
import type { H3Event } from 'h3'

export default defineEventHandler(async (event: H3Event): Promise<unknown> => {
  const runtimeConfig = useRuntimeConfig()

  const session = await requireUserSession(event)
  const method = getMethod(event)
  const query = getQuery(event)
  const body = ['GET', 'HEAD'].includes(method) ? undefined : await readBody(event)

  const { path } = event.context.params as { path: string }

  try {
    return await $fetch<any>(`${runtimeConfig.apiBase}/${path}`, {
      method,
      query,
      body,
      headers: {
        ...(session.accessToken ? { authorization: `Bearer ${session.accessToken}` } : {}),
      },
    })
  } catch (err: any) {
    console.log('proxy error status', err?.statusCode, err?.statusMessage)
    console.log('proxy error data', err?.data)
    throw createError({
      statusCode: err?.statusCode ?? 500,
      statusMessage: err?.statusMessage ?? 'Proxy error',
      data: err?.data,
    })
  }
})
