import { describe, it, expect, vi } from 'vitest'
import { RestConnector } from '../../../modules/sdkRest/transport/RestConnector'

describe('RestConnector', () => {
  it('calls $fetch with resolved url and method', async () => {
    const fetchMock = vi.fn().mockResolvedValue({ id: 1 })
    vi.stubGlobal('$fetch', fetchMock)

    const connector = new RestConnector('https://api.test')

    await connector.execute({
      resource: 'comments/:id',
      method: 'GET',
      params: { id: 1 },
    })

    expect(fetchMock).toHaveBeenCalledWith(
      'https://api.test/comments/1',
      expect.objectContaining({
        method: 'GET',
      }),
    )
  })
})
