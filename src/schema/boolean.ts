import { isNull } from 'util'

import { SchemaEntity } from '../../types'
import { OPTIONAL } from '../constants'

export const booleanSchemaEntity: SchemaEntity = {
  name: 'boolean',
  fn: (args, childValidators, data) => {
    if (typeof data === 'boolean') {
      return data
    }

    if (typeof data === 'undefined' || isNull(data)) {
      if (args && args.opt) {
        return OPTIONAL
      }
      throw new Error('Got undefined or null, expected Boolean')
    }

    if (args && args.coerce) {
      return Boolean(data)
    }

    throw new Error(`Got ${typeof data}, expected Boolean`)
  }
}
