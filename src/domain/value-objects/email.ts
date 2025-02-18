import { InvalidParamError } from '../errors/invalid-param-error'

export class Email {
  private value: string

  constructor(email: string) {
    if (!email.match(/^(.+)@(.+)$/)) throw new InvalidParamError('email')
    this.value = email
  }

  getValue() {
    return this.value
  }
}
