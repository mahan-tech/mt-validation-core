import { Schemas, Validation } from './index'

describe('index', () => {
  it('Should validate if `Schemas` is valid', async () => {
    expect(Object.keys(Schemas)).toEqual([
      'Any',
      'Boolean',
      'Date',
      'Email',
      'Number',
      'String'
    ])

    Object.keys(Schemas).map(schema => {
      expect(typeof Schemas[schema]).toEqual('function')
    })
  })

  it('Should check if Validate Class initializes correctly with right methods', async () => {
    expect(new Validation()).toHaveProperty('schema')
    expect(new Validation()).toHaveProperty('validate')
  })

  it('Should throw exception if no schema has defined', async () => {
    const validation = new Validation()

    expect(() => {
      validation.schema()
    }).toThrowError('Schema violation: Null or undefined.')
  })

  it("Should throw exception if schema didn't have the options", async () => {
    const validation = new Validation()

    expect(() => {
      validation.schema({})
    }).toThrowError(
      "Schema standard violation: schema doesn't have the correct options value."
    )
  })

  it("Should throw exception if schema didn't have the right options", async () => {
    const validation = new Validation()

    expect(() => {
      validation.schema({ options: 'wrong options' })
    }).toThrowError(
      `Schema standard violation: [options: "wrong options"] schema doesn't have the correct options value.`
    )
  })

  it("Should throw exception if schema didn't have the standard validator", async () => {
    const validation = new Validation()

    expect(() => {
      validation.schema({
        options: {}
      })
    }).toThrowError(
      "Schema standard violation: schema doesn't seem to have the validator object, please use the standard schema."
    )
  })

  it("Should throw exception if schema didn't have the standard and right validator", async () => {
    const validation = new Validation()

    expect(() => {
      validation.schema({
        options: {},
        validator: 'wrong options'
      })
    }).toThrowError(
      `Schema standard violation: [validator(Object): "wrong options"] schema doesn't seem to have the validator object, please use the standard schema.`
    )
  })

  it("Should throw exception if schema didn't have the standard and right validator structure [validator.name]", async () => {
    const validation = new Validation()

    expect(() => {
      validation.schema({
        options: {},
        validator: {
          name: 123,
          acceptsRecursion: false,
          fn: () => true
        }
      })
    }).toThrowError(
      `Schema standard violation: [validator.name(String): 123] schema doesn't seem to have the validator object, please use the standard schema.`
    )
  })

  it("Should throw exception if schema didn't have the standard and right validator structure [validator.acceptsRecursion]", async () => {
    const validation = new Validation()

    expect(() => {
      validation.schema({
        options: {},
        validator: {
          name: 'String',
          acceptsRecursion: 123,
          fn: () => true
        }
      })
    }).toThrowError(
      `Schema standard violation: [validator.acceptsRecursion(Boolean): 123] schema doesn't seem to have the validator object, please use the standard schema.`
    )
  })

  it("Should throw exception if schema didn't have the standard and right validator structure [validator.fn]", async () => {
    const validation = new Validation()

    expect(() => {
      validation.schema({
        options: {},
        validator: {
          name: 'String',
          acceptsRecursion: false,
          fn: 123
        }
      })
    }).toThrowError(
      `Schema standard violation: [validator.fn(Function): 123] schema doesn't seem to have the validator object, please use the standard schema.`
    )
  })

  it('Should be okay if validation is correct', async () => {
    const validation = new Validation()

    expect(
      validation.schema({
        options: {},
        validator: {
          name: 'String',
          acceptsRecursion: false,
          fn: () => true
        }
      })
    ).toBeTruthy()
  })
})
