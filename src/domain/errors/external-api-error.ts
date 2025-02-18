import { ErrorCodes } from '@/domain/enums'

export class ExternalApiError extends Error {
  public readonly code: ErrorCodes
  public readonly endpoint: string
  public readonly method: string
  public readonly status: number

  constructor(message: string, endpoint: string, method: string, status: number) {
    super(message)
    this.name = 'ExternalApiError'
    this.code = ErrorCodes.EXTERNAL_API_ERROR
    this.endpoint = endpoint
    this.method = method
    this.status = status
  }
}
