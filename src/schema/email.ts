import { isNull } from 'util'
import * as isEmail from 'isemail'

import { SchemaEntity } from '../../types'
import { OPTIONAL } from '../constants'

export const emailSchemaEntity: SchemaEntity = {
  name: 'email',
  fn: (args, data) => {
    if (typeof data === 'undefined' || isNull(data)) {
      if (args && args.opt) {
        return OPTIONAL
      }
      throw new Error('Got undefined, required Email (string)')
    }

    const type = typeof data

    if (type !== 'string') {
      throw new Error(`Got ${type}, required Email (string)`)
    }

    data = data.trim()

    if (args && args.normalize) {
      data = data.toLowerCase()
    }

    if (!isEmail.validate(data)) {
      throw new Error(`Invalid Email: ${data}`)
    }

    return data
  }
}
