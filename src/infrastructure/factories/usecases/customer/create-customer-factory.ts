import { makeCustomerRepository } from '@/infrastructure/factories/repositories'
import { CreateCustomer } from '@/application/usecases/customer'

export const makeCreateCustomer = (): CreateCustomer => {
  return new CreateCustomer(makeCustomerRepository())
}
