import { describe, it, expect, vi } from 'vitest'
import type { Connector } from '../../../modules/sdkRest/types/Connector'
import  {ResourceExecutor} from '../../../modules/sdkRest/resource/ResourceExecutor'

describe('ResourceExecutor', () => {
  const executeMock = vi.fn()

  const connector: Connector = {
    execute: executeMock,
  }

  const resource = new ResourceExecutor('comments', connector)

  it('calls GET details with id', async () => {
    executeMock.mockResolvedValueOnce({
      success: true,
      data: { id: 1 },
    })

    const result = await resource.details({ id: 1 })

    expect(executeMock).toHaveBeenCalledWith({
      resource: 'comments/:id',
      method: 'GET',
      params: { id: 1 },
    })

    expect(result).toEqual({ id: 1 })
  })

  it('throws when response is not successful', async () => {
    executeMock.mockResolvedValueOnce({
      success: false,
      error: { message: 'Boom' },
    })

    await expect(resource.details({ id: 1 })).rejects.toEqual(
      expect.objectContaining({ message: 'Boom' }),
    )
  })
})
