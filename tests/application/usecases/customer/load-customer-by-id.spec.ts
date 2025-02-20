import { CustomerRepositorySpy } from '@/tests/application/mocks'
import { LoadCustomerById } from '@/application/usecases/customer'
import { customerMock } from '@/tests/domain/mocks'
import { NotFoundError } from '@/domain/errors'

interface SutTypes {
  sut: LoadCustomerById
  customerRepositorySpy: CustomerRepositorySpy
}

const customerIdInput = customerMock.customerId

const makeSut = (): SutTypes => {
  const customerRepositorySpy = new CustomerRepositorySpy()
  const sut = new LoadCustomerById(customerRepositorySpy)
  return {
    sut,
    customerRepositorySpy
  }
}

describe(LoadCustomerById.name, () => {
  it('should load a customer by id', async () => {
    const { sut, customerRepositorySpy } = makeSut()
    customerRepositorySpy.findByIdResult = customerMock

    const customer = await sut.execute(customerIdInput)

    expect(customer).toEqual(customerMock)
  })

  it('should throw if customer not found', async () => {
    const { sut, customerRepositorySpy } = makeSut()
    customerRepositorySpy.findByIdResult = null

    const promise = sut.execute(customerIdInput)

    await expect(promise).rejects.toThrow(new NotFoundError('Customer not found'))
  })

  it('should throw if findById throws', async () => {
    const { sut, customerRepositorySpy } = makeSut()
    jest.spyOn(customerRepositorySpy, 'findById').mockImplementationOnce(() => {
      throw new Error('any_error')
    })

    const promise = sut.execute(customerIdInput)

    await expect(promise).rejects.toThrow()
  })
})
