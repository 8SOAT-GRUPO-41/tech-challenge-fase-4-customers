import type { CreateCustomer, LoadCustomerByCpf } from '@/application/usecases/customer'
import type { HttpRequest, HttpResponse } from '@/infrastructure/http/interfaces'
import { HttpStatusCode } from '@/infrastructure/http/helper'
import type { Controller } from '@/infrastructure/controllers/interfaces'

interface CreateCustomerInput {
  name: string
  email: string
  cpf: string
}

export class CreateCustomerController implements Controller {
  constructor(private readonly createCustomerUseCase: CreateCustomer) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const input = request.body as CreateCustomerInput
    const result = await this.createCustomerUseCase.execute(input)
    return {
      statusCode: HttpStatusCode.CREATED,
      body: result.toJSON()
    }
  }
}

export class LoadCustomerByCpfController implements Controller {
  constructor(private readonly loadCustomerByCpfUseCase: LoadCustomerByCpf) {}

  async handle(request: HttpRequest<null, null, { cpf: string }>): Promise<HttpResponse> {
    const params = request.params
    const result = await this.loadCustomerByCpfUseCase.execute(params.cpf)
    return {
      statusCode: HttpStatusCode.OK,
      body: result.toJSON()
    }
  }
}
