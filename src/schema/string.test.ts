import { UNDEF, OPTIONAL } from '../constants'

import { stringSchemaEntity } from './string'

describe('Schema String', () => {
  it('Should validate structure of the schema', async () => {
    expect(Object.keys(stringSchemaEntity)).toEqual([
      'name',
      'acceptsRecursion',
      'fn'
    ])
    expect(typeof stringSchemaEntity.fn).toEqual('function')
    expect(typeof stringSchemaEntity.acceptsRecursion).toEqual('boolean')
    expect(typeof stringSchemaEntity.name).toEqual('string')
    expect(stringSchemaEntity.acceptsRecursion).toBeFalsy()
    expect(stringSchemaEntity.name).toEqual('String')
  })

  it('Should throw error if args consisted of both lower and upper', async () => {
    expect(() => {
      stringSchemaEntity.fn({ lower: true, upper: true }, UNDEF)
    }).toThrowError(
      'String validator cannot have both lower and upper options set'
    )
  })

  it('Should throw error if value was undefined', async () => {
    expect(() => {
      stringSchemaEntity.fn(UNDEF, UNDEF)
    }).toThrowError('Got undefined or null, required String')
  })

  it('Should throw error if value was null', async () => {
    expect(() => {
      stringSchemaEntity.fn(UNDEF, null)
    }).toThrowError('Got undefined or null, required String')
  })

  it('Should return OPTIONAL object if opt was present in args while value is undefined', async () => {
    expect(stringSchemaEntity.fn({ opt: true }, UNDEF)).toEqual(OPTIONAL)
  })

  it('Should return OPTIONAL object if opt was present in args while value is null', async () => {
    expect(stringSchemaEntity.fn({ opt: true }, null)).toEqual(OPTIONAL)
  })

  it('Should throw error if value was not string', async () => {
    expect(() => {
      stringSchemaEntity.fn(UNDEF, true)
    }).toThrowError('Got boolean, expected String')
    expect(() => {
      stringSchemaEntity.fn(UNDEF, 123)
    }).toThrowError('Got number, expected String')
    expect(() => {
      stringSchemaEntity.fn(UNDEF, [])
    }).toThrowError('Got object, expected String')
    expect(() => {
      stringSchemaEntity.fn(UNDEF, {})
    }).toThrowError('Got object, expected String')
  })

  it("Should throw error if value didn't have exact length as expected", async () => {
    expect(() => {
      stringSchemaEntity.fn({ len: 5 }, '1234')
    }).toThrowError('Got string length 4, expected 5')
  })

  it('Should throw error if length of value was lower than 5 char', async () => {
    expect(() => {
      stringSchemaEntity.fn({ min: 5 }, '1234')
    }).toThrowError('Got string length 4, expected more than 5')
  })

  it('Should throw error if length of value was lower than 5 char', async () => {
    expect(() => {
      stringSchemaEntity.fn({ max: 5 }, '123456')
    }).toThrowError('Got string length 6, expected less than 5')
  })

  it('Should return trimmed string if args consist of trim option', async () => {
    expect(stringSchemaEntity.fn({ trim: true }, ' trim test ')).toEqual(
      'trim test'
    )
  })

  it('Should return lower case the string if args consist of lower option', async () => {
    expect(stringSchemaEntity.fn({ lower: true }, 'LOWER STRING')).toEqual(
      'lower string'
    )
  })

  it('Should return upper case the string if args consist of upper option', async () => {
    expect(stringSchemaEntity.fn({ upper: true }, 'upper string')).toEqual(
      'UPPER STRING'
    )
  })

  it('Should throw error if regular expression was invalid and args consist of regex option', async () => {
    expect(() => {
      stringSchemaEntity.fn({ regex: '[^^test' }, 'test')
    }).toThrowError('Invalid regex: [^^test')
  })

  it('Should throw error if regular expression failed to detect any string and args consist of regex option', async () => {
    expect(() => {
      stringSchemaEntity.fn({ regex: /^untraceable-string/ }, 'value')
    }).toThrowError('Got value, did not match regex: /^untraceable-string/')
  })

  it('Should return sanitized string if args consist of sanitize option', async () => {
    expect(stringSchemaEntity.fn({ sanitize: true }, '&amp&amp;&&amp')).toEqual(
      '&amp;amp&amp;amp;&amp;&amp;amp'
    )
  })
})
