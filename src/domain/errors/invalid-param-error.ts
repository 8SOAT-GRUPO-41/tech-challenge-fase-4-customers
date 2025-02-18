import { ErrorCodes } from '@/domain/enums'

export class InvalidParamError extends Error {
  public readonly code: ErrorCodes

  constructor(paramName: string) {
    super(`Invalid param: ${paramName}`)
    this.name = 'InvalidParamError'
    this.code = ErrorCodes.INVALID_PARAM
  }
}
