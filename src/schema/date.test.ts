import { UNDEF, OPTIONAL } from '../constants'

import { dateSchemaEntity } from './date'

describe('Schema Date', () => {
  it('Should validate structure of the schema', async () => {
    expect(Object.keys(dateSchemaEntity)).toEqual([
      'name',
      'acceptsRecursion',
      'fn'
    ])
    expect(typeof dateSchemaEntity.fn).toEqual('function')
    expect(typeof dateSchemaEntity.acceptsRecursion).toEqual('boolean')
    expect(typeof dateSchemaEntity.name).toEqual('string')
    expect(dateSchemaEntity.acceptsRecursion).toBeFalsy()
    expect(dateSchemaEntity.name).toEqual('Date')
  })

  it('Should throw error if value was undefined', async () => {
    expect(() => {
      dateSchemaEntity.fn(UNDEF, UNDEF)
    }).toThrowError('Got undefined or null, required Date')
  })

  it('Should throw error if value was null', async () => {
    expect(() => {
      dateSchemaEntity.fn(UNDEF, null)
    }).toThrowError('Got undefined or null, required Date')
  })

  it('Should return OPTIONAL object if opt was present in args while value is undefined', async () => {
    expect(dateSchemaEntity.fn({ opt: true }, UNDEF)).toEqual(OPTIONAL)
  })

  it('Should return OPTIONAL object if opt was present in args while value is null', async () => {
    expect(dateSchemaEntity.fn({ opt: true }, null)).toEqual(OPTIONAL)
  })

  it("Should throw error if data wasn't date and parse option was false", async () => {
    expect(() => {
      dateSchemaEntity.fn(UNDEF, 1573448209226)
    }).toThrowError('Got number, required Date')
  })

  it("Should throw error if data wasn't right wasn't parsable", async () => {
    expect(() => {
      dateSchemaEntity.fn({ parse: true }, 'wrong date')
    }).toThrowError('Got object, required Date or Date compatible string')
  })

  it('Should throw error if data was before the min option', async () => {
    expect(() => {
      dateSchemaEntity.fn({ parse: true, min: 1573448209227 }, 1573448209226)
    }).toThrowError(
      'Got date Mon Nov 11 2019 11:56:49 GMT+0700 (Indochina Time), expected greater than 1573448209227'
    )
  })

  it('Should throw error if data was after the max option', async () => {
    expect(() => {
      dateSchemaEntity.fn({ parse: true, max: 1573448209225 }, 1573448209226)
    }).toThrowError(
      'Got date Mon Nov 11 2019 11:56:49 GMT+0700 (Indochina Time), expected less than 1573448209225'
    )
  })

  it('Should return the date if everything was okay', async () => {
    expect(
      dateSchemaEntity.fn(
        { parse: true, min: 1573448209225, max: 1573448209227 },
        1573448209226
      )
    ).toEqual(new Date(1573448209226))
  })
})
