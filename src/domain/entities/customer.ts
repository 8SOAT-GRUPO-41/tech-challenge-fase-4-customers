import { randomUUID } from 'node:crypto'
import { Email, Cpf } from '@/domain/value-objects'

export class Customer {
  private constructor(
    readonly customerId: string,
    private cpf: Cpf,
    private name?: string,
    private email?: Email
  ) {}

  static create(cpf: string, name?: string, email?: string) {
    const customerId = randomUUID()
    const emailObject = email ? new Email(email) : undefined
    return new Customer(customerId, new Cpf(cpf), name, emailObject)
  }

  static restore(customerId: string, cpf: string, name?: string, email?: string) {
    const emailObject = email ? new Email(email) : undefined
    return new Customer(customerId, new Cpf(cpf), name, emailObject)
  }

  setName = (name: string) => {
    this.name = name
  }

  getName = () => this.name

  getEmail = () => this.email?.getValue()

  getCpf = () => this.cpf.getValue()

  toJSON() {
    return {
      customerId: this.customerId,
      name: this.name || '',
      email: this.getEmail() || '',
      cpf: this.getCpf()
    }
  }
}
