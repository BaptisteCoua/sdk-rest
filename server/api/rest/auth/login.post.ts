import { readBody, createError } from 'h3'

type LoginBody = {
  username?: string
  password?: string
}

export default defineEventHandler(async (event) => {
  const runtimeConfig = useRuntimeConfig()
  const body = (await readBody(event)) as LoginBody

  if (!body?.username || !body?.password) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing username or password',
    })
  }
  
  try {
    const response = await $fetch<any>(
      `${runtimeConfig.apiBase}/auth/login`,
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
