import { Customer } from '@/domain/entities/customer'

jest.mock('node:crypto', () => ({
  randomUUID: jest.fn().mockReturnValue('unique-id')
}))

const validCpf = '44204681816'
const validEmail = 'any_email@mail.com'
const validName = 'any_name'

describe(Customer.name, () => {
  beforeAll(() => {
    jest.clearAllMocks()
  })

  it('should create a customer with valid input', () => {
    const customer = Customer.create(validCpf, validName, validEmail)

    expect(customer).toBeInstanceOf(Customer)
    expect(customer.customerId).toBe('unique-id')
    expect(customer.getCpf()).toBe(validCpf)
    expect(customer.getEmail()).toBe(validEmail)
    expect(customer.getName()).toBe(validName)
  })

  it('should restore a customer with valid input', () => {
    const customerId = 'restored-id'
    const customer = Customer.restore(customerId, validCpf, validName, validEmail)

    expect(customer).toBeInstanceOf(Customer)
    expect(customer.customerId).toBe(customerId)
    expect(customer.getCpf()).toBe(validCpf)
    expect(customer.getEmail()).toBe(validEmail)
    expect(customer.getName()).toBe(validName)
  })

  it('should restore a customer missing optional fields', () => {
    const customerId = 'restored-id'
    const customer = Customer.restore(customerId, validCpf)

    expect(customer).toBeInstanceOf(Customer)
    expect(customer.customerId).toBe(customerId)
    expect(customer.getCpf()).toBe(validCpf)
    expect(customer.getEmail()).toBeUndefined()
    expect(customer.getName()).toBeUndefined()
  })

  it('should allow setting and getting the name', () => {
    const customer = Customer.create(validCpf)

    customer.setName(validName)
    expect(customer.getName()).toBe(validName)
  })

  it('should return undefined for email if not set', () => {
    const customer = Customer.create(validCpf, validName)

    expect(customer.getEmail()).toBeUndefined()
  })

  it('should return correct JSON representation', () => {
    const customer = Customer.create(validCpf, validName, validEmail)
    const expectedJson = {
      customerId: 'unique-id',
      name: validName,
      email: validEmail,
      cpf: validCpf
    }

    expect(customer.toJSON()).toEqual(expectedJson)
  })

  it('should handle missing optional fields', () => {
    const customer = Customer.create(validCpf)

    const expectedJson = {
      customerId: 'unique-id',
      name: '',
      email: '',
      cpf: validCpf
    }

    expect(customer.toJSON()).toEqual(expectedJson)
    expect(customer.getName()).toBeUndefined()
    expect(customer.getEmail()).toBeUndefined()
  })
})
