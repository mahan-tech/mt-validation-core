import { Sanitizer } from 'sanitizer'
import { isNull } from 'util'

import { SchemaEntity } from '../../types'
import { OPTIONAL } from '../constants'
// import { OPTIONAL } from '../constants'

export const stringSchemaEntity: SchemaEntity = {
  name: 'string',
  fn: (args, childValidators, data) => {
    const type = typeof data
    // Throw if both lower & upper are true
    if (args && (args.lower && args.upper)) {
      throw new Error(
        `String validator cannot have both lower and upper options set`
      )
    }

    // If we have no data, and this value is not optional, throw
    if (type === 'undefined' || isNull(data)) {
      if (args && args.opt) {
        return OPTIONAL
      }
      throw new Error(`Got undefined or null, required String`)
    }

    // Basic typechecking
    if (type !== 'string') {
      throw new Error(`Got ${type}, expected String`)
    }

    // Extra options

    // check length etc.
    if (args && args.len && data.length !== args.len) {
      throw new Error(`Got string length ${data.length}, expected ${args.len}`)
    }

    if (args && args.min && data.length < args.min) {
      throw new Error(
        `Got string length ${data.length}, expected more than ${args.min}`
      )
    }

    if (args && args.max && data.length > args.max) {
      throw new Error(
        `Got string length ${data.length}, expected less than ${args.max}`
      )
    }

    // Order of precedence should coerce values before they
    // are matched against the regex, and checked for enum.
    if (args && args.trim === true) {
      data = data.trim()
    }

    if (args && args.lower) {
      data = data.toLowerCase()
    }
    if (args && args.upper) {
      data = data.toUpperCase()
    }
    // Check if the user supplied a regex to match
    if (args && args.regex) {
      if (Object.prototype.toString.call(args.regex) !== '[object RegExp]') {
        try {
          args.regex = RegExp(args.regex)
        } catch (e) {
          throw new Error(`Invalid regex: ${args.regex.toString()}`)
        }
      }
      if (!args.regex.test(data)) {
        throw new Error(
          `Got ${data}, did not match regex: ${args.regex.toString()}`
        )
      }
    }
    // // Check if the user passed an array of
    // // allowed values, if they did, check the
    // // data we got matches one of them.
    // if(Array.isArray(args.enum)) {
    //   if(!args.enum.some(function(v) {
    //     return v == data
    //   })) {
    //     throw new Error(`Got ${data}, does not match enum option`)
    //   }
    // }
    if (args.sanitize) {
      data = Sanitizer.escape(data)
    }

    return data
  }
}
