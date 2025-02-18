import type { CustomerRepository } from '@/application/ports'
import type { Customer } from '@/domain/entities'
import { NotFoundError } from '@/domain/errors'

export class LoadCustomerByCpf {
  constructor(private readonly customerRepository: CustomerRepository) {}

  async execute(cpf: string): Promise<Customer> {
    const customer = await this.customerRepository.findByCpf(cpf)
    if (!customer) {
      throw new NotFoundError('Customer not found')
    }
    return customer
  }
}
