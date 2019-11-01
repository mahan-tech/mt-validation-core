import { UNDEF, OPTIONAL } from '../constants'

import { anySchemaEntity } from './any'

describe('Schema Any', () => {
  it('Should validate correctly and return the string value', async () => {
    expect(anySchemaEntity.fn(UNDEF, UNDEF, 'test-value')).toEqual('test-value')
  })

  it('Should validate correctly and return the string empty value', async () => {
    expect(anySchemaEntity.fn(UNDEF, UNDEF, '')).toEqual('')
  })

  it('Should validate correctly and return the int value', async () => {
    expect(anySchemaEntity.fn(UNDEF, UNDEF, 5)).toEqual(5)
  })

  it('Should validate correctly and return the int 0 value', async () => {
    expect(anySchemaEntity.fn(UNDEF, UNDEF, 0)).toEqual(0)
  })

  it('Should validate correctly and return the array', async () => {
    expect(anySchemaEntity.fn(UNDEF, UNDEF, [1, 2])).toEqual([1, 2])
  })

  it('Should validate correctly and return the empty array', async () => {
    expect(anySchemaEntity.fn(UNDEF, UNDEF, [])).toEqual([])
  })

  it('Should validate correctly and return the object', async () => {
    expect(anySchemaEntity.fn(UNDEF, UNDEF, { a: 1 })).toEqual({ a: 1 })
  })

  it('Should validate correctly and return the empty object', async () => {
    expect(anySchemaEntity.fn(UNDEF, UNDEF, {})).toEqual({})
  })

  it('Should throw error if value was undefined', async () => {
    expect(() => {
      anySchemaEntity.fn(UNDEF, UNDEF, UNDEF)
    }).toThrowError('required Any value')
  })

  it('Should throw error if value was null', async () => {
    expect(() => {
      anySchemaEntity.fn(UNDEF, UNDEF, null)
    }).toThrowError('required Any value')
  })

  it('Should return OPTIONAL object if opt was present in args while value is undefined', async () => {
    expect(anySchemaEntity.fn({ opt: true }, UNDEF, UNDEF)).toEqual(OPTIONAL)
  })

  it('Should return OPTIONAL object if opt was present in args while value is null', async () => {
    expect(anySchemaEntity.fn({ opt: true }, UNDEF, null)).toEqual(OPTIONAL)
  })
})
