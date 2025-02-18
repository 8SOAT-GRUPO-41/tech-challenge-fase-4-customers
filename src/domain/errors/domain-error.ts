import { ErrorCodes } from '@/domain/enums'

export class DomainError extends Error {
  public readonly code: ErrorCodes

  constructor(message: string) {
    super(message)
    this.name = 'DomainError'
    this.code = ErrorCodes.DOMAIN_ERROR
  }
}
