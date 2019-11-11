import { isNull } from 'util'

import { SchemaEntity } from '../../types'
import { OPTIONAL } from '../constants'

export interface NumberOptions {
  opt?: boolean
  minEqual?: number
  maxEqual?: number
  min?: number
  max?: number
  coerceInteger?: boolean | number
  coerceFloat?: boolean
}

export const numberSchemaEntity: SchemaEntity = {
  name: 'Number',
  acceptsRecursion: false,
  fn: (args?: NumberOptions, data?: any) => {
    if (typeof data === 'undefined' || isNull(data)) {
      if (args && args.opt) {
        return OPTIONAL
      }
      throw new Error('Got undefined or null, required Number')
    }

    const origType = typeof data
    data = Number(data)

    if (isNaN(data)) {
      throw new Error(`Got ${origType}, expected Number`)
    }

    if (args && args.minEqual && !(data >= args.minEqual)) {
      throw new Error(`Got ${data}, expected more equal than ${args.minEqual}`)
    }

    if (args && args.min && !(data > args.min)) {
      throw new Error(`Got ${data}, expected more than ${args.min}`)
    }

    if (args && args.maxEqual && !(data <= args.maxEqual)) {
      throw new Error(`Got ${data}, expected less equal than ${args.maxEqual}`)
    }

    if (args && args.max && !(data < args.max)) {
      throw new Error(`Got ${data}, expected less than ${args.max}`)
    }

    if (args && args.coerceInteger) {
      data = parseInt(
        data,
        // radix
        typeof args.coerceInteger === 'number' ? args.coerceInteger : undefined
      )
    }

    if (args && args.coerceFloat) {
      data = parseFloat(data)
    }

    return data
  }
}
