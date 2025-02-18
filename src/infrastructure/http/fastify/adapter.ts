import type { FastifyReply, FastifyRequest, RouteHandlerMethod } from 'fastify'
import type { Controller } from '@/infrastructure/controllers/interfaces'
import { HttpErrorHandler } from '@/infrastructure/http/error-handler'

const adaptFastifyErrorHandler = (error: unknown, request: FastifyRequest, reply: FastifyReply): FastifyReply => {
  request.log.error(error)

  const decoupledHandler = new HttpErrorHandler()
  const httpResponse = decoupledHandler.handle(error)
  return reply.status(httpResponse.statusCode).send(httpResponse.body)
}

export const adaptFastifyRoute = (controller: Controller): RouteHandlerMethod => {
  return async (request, reply) => {
    try {
      const httpResponse = await controller.handle({
        body: request.body,
        params: request.params,
        query: request.query
      })
      return reply.status(httpResponse.statusCode).send(httpResponse.body)
    } catch (error) {
      return adaptFastifyErrorHandler(error, request, reply)
    }
  }
}
