import { UNDEF, OPTIONAL } from '../constants'

import { numberSchemaEntity } from './number'

describe('Schema Number', () => {
  it('Should throw error if value was undefined', async () => {
    expect(() => {
      numberSchemaEntity.fn(UNDEF, UNDEF)
    }).toThrowError('Got undefined or null, required Number')
  })

  it('Should throw error if value was null', async () => {
    expect(() => {
      numberSchemaEntity.fn(UNDEF, null)
    }).toThrowError('Got undefined or null, required Number')
  })

  it('Should return OPTIONAL object if opt was present in args while value is undefined', async () => {
    expect(numberSchemaEntity.fn({ opt: true }, UNDEF)).toEqual(OPTIONAL)
  })

  it('Should return OPTIONAL object if opt was present in args while value is null', async () => {
    expect(numberSchemaEntity.fn({ opt: true }, null)).toEqual(OPTIONAL)
  })

  it('Should throw error if value was not a number(NaN)', async () => {
    expect(() => {
      numberSchemaEntity.fn(UNDEF, '123e')
    }).toThrowError('Got string, expected Number')
  })

  it("Should throw error if opt consisted of minEqual and value didn't follow the condition", async () => {
    expect(() => {
      numberSchemaEntity.fn({ minEqual: 5 }, '4')
    }).toThrowError('Got 4, expected more equal than 5')
  })

  it("Should throw error if opt consisted of min and value didn't follow the condition", async () => {
    expect(() => {
      numberSchemaEntity.fn({ min: 5 }, '5')
    }).toThrowError('Got 5, expected more than 5')
  })

  it("Should throw error if opt consisted of maxEqual and value didn't follow the condition", async () => {
    expect(() => {
      numberSchemaEntity.fn({ maxEqual: 5 }, '6')
    }).toThrowError('Got 6, expected less equal than 5')
  })

  it("Should throw error if opt consisted of max and value didn't follow the condition", async () => {
    expect(() => {
      numberSchemaEntity.fn({ max: 5 }, '5')
    }).toThrowError('Got 5, expected less than 5')
  })

  it('Should cast the number value to Integer if args consisted of coerceInteger option', async () => {
    expect(numberSchemaEntity.fn({ coerceInteger: true }, '5.5')).toEqual(5)
  })

  describe('Should cast the number value to Integer if args consisted of coerceInteger option and had integer value instead of boolean(radix aka base)', () => {
    it('value=5.55555, radix=10', async () => {
      expect(numberSchemaEntity.fn({ coerceInteger: 10 }, '5.55555')).toEqual(5)
    })

    it('value=0x10, radix=16', async () => {
      expect(numberSchemaEntity.fn({ coerceInteger: 10 }, 0x10)).toEqual(16)
    })

    it('value=0xF, radix=16', async () => {
      expect(numberSchemaEntity.fn({ coerceInteger: 16 }, 0xf)).toEqual(21)
    })
  })

  it('Should cast the number value to Float if args consisted of coerceFloat option', async () => {
    expect(numberSchemaEntity.fn({ coerceFloat: true }, '5.55')).toEqual(5.55)
  })

  it('Should return Integer number', async () => {
    expect(numberSchemaEntity.fn(UNDEF, '5')).toEqual(5)
  })
})
