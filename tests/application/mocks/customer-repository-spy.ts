import type { CustomerRepository } from '@/application/ports'
import type { Customer } from '@/domain/entities'
import { customerMock } from '@/tests/domain/mocks'

export class CustomerRepositorySpy implements CustomerRepository {
  saveParams?: Customer
  findByCpfParams?: string
  findByIdParams?: string

  findByCpfResult: Customer | null = customerMock
  findByIdResult: Customer | null = customerMock

  async save(customer: Customer): Promise<void> {
    this.saveParams = customer
  }

  async findByCpf(cpf: string): Promise<Customer | null> {
    this.findByCpfParams = cpf
    return this.findByCpfResult
  }

  async findById(id: string): Promise<Customer | null> {
    this.findByIdParams = id
    return this.findByIdResult
  }
}
