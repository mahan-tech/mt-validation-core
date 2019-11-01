import { isNull } from 'util'

import { SchemaEntity } from '../../types'
import { OPTIONAL } from '../constants'

export const anySchemaEntity: SchemaEntity = {
  name: 'any',
  fn: (args, childValidators, data) => {
    if (typeof data === 'undefined' || isNull(data)) {
      if (args && args.opt) {
        return OPTIONAL
      }
      throw new Error('required Any value')
    }

    return data
  }
}
