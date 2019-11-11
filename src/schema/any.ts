import { isNull } from 'util'

import { SchemaEntity } from '../../types'
import { OPTIONAL } from '../constants'

export interface AnyOptions {
  opt?: boolean
}

export const anySchemaEntity: SchemaEntity = {
  name: 'Any',
  acceptsRecursion: false,
  fn: (args?: AnyOptions, data?: any) => {
    if (typeof data === 'undefined' || isNull(data)) {
      if (args && args.opt) {
        return OPTIONAL
      }
      throw new Error('required Any value')
    }

    return data
  }
}
