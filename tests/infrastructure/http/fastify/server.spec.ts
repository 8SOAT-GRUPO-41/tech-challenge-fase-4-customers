import type { FastifyInstance } from 'fastify'
import { FastifyHttpServer } from '@/infrastructure/http/fastify/server'

jest.mock('@/infrastructure/http/routes', () => ({
  productRoutes: [
    {
      method: 'get',
      url: '/test',
      schema: {},
      handler: () => jest.fn(() => ({ status: 'ok' }))
    }
  ]
}))

const fakeServer: Partial<FastifyInstance> & { [key: string]: jest.Mock } = {
  listen: jest.fn(),
  get: jest.fn(),
  ready: jest.fn().mockResolvedValue(undefined),
  register: jest.fn().mockReturnThis()
}

jest.mock('fastify', () => {
  return jest.fn(() => fakeServer)
})

describe('FastifyHttpServer', () => {
  let httpServer: FastifyHttpServer

  beforeEach(() => {
    jest.clearAllMocks()
    httpServer = new FastifyHttpServer()
  })

  it('should call buildDocs, buildRoutes, and then listen on the server', async () => {
    const port = 3000

    const buildDocsSpy = jest.spyOn(httpServer as any, 'buildDocs')
    const buildRoutesSpy = jest.spyOn(httpServer as any, 'buildRoutes')

    await httpServer.listen(port)

    expect(buildDocsSpy).toHaveBeenCalled()
    expect(buildRoutesSpy).toHaveBeenCalled()
    expect(fakeServer.ready).toHaveBeenCalled()
    expect(fakeServer.listen).toHaveBeenCalledWith({ port, host: '0.0.0.0' })
  })
})
