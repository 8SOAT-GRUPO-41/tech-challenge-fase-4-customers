import { HttpErrorHandler } from '@/infrastructure/http/error-handler'
import { HttpStatusCode } from '@/infrastructure/http/helper'
import { DomainError, NotFoundError, InvalidParamError, ConflictError, ExternalApiError } from '@/domain/errors'
import { ErrorCodes } from '@/domain/enums'

describe('HttpErrorHandler', () => {
  let errorHandler: HttpErrorHandler

  beforeEach(() => {
    errorHandler = new HttpErrorHandler()
  })

  it('should handle NotFoundError with NOT_FOUND status', () => {
    const error = new NotFoundError('Not found error')
    const response = errorHandler.handle(error)
    expect(response).toEqual({
      statusCode: HttpStatusCode.NOT_FOUND,
      body: {
        status: 'error',
        statusCode: HttpStatusCode.NOT_FOUND,
        code: error.code,
        message: 'Not found error'
      }
    })
  })

  it('should handle DomainError with UNPROCESSABLE_ENTITY status', () => {
    const error = new DomainError('Domain error')
    const response = errorHandler.handle(error)
    expect(response).toEqual({
      statusCode: HttpStatusCode.UNPROCESSABLE_ENTITY,
      body: {
        status: 'error',
        statusCode: HttpStatusCode.UNPROCESSABLE_ENTITY,
        code: error.code,
        message: 'Domain error'
      }
    })
  })

  it('should handle validation error (FST_ERR_VALIDATION) with BAD_REQUEST status', () => {
    const error = { code: 'FST_ERR_VALIDATION', message: 'Validation failed' }
    const response = errorHandler.handle(error)
    expect(response).toEqual({
      statusCode: HttpStatusCode.BAD_REQUEST,
      body: {
        status: 'error',
        statusCode: HttpStatusCode.BAD_REQUEST,
        code: ErrorCodes.BAD_REQUEST,
        message: 'Validation failed'
      }
    })
  })

  it('should handle InvalidParamError with UNPROCESSABLE_ENTITY status', () => {
    const error = new InvalidParamError('any_param')
    const response = errorHandler.handle(error)
    expect(response).toEqual({
      statusCode: HttpStatusCode.UNPROCESSABLE_ENTITY,
      body: {
        status: 'error',
        statusCode: HttpStatusCode.UNPROCESSABLE_ENTITY,
        code: error.code,
        message: 'Invalid param: any_param'
      }
    })
  })

  it('should handle ConflictError with CONFLICT status', () => {
    const error = new ConflictError('Conflict occurred')
    const response = errorHandler.handle(error)
    expect(response).toEqual({
      statusCode: HttpStatusCode.CONFLICT,
      body: {
        status: 'error',
        statusCode: HttpStatusCode.CONFLICT,
        code: error.code,
        message: 'Conflict occurred'
      }
    })
  })

  it('should handle ExternalApiError with SERVER_ERROR status', () => {
    const error = new ExternalApiError('External API failure', '/example', 'GET', 500)
    const response = errorHandler.handle(error)
    expect(response).toEqual({
      statusCode: HttpStatusCode.SERVER_ERROR,
      body: {
        status: 'error',
        statusCode: HttpStatusCode.SERVER_ERROR,
        code: error.code,
        message: 'External API failure'
      }
    })
  })

  it('should handle generic errors with SERVER_ERROR status', () => {
    const error = new Error('Unexpected error')
    const response = errorHandler.handle(error)
    expect(response).toEqual({
      statusCode: HttpStatusCode.SERVER_ERROR,
      body: {
        status: 'error',
        statusCode: HttpStatusCode.SERVER_ERROR,
        code: ErrorCodes.INTERNAL_SERVER_ERROR,
        message: 'Unexpected error'
      }
    })
  })

  it('should handle errors without message with default text', () => {
    const error = {} as Error
    const response = errorHandler.handle(error)
    expect(response).toEqual({
      statusCode: HttpStatusCode.SERVER_ERROR,
      body: {
        status: 'error',
        statusCode: HttpStatusCode.SERVER_ERROR,
        code: ErrorCodes.INTERNAL_SERVER_ERROR,
        message: 'Something unexpected happened'
      }
    })
  })
})
