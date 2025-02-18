import { config } from 'dotenv'
import { FastifyHttpServer } from '@/infrastructure/http/fastify/server'
import { MongoDBConnection } from './infrastructure/database/mongo-connection'
config()

export const server = new FastifyHttpServer()

MongoDBConnection.getInstance()
  .open()
  .then(() => {
    server.listen(+(process.env.PORT || 3000))
  })
  .catch((error) => {
    console.error('Error starting server:', error)
  })
