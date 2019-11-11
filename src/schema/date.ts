import { isNull } from 'util'

import { SchemaEntity } from '../../types'
import { OPTIONAL } from '../constants'

export interface DateOptions {
  opt?: boolean
  parse?: boolean
  min?: number | string | Date
  max?: number | string | Date
}

export const dateSchemaEntity: SchemaEntity = {
  name: 'Date',
  acceptsRecursion: false,
  fn: (args?: DateOptions, data?: any) => {
    const type = typeof data

    // If we have no data, and this value is not optional, throw
    if (type === 'undefined' || isNull(data)) {
      if (args && args.opt) {
        return OPTIONAL
      }
      throw new Error(`Got undefined or null, required Date`)
    }

    // check the input datatype incase parse option was turned off
    if (
      Object.prototype.toString.call(data) !== '[object Date]' &&
      (!args || !args.parse)
    ) {
      throw new Error(`Got ${typeof data}, required Date`)
    }

    data = new Date(data)

    if (isNaN(data.getTime())) {
      throw new Error(
        `Got ${typeof data}, required Date or Date compatible string`
      )
    }

    if (args && args.min && data.getTime() < new Date(args.min).getTime()) {
      throw new Error(`Got date ${data}, expected greater than ${args.min}`)
    }

    if (args && args.max && data.getTime() > new Date(args.max).getTime()) {
      throw new Error(`Got date ${data}, expected less than ${args.max}`)
    }

    return data
  }
}
