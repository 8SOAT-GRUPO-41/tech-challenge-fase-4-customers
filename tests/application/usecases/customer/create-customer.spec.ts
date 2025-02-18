import { CreateCustomer } from '@/application/usecases/customer'
import { CustomerRepositorySpy } from '@/tests/application/mocks'
import { customerMock } from '@/tests/domain/mocks'
import { ConflictError } from '@/domain/errors'
import { throwError } from '@/tests/test-helpers'

interface SutTypes {
  sut: CreateCustomer
  customerRepositorySpy: CustomerRepositorySpy
}

const makeSut = (): SutTypes => {
  const customerRepositorySpy = new CustomerRepositorySpy()
  const sut = new CreateCustomer(customerRepositorySpy)
  return {
    sut,
    customerRepositorySpy
  }
}

const customerInput = {
  cpf: '44204681816',
  email: 'any_email@mail.com',
  name: 'any_name'
}

describe(CreateCustomer.name, () => {
  it('should create a customer', async () => {
    const { sut, customerRepositorySpy } = makeSut()
    customerRepositorySpy.findByCpfResult = null

    const customer = await sut.execute(customerInput)

    expect(customer.customerId).toBeTruthy()
    expect(customer.getCpf()).toBe(customerInput.cpf)
    expect(customer.getEmail()).toBe(customerInput.email)
    expect(customer.getName()).toBe(customerInput.name)
  })

  it('should throw if customer already exists', async () => {
    const { sut, customerRepositorySpy } = makeSut()
    customerRepositorySpy.findByCpfResult = customerMock

    const promise = sut.execute(customerInput)

    await expect(promise).rejects.toThrow(new ConflictError('Customer already exists'))
  })

  it('should throw if findByCpf throws', async () => {
    const { sut, customerRepositorySpy } = makeSut()
    jest.spyOn(customerRepositorySpy, 'findByCpf').mockImplementationOnce(throwError)

    const promise = sut.execute(customerInput)

    await expect(promise).rejects.toThrow()
  })

  it('should throw if save throws', async () => {
    const { sut, customerRepositorySpy } = makeSut()
    jest.spyOn(customerRepositorySpy, 'save').mockImplementationOnce(throwError)

    const promise = sut.execute(customerInput)

    await expect(promise).rejects.toThrow()
  })

  it('should call findByCpf with correct value', async () => {
    const { sut, customerRepositorySpy } = makeSut()
    customerRepositorySpy.findByCpfResult = null

    await sut.execute(customerInput)

    expect(customerRepositorySpy.findByCpfParams).toBe(customerInput.cpf)
  })

  it('should call save with correct value', async () => {
    const { sut, customerRepositorySpy } = makeSut()
    customerRepositorySpy.findByCpfResult = null

    await sut.execute(customerInput)

    expect(customerRepositorySpy.saveParams?.customerId).toBeTruthy()
    expect(customerRepositorySpy.saveParams?.getCpf()).toBe(customerInput.cpf)
    expect(customerRepositorySpy.saveParams?.getEmail()).toBe(customerInput.email)
    expect(customerRepositorySpy.saveParams?.getName()).toBe(customerInput.name)
  })
})
