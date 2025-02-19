import type { CustomerRepository } from '@/application/ports'
import type { Customer } from '@/domain/entities'
import { NotFoundError } from '@/domain/errors'

export class LoadCustomerById {
  constructor(private readonly customerRepository: CustomerRepository) {}

  async execute(id: string): Promise<Customer> {
    const customer = await this.customerRepository.findById(id)
    if (!customer) {
      throw new NotFoundError('Customer not found')
    }
    return customer
  }
}
