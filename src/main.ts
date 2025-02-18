import { config } from 'dotenv'
import { FastifyHttpServer } from '@/infrastructure/http/fastify/server'
config()

export const server = new FastifyHttpServer()
server.listen(+(process.env.PORT || 3000))
