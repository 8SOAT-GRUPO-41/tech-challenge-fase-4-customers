import { CustomerRepositorySpy } from '@/tests/application/mocks'
import { LoadCustomerByCpf } from '@/application/usecases/customer'
import { customerMock } from '@/tests/domain/mocks'
import { NotFoundError } from '@/domain/errors'

interface SutTypes {
  sut: LoadCustomerByCpf
  customerRepositorySpy: CustomerRepositorySpy
}

const customerCpfInput = customerMock.getCpf()

const makeSut = (): SutTypes => {
  const customerRepositorySpy = new CustomerRepositorySpy()
  const sut = new LoadCustomerByCpf(customerRepositorySpy)
  return {
    sut,
    customerRepositorySpy
  }
}

describe(LoadCustomerByCpf.name, () => {
  it('should load a customer by cpf', async () => {
    const { sut, customerRepositorySpy } = makeSut()
    customerRepositorySpy.findByCpfResult = customerMock

    const customer = await sut.execute(customerCpfInput)

    expect(customer).toEqual(customerMock)
  })

  it('should throw if customer not found', async () => {
    const { sut, customerRepositorySpy } = makeSut()
    customerRepositorySpy.findByCpfResult = null

    const promise = sut.execute(customerCpfInput)

    await expect(promise).rejects.toThrow(new NotFoundError('Customer not found'))
  })

  it('should throw if findByCpf throws', async () => {
    const { sut, customerRepositorySpy } = makeSut()
    jest.spyOn(customerRepositorySpy, 'findByCpf').mockImplementationOnce(() => {
      throw new Error('any_error')
    })

    const promise = sut.execute(customerCpfInput)

    await expect(promise).rejects.toThrow()
  })
})
