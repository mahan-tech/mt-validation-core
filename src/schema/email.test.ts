import { UNDEF, OPTIONAL } from '../constants'

import { emailSchemaEntity } from './email'

describe('Schema Email', () => {
  it('Should throw error if value was undefined', async () => {
    expect(() => {
      emailSchemaEntity.fn(UNDEF, UNDEF, UNDEF)
    }).toThrowError('Got undefined, required Email (string)')
  })

  it('Should throw error if value was null', async () => {
    expect(() => {
      emailSchemaEntity.fn(UNDEF, UNDEF, null)
    }).toThrowError('Got undefined, required Email (string)')
  })

  it('Should return OPTIONAL object if opt was present in args while value is undefined', async () => {
    expect(emailSchemaEntity.fn({ opt: true }, UNDEF, UNDEF)).toEqual(OPTIONAL)
  })

  it('Should return OPTIONAL object if opt was present in args while value is null', async () => {
    expect(emailSchemaEntity.fn({ opt: true }, UNDEF, null)).toEqual(OPTIONAL)
  })

  it('Should throw error if value was non string', async () => {
    expect(() => {
      emailSchemaEntity.fn(UNDEF, UNDEF, 123321)
    }).toThrowError('Got number, required Email (string)')
  })

  it('Should throw error if email was invalid', async () => {
    expect(() => {
      emailSchemaEntity.fn(UNDEF, UNDEF, 'test#email.com')
    }).toThrowError('Invalid Email: test#email.com')
  })

  it('Should return email if it was valid', async () => {
    expect(emailSchemaEntity.fn(UNDEF, UNDEF, 'test@test.com')).toEqual(
      'test@test.com'
    )
  })

  it('Should return normalized email if args consisted of normalize option', async () => {
    expect(
      emailSchemaEntity.fn({ normalize: true }, UNDEF, 'TEST@test.com')
    ).toEqual('test@test.com')
  })
})
