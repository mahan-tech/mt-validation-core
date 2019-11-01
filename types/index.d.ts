export type SchemaEntityFn = (args: any, childValidators: any, data: any) => any

export interface SchemaEntity {
  name: string
  fn: SchemaEntityFn
}

export interface Schemas {
  validatorsList: SchemaEntity[]
}
