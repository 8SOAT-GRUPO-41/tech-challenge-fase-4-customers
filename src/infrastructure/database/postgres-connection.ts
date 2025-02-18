import { Pool, type PoolClient } from 'pg'
import type { DatabaseConnection } from './database-connection'

export class PostgresDatabaseConnection implements DatabaseConnection {
  private static instance: PostgresDatabaseConnection | null = null
  private pool: Pool

  private constructor() {
    this.pool = new Pool({
      user: process.env.DB_USER,
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      password: process.env.DB_PASSWORD,
      port: Number(process.env.DB_PORT)
    })
  }

  static getInstance(): PostgresDatabaseConnection {
    if (!PostgresDatabaseConnection.instance) {
      PostgresDatabaseConnection.instance = new PostgresDatabaseConnection()
    }

    return PostgresDatabaseConnection.instance
  }

  async query<T = unknown>(sql: string, params: unknown[] = []): Promise<T[]> {
    const client = await this.pool.connect()
    try {
      const result = await client.query(sql, params)
      return result.rows
    } catch (error) {
      console.error('Query error:', error)
      throw new Error('Error executing query')
    } finally {
      client.release()
    }
  }

  async transaction<T>(fn: (client: PoolClient) => Promise<T>): Promise<T> {
    const client = await this.pool.connect()
    try {
      await client.query('BEGIN')
      const result = await fn(client)
      await client.query('COMMIT')
      return result
    } catch (error) {
      await client.query('ROLLBACK')
      console.error('Transaction error:', error)
      throw error
    } finally {
      client.release()
    }
  }
}
