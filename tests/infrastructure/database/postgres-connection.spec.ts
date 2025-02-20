import type { PoolClient } from 'pg'
import { PostgresDatabaseConnection } from '@/infrastructure/database/postgres-connection'

describe('PostgresDatabaseConnection', () => {
  let db: PostgresDatabaseConnection
  let fakePool: { connect: jest.Mock }
  let fakeClient: Partial<PoolClient>

  beforeEach(() => {
    ;(PostgresDatabaseConnection as any).instance = null

    fakeClient = {
      query: jest.fn(),
      release: jest.fn()
    }

    fakePool = {
      connect: jest.fn().mockResolvedValue(fakeClient)
    }

    db = PostgresDatabaseConnection.getInstance()
    ;(db as any).pool = fakePool
  })

  describe('getInstance', () => {
    it('should always return the same instance', () => {
      const instance1 = PostgresDatabaseConnection.getInstance()
      const instance2 = PostgresDatabaseConnection.getInstance()
      expect(instance1).toBe(instance2)
    })
  })

  describe('query', () => {
    it('should execute a query and return rows', async () => {
      const fakeRows = [{ id: 1 }]
      ;(fakeClient.query as jest.Mock).mockResolvedValue({ rows: fakeRows })
      const sql = 'SELECT * FROM users'
      const params: unknown[] = []

      const result = await db.query(sql, params)

      expect(fakePool.connect).toHaveBeenCalled()
      expect(fakeClient.query).toHaveBeenCalledWith(sql, params)
      expect(fakeClient.release).toHaveBeenCalled()
      expect(result).toEqual(fakeRows)
    })

    it('should throw an error if query execution fails', async () => {
      const error = new Error('Query failed')
      ;(fakeClient.query as jest.Mock).mockRejectedValue(error)
      const sql = 'SELECT * FROM users'

      await expect(db.query(sql)).rejects.toThrow('Error executing query')
      expect(fakeClient.release).toHaveBeenCalled()
    })
  })

  describe('transaction', () => {
    it('should commit the transaction and return the result on success', async () => {
      const fakeResult = { success: true }
      ;(fakeClient.query as jest.Mock)
        .mockResolvedValueOnce(null) // BEGIN
        .mockResolvedValueOnce(null) // COMMIT

      const fn = jest.fn().mockResolvedValue(fakeResult)
      const result = await db.transaction(fn)

      expect(fakePool.connect).toHaveBeenCalled()
      expect(fakeClient.query).toHaveBeenCalledWith('BEGIN')
      expect(fn).toHaveBeenCalledWith(fakeClient)
      expect(fakeClient.query).toHaveBeenCalledWith('COMMIT')
      expect(result).toEqual(fakeResult)
      expect(fakeClient.release).toHaveBeenCalled()
    })

    it('should rollback the transaction if an error occurs', async () => {
      const error = new Error('Transaction failed')
      ;(fakeClient.query as jest.Mock)
        .mockResolvedValueOnce(null) // BEGIN
        .mockResolvedValueOnce(null) // ROLLBACK

      const fn = jest.fn().mockRejectedValue(error)
      await expect(db.transaction(fn)).rejects.toThrow(error)

      expect(fakeClient.query).toHaveBeenCalledWith('BEGIN')
      expect(fakeClient.query).toHaveBeenCalledWith('ROLLBACK')
      expect(fakeClient.release).toHaveBeenCalled()
    })
  })
})
