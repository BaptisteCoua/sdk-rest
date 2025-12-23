export default defineEventHandler(async (event) => {
    
  const body = await readBody(event)

  const response = await $fetch<{
    access_token: string
  }>('https://api.escuelajs.co/api/v1/auth/login', {
    method: 'POST',
    body,
  })

  await setUserSession(event, {
    user: {
        login: 'Baptiste',
        apiToken: response.access_token
    },
    loggedInAt: new Date()
  })

  return { ok: true }
})
