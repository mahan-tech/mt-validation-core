import { SchemasValidators } from '../types'

import RawSchemas from './schema'

export const Schemas: SchemasValidators = RawSchemas.reduce(
  (result, validator) => ({
    ...result,
    [validator.name]: (options: any) => ({
      options,
      validator
    })
  }),
  {} as any
)

export type ValidationOptionsMode = 'error' | 'schema' | 'list'

export interface ValidationOptions {
  mode?: ValidationOptionsMode
}

export class Validation {
  private userSchema: any

  constructor(private options: ValidationOptions = { mode: 'schema' }) {}

  public schema(schema?: any) {
    this.userSchema = schema
    this.schemaCheckup()
    return true
  }

  public validate(data?: any) {
    // make test the validation

    return { schema: this.userSchema, options: this.options }
  }

  private schemaCheckup() {
    // check if user forgot to set the schema
    if (!this.userSchema) {
      throw new Error('Schema violation: Null or undefined.')
    }

    // check if the structure of the schema is standard
    if (!this.userSchema.options) {
      throw new Error(
        "Schema standard violation: schema doesn't have the correct options value."
      )
    }

    if (typeof this.userSchema.options !== 'object') {
      throw new Error(
        `Schema standard violation: [options: "${this.userSchema.options}"] schema doesn't have the correct options value.`
      )
    }

    if (!this.userSchema.validator) {
      throw new Error(
        "Schema standard violation: schema doesn't seem to have the validator object, please use the standard schema."
      )
    }

    if (typeof this.userSchema.validator !== 'object') {
      throw new Error(
        `Schema standard violation: [validator(Object): "${this.userSchema.validator}"] schema doesn't seem to have the validator object, please use the standard schema.`
      )
    }

    if (typeof this.userSchema.validator.name !== 'string') {
      throw new Error(
        `Schema standard violation: [validator.name(String): ${this.userSchema.validator.name}] schema doesn't seem to have the validator object, please use the standard schema.`
      )
    }

    if (typeof this.userSchema.validator.acceptsRecursion !== 'boolean') {
      throw new Error(
        `Schema standard violation: [validator.acceptsRecursion(Boolean): ${this.userSchema.validator.acceptsRecursion}] schema doesn't seem to have the validator object, please use the standard schema.`
      )
    }

    if (typeof this.userSchema.validator.fn !== 'function') {
      throw new Error(
        `Schema standard violation: [validator.fn(Function): ${this.userSchema.validator.fn}] schema doesn't seem to have the validator object, please use the standard schema.`
      )
    }
  }
}
