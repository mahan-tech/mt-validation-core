export type SchemaEntityFn = (
  args: any,
  data: any,
  childValidators?: any
) => any

export interface SchemaEntity {
  name: string
  fn: SchemaEntityFn
}

export interface Schemas {
  validatorsList: SchemaEntity[]
}
