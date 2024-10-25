// For more information about this file see https://dove.feathersjs.com/guides/cli/validators.html
import { Ajv, addFormats } from '@feathersjs/schema'
import type { FormatsPluginOptions } from '@feathersjs/schema'
import type { Options } from 'ajv'

const formats: FormatsPluginOptions = [
  'date-time',
  'time',
  'date',
  'email',
  'hostname',
  'ipv4',
  'ipv6',
  'uri',
  'uri-reference',
  'uuid',
  'uri-template',
  'json-pointer',
  'relative-json-pointer',
  'regex'
]

export function createAjv(options: Options = {}) {
  return addFormats(new Ajv(options), formats).addKeyword({ type: 'object', keyword: 'instanceOf' })
  // .addKeyword({ type: 'null', keyword: 'typeOf', validate: schemaOf })
}

export const dataValidator: Ajv = createAjv({
  coerceTypes: true
})

export const queryValidator: Ajv = createAjv({
  coerceTypes: true
})
