# MT-Validation-Core

The purpose of this library is to maintain a generic validation across application.
For some of its applications can point out to:

- form validations
- middleware(routes)

# Design / Architecture

This library designed to bring more simplicity and increase the velocity of development.

To simplify the way validation works we have to first look at the work flow of validation.
Validation supports various numbers of schemas which you can use to validate your data, for example make sure the data has your following structure or datatype or after validation will you expect to be returned in your preferred datatype or not.

### Workflow

#### 1 - Schema Checkpoint (Schema validation)

This step makes sure that the schema that has been defined by developer follows the guidelines and if not, it will throw exception to make the developer know that defined validation is not valid.

#### 2 - Validation

This steps will run the validated schema throw the validations and will create a OK list.
**At this step, no exception will thrown.**
OK list consists of your original schema and their status.
if schema is valid, it will return it's original/parsed value as developer structured, if not, it will return an error class and the reason for it's rejection.

# How to use

This library consists of few pre written validations like `String`, `Number`, `Boolean`, `Email`, `Date`, `any`.

**At the moment it's not possible to add external validations to validation list but it will be rolled out as `Extension Validations` that you can easily bind to the list of pre written validations.**

### Defining schema and validate

To define the schema you need to first create an instance from Validation class as following:

**Typescript:**

```
import { Validation } from 'mt-validation-core'

const options = {} // refer to document for more info
const validation = new Validation(options)
validation.schema(...)
validation.validate(...)
```

##### Options

At the initialization, you can pass options to customize the use base on your need

| Option | Default value | Value type | Possible values                     | Note                                                                                                                                                                                               |
| ------ | ------------- | ---------- | ----------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `mode` | `schema`      | `string`   | - `error`<br>- `schema`<br>- `list` | - `error` will throw exception as soon as it's being found<br> - `schema` will return the errors according to the same structure as schema<br>- `list` will return the errors in the form of array |

#### schema(schema: any) => void | Error:

To set your desirable schema into the validation, you can use the `schema` function which is a public function in `Validation` class.
This function will act as checkpoint to certify that your schema is valid and precedable.
**This method will handle the step #1 of the workflow.**

##### schema:

To define schema, you need to use the validation schemas as following.

```
import { Schemas as s } from 'mt-validation-core'

const validation = new Validation()
validation.schema(s.String())
validation.validate('Valid string')
```

Here is the list of acceptable schemas under `Schemas` object:

| Schema             | Default                                                                                                                                                                                                        | Options                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | What does it do                                                |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| `Any(options)`     | - `opt`: false                                                                                                                                                                                                 | -`opt` as `Boolean`, Optional input, includes `null`, `undefined` as acceptable                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Considers any input as long as it's not `null` or `undefined`. |
| `String(options)`  | - `upper`: undefined<br>- `lower`: undefined<br>- `len`: undefined<br>- `min`: undefined<br>- `max`: undefined<br>- `trim`: undefined<br>- `regex`: undefined<br>- `sanitize`: undefined<br>- `opt`: undefined | - `upper` as `Boolean`, will convert the output to upper<br>- `lower` as `Boolean`, will convert the output to lowercase<br>- `len` as `Integer`, checks if length of string is equal to the value<br>- `min` as `Integer`, checks if length of string is lesser than this value<br>- `max` as `Integer`, checks if length of string is greater than this value<br>- `trim` as `Boolean`, performs the trim on output value<br>- `regex` as `RegExp`, check if string matches the regular expression.<br>- `sanitize` as `Boolean`, sanitizes the data after validation and return the clean string<br>- `opt` as `Boolean`, Optional input, includes `null`, `undefined` as acceptable | Consider only string as the valid value.                       |
| `Number(options)`  | - `min`: undefined<br>- `max`: undefined<br>- `minEqual`: undefined<br>- `maxEqual`: undefined<br>- `coerceInteger`: undefined<br>- `coerceFloat`: undefined<br>- `opt`: undefined                             | - `min` as 'Integer', checks if value is greater than min value<br>- `max` as 'Integer', checks if value is lesser than max value<br>- `minEqual` as 'Integer', checks if value is greater equal than min value<br>- `maxEqual` as 'Integer', checks if value is lesser equal than max value<br>- `coerceInteger` as `Boolean` OR 'Integer', forces the return value to cast as Integer, either boolean or pass base number(radix).<br>- `coerceFloat` as 'Boolean', forces the return value to cast as Float<br>- `opt` as 'Boolean', Optional input, includes `null`, `undefined` as acceptable                                                                                       | Consider only number as the valid value.                       |
| `Boolean(options)` | - `coerce`: undefined<br>- `opt`: undefined                                                                                                                                                                    | - `coerce` as 'Boolean', forces the return value to cast as Boolean<br>- `opt` as 'Boolean', Optional input, includes `null`, `undefined` as acceptable                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Consider only boolean as the valid value.                      |
| `Email(options)`   | - `normalize`: undefined<br>- `opt`: undefined                                                                                                                                                                 | - `normalize` as 'Boolean', lowercases the string before validating for email<br>- `opt` as 'Boolean', Optional input, includes `null`, `undefined` as acceptable                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Checks if the value is a valid email.                          |
| `Date(options)`    | - `parse`: undefined<br>- `opt`: undefined                                                                                                                                                                     | - `parse` as 'Boolean', it will force the input to be converted to Date object.<br>- `opt` as 'Boolean', Optional input, includes `null`, `undefined` as acceptable                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Checks if the value is a valid date.                           |

#### validate(input: any) => any | any[] | Error:

To run the step #2 of the workflow, you need to pass the data that you are going to validate against the schema.
The structure of the output in this method is base on the option `mode` on initialization.
