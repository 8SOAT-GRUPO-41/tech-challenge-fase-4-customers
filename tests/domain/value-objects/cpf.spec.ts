import { Cpf } from '@/domain/value-objects'
import { InvalidParamError } from '@/domain/errors'

describe(Cpf.name, () => {
  it.each(['97456321558', '71428793860', '87748248800'])('should create a cpf with valid input', (testCpf: string) => {
    const cpf = new Cpf(testCpf)

    expect(cpf).toBeInstanceOf(Cpf)
    expect(cpf.getValue()).toBe(testCpf)
  })

  it.each(['', undefined, null, '11111111111', '111', '11111111111111'])(
    'should throw if cpf is invalid',
    (testCpf: unknown) => {
      expect(() => new Cpf(testCpf as string)).toThrow(new InvalidParamError('cpf'))
    }
  )
})
