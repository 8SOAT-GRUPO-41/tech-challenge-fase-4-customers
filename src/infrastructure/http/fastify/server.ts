import fastify, { type FastifyInstance } from 'fastify'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUI from '@fastify/swagger-ui'
import swaggerConfig from '@/infrastructure/swagger/swagger-config'
import { customerRoutes } from '@/infrastructure/http/routes'
import type { HttpServer } from '@/infrastructure/http/interfaces'
import { adaptFastifyRoute } from './adapter'

export class FastifyHttpServer implements HttpServer {
  private server: FastifyInstance

  constructor() {
    this.server = fastify({
      logger:
        process.env.NODE_ENV === 'development'
          ? {
              transport: {
                target: 'pino-pretty'
              },
              level: 'debug'
            }
          : true
    })
  }

  private async buildRoutes(): Promise<void> {
    const routes = [...customerRoutes]
    const apiPrefix = '/customers'
    for (const route of routes) {
      this.server[route.method](
        `${apiPrefix}${route.url}`,
        { schema: route.schema },
        adaptFastifyRoute(route.handler())
      )
    }
  }

  private async buildDocs(): Promise<void> {
    await this.server
      .register(fastifySwagger, {
        openapi: swaggerConfig
      })
      .register(fastifySwaggerUI, {
        routePrefix: '/customers-docs'
      })
  }

  async listen(port: number): Promise<void> {
    await this.buildDocs()
    await this.buildRoutes()
    await this.server.ready()
    this.server.listen({ port, host: '0.0.0.0' })
  }
}
