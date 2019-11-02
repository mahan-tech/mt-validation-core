import { UNDEF, OPTIONAL } from '../constants'

import { booleanSchemaEntity } from './boolean'

describe('Schema Boolean', () => {
  it('Should validate correctly and return true', async () => {
    expect(booleanSchemaEntity.fn(UNDEF, true)).toBeTruthy()
  })

  it('Should validate correctly and return false', async () => {
    expect(booleanSchemaEntity.fn(UNDEF, false)).toBeFalsy()
  })

  it('Should throw error if value was undefined', async () => {
    expect(() => {
      booleanSchemaEntity.fn(UNDEF, UNDEF)
    }).toThrowError('Got undefined or null, expected Boolean')
  })

  it('Should throw error if value was null', async () => {
    expect(() => {
      booleanSchemaEntity.fn(UNDEF, null)
    }).toThrowError('Got undefined or null, expected Boolean')
  })

  it('Should return OPTIONAL object if opt was present in args while value is undefined', async () => {
    expect(booleanSchemaEntity.fn({ opt: true }, UNDEF)).toEqual(OPTIONAL)
  })

  it('Should return OPTIONAL object if opt was present in args while value is null', async () => {
    expect(booleanSchemaEntity.fn({ opt: true }, null)).toEqual(OPTIONAL)
  })

  it('Should validate correctly and return the casted string value if coerce was present in args', async () => {
    const opt = { coerce: true }
    expect(booleanSchemaEntity.fn(opt, '')).toBeFalsy()
    expect(booleanSchemaEntity.fn(opt, 'false')).toBeTruthy()
    expect(booleanSchemaEntity.fn(opt, 'true')).toBeTruthy()
  })

  it('Should throw exception if data is number', async () => {
    expect(() => {
      booleanSchemaEntity.fn(UNDEF, 123)
    }).toThrowError('Got number, expected Boolean')
    expect(() => {
      booleanSchemaEntity.fn(UNDEF, 123.321)
    }).toThrowError('Got number, expected Boolean')
  })

  it('Should throw exception if data is string', async () => {
    expect(() => {
      booleanSchemaEntity.fn(UNDEF, '123')
    }).toThrowError('Got string, expected Boolean')
  })

  it('Should throw exception if data is array', async () => {
    expect(() => {
      booleanSchemaEntity.fn(UNDEF, [])
    }).toThrowError('Got object, expected Boolean')
  })

  it('Should throw exception if data is object', async () => {
    expect(() => {
      booleanSchemaEntity.fn(UNDEF, {})
    }).toThrowError('Got object, expected Boolean')
  })
})
