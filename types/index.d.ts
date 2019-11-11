import { AnyOptions } from '../src/schema/any'
import { BooleanOptions } from '../src/schema/boolean'
import { DateOptions } from '../src/schema/date'
import { EmailOptions } from '../src/schema/email'
import { NumberOptions } from '../src/schema/number'
import { StringOptions } from '../src/schema/string'

export type SchemaEntityFn = (
  args: any,
  data: any,
  childValidators?: any
) => any

export interface SchemaEntity {
  name: string
  acceptsRecursion: boolean
  fn: SchemaEntityFn
}

export type SchemaValidatorEntity<T> = (
  options: T
) => {
  options: T
  validator: SchemaEntity
}

export interface SchemasValidators {
  Any: SchemaValidatorEntity<AnyOptions>
  Boolean: SchemaValidatorEntity<BooleanOptions>
  Date: SchemaValidatorEntity<DateOptions>
  Email: SchemaValidatorEntity<EmailOptions>
  Number: SchemaValidatorEntity<NumberOptions>
  String: SchemaValidatorEntity<NumberOptions>
}
