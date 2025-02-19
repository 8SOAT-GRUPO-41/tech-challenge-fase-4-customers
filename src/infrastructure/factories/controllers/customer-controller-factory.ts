import {
  LoadCustomerByCpfController,
  CreateCustomerController,
  LoadCustomerByIdController
} from '@/infrastructure/controllers'
import {
  makeCreateCustomer,
  makeLoadCustomerByCpf,
  makeLoadCustomerById
} from '@/infrastructure/factories/usecases/customer'
import type { Controller } from '@/infrastructure/controllers/interfaces'

export const makeLoadCustomerByCpfController = (): Controller => {
  return new LoadCustomerByCpfController(makeLoadCustomerByCpf())
}

export const makeCreateCustomerController = (): Controller => {
  return new CreateCustomerController(makeCreateCustomer())
}

export const makeLoadCustomerByIdController = (): Controller => {
  return new LoadCustomerByIdController(makeLoadCustomerById())
}
