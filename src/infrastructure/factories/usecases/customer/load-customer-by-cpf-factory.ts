import { makeCustomerRepository } from '@/infrastructure/factories/repositories'
import { LoadCustomerByCpf } from '@/application/usecases/customer'

export const makeLoadCustomerByCpf = (): LoadCustomerByCpf => {
  return new LoadCustomerByCpf(makeCustomerRepository())
}
