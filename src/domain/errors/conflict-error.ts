import { ErrorCodes } from '@/domain/enums'

export class ConflictError extends Error {
  public readonly code: ErrorCodes

  constructor(message: string) {
    super(message)
    this.name = 'ConflictError'
    this.code = ErrorCodes.CONFLICT_ERROR
  }
}
