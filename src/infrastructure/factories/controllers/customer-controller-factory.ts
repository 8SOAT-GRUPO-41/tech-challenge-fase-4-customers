import { LoadCustomerByCpfController, CreateCustomerController } from '@/infrastructure/controllers'
import { makeCreateCustomer, makeLoadCustomerByCpf } from '@/infrastructure/factories/usecases/customer'
import type { Controller } from '@/infrastructure/controllers/interfaces'

export const makeLoadCustomerByCpfController = (): Controller => {
  return new LoadCustomerByCpfController(makeLoadCustomerByCpf())
}

export const makeCreateCustomerController = (): Controller => {
  return new CreateCustomerController(makeCreateCustomer())
}
