import { CustomerRepositoryDatabase } from '@/infrastructure/repository'
import { PostgresDatabaseConnection } from '@/infrastructure/database/postgres-connection'
import type { CustomerRepository } from '@/application/ports'

export const makeCustomerRepository = (): CustomerRepository => {
  return new CustomerRepositoryDatabase(PostgresDatabaseConnection.getInstance())
}
