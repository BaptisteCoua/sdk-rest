import { readBody, createError } from 'h3'
import type { PasswordLoginPayload, OAuthLoginPayload } from '~~/modules/sdkRest/auth/AuthDefinition' 

type LoginBody = PasswordLoginPayload | OAuthLoginPayload

const isOAuthLogin = (body: LoginBody): body is OAuthLoginPayload => {
  return body?.type === 'oauth' || (body as OAuthLoginPayload).provider !== undefined
}

const resolveLoginEndpoint = (body: LoginBody): string => {
  return isOAuthLogin(body) ? 'auth/oauth' : 'auth/login'
}

export default defineEventHandler(async (event) => {
  const runtimeConfig = useRuntimeConfig()
  const body = (await readBody(event)) as LoginBody

  if (!body) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing login payload',
    })
  }

  if (isOAuthLogin(body)) {
    if (!body.provider) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Missing OAuth provider',
      })
    }
  } else if (!body.username || !body.password) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing username or password',
    })
  }
  
  try {
    const response = await $fetch<any>(
      `${runtimeConfig.apiBase}/${resolveLoginEndpoint(body)}`,
      {
        method: 'POST',
        body,
      },
    )

    const accessToken = response.token ?? response.accessToken

    await setUserSession(event, {
      user: {
        username: response.username,
        email: response.email,
        firstName: response.firstName,
        lastName: response.lastName,
        gender: response.gender,
        image: response.image,
      },
      accessToken,
    })

    return { ...response, accessToken }
  } catch (err: any) {
    throw createError({
      statusCode: err?.statusCode ?? 500,
      statusMessage: err?.statusMessage ?? 'Login error',
      data: err?.data,
    })
  }
})
