import { Email } from '@/domain/value-objects'

const validEmail = 'any_email@mail.com'
const invalidEmail = 'invalid_email'

describe(Email.name, () => {
  it('should create an email with valid input', () => {
    const email = new Email(validEmail)

    expect(email).toBeInstanceOf(Email)
    expect(email.getValue()).toBe(validEmail)
  })

  it('should throw if email is invalid', () => {
    expect(() => new Email(invalidEmail)).toThrow()
  })

  it('should return email value', () => {
    const email = new Email(validEmail)

    expect(email.getValue()).toBe(validEmail)
  })
})
