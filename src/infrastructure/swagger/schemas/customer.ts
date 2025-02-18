export const customerSchema = {
  type: 'object',
  properties: {
    customerId: { type: 'string', format: 'uuid' },
    name: { type: 'string', examples: ['John Doe'] },
    email: { type: 'string', examples: ['example@mail.com'] },
    cpf: { type: 'string', minLength: 11, maxLength: 11, pattern: '^[0-9]*$', examples: ['12345678901'] }
  }
}

export const customerSchemaWithoutId = {
  type: 'object',
  properties: {
    name: { type: 'string', examples: ['John'] },
    email: { type: 'string', examples: ['example@mail.com'] },
    cpf: { type: 'string', minLength: 11, maxLength: 11, pattern: '^[0-9]*$', examples: ['12345678901'] }
  }
}
