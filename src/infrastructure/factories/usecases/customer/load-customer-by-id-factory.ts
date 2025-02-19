import { makeCustomerRepository } from '@/infrastructure/factories/repositories'
import { LoadCustomerById } from '@/application/usecases/customer'

export const makeLoadCustomerById = (): LoadCustomerById => {
  return new LoadCustomerById(makeCustomerRepository())
}
