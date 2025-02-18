import type { Customer } from '@/domain/entities'

export interface CustomerRepository {
  save(customer: Customer): Promise<void>
  findByCpf(cpf: string): Promise<Customer | null>
  findById(id: string): Promise<Customer | null>
}
