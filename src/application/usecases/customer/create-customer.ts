import type { CustomerRepository } from '@/application/ports'
import { Customer } from '@/domain/entities'
import { ConflictError } from '@/domain/errors'

type Input = {
  name: string
  email: string
  cpf: string
}

export class CreateCustomer {
  constructor(private readonly customerRepository: CustomerRepository) {}

  async execute(params: Input): Promise<Customer> {
    const { cpf, email, name } = params
    const findCustomer = await this.customerRepository.findByCpf(cpf)
    if (findCustomer) {
      throw new ConflictError('Customer already exists')
    }
    const customer = Customer.create(cpf, name, email)
    await this.customerRepository.save(customer)
    return customer
  }
}
