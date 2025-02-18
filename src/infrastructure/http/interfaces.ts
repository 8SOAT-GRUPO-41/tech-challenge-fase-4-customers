import type { Controller } from '../controllers/interfaces'

export interface HttpServer {
  listen(port: number): Promise<void>
}

export interface HttpResponse<T = unknown> {
  statusCode: number
  body: T
}

export interface HttpRequest<B = unknown, Q = unknown, P = unknown> {
  body: B
  query: Q
  params: P
  headers?: Record<string, unknown>
}

type Schema = {
  tags: string[]
  summary: string
  body?: {
    type: string
    properties: Record<string, unknown>
    examples?: Record<string, unknown>[]
    required: string[]
  }
  response: Record<string, unknown>
}

export interface HttpRoute {
  method: 'get' | 'post' | 'put' | 'delete' | 'patch'
  url: string
  handler: () => Controller
  schema?: Schema
}
