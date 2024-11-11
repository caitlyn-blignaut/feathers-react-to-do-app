// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import { ObjectIdSchema } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import type { MultipliersService } from './multipliers.class'

// Main data model schema
export const multipliersSchema = Type.Object(
  {
    _id: ObjectIdSchema(),
    text: Type.String()
  },
  { $id: 'Multipliers', additionalProperties: false }
)
export type Multipliers = Static<typeof multipliersSchema>
export const multipliersValidator = getValidator(multipliersSchema, dataValidator)
export const multipliersResolver = resolve<Multipliers, HookContext<MultipliersService>>({})

export const multipliersExternalResolver = resolve<Multipliers, HookContext<MultipliersService>>({})

// Schema for creating new entries
export const multipliersDataSchema = Type.Pick(multipliersSchema, ['text'], {
  $id: 'MultipliersData'
})
export type MultipliersData = Static<typeof multipliersDataSchema>
export const multipliersDataValidator = getValidator(multipliersDataSchema, dataValidator)
export const multipliersDataResolver = resolve<Multipliers, HookContext<MultipliersService>>({})

// Schema for updating existing entries
export const multipliersPatchSchema = Type.Partial(multipliersSchema, {
  $id: 'MultipliersPatch'
})
export type MultipliersPatch = Static<typeof multipliersPatchSchema>
export const multipliersPatchValidator = getValidator(multipliersPatchSchema, dataValidator)
export const multipliersPatchResolver = resolve<Multipliers, HookContext<MultipliersService>>({})

// Schema for allowed query properties
export const multipliersQueryProperties = Type.Pick(multipliersSchema, ['_id', 'text'])
export const multipliersQuerySchema = Type.Intersect(
  [
    querySyntax(multipliersQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type MultipliersQuery = Static<typeof multipliersQuerySchema>
export const multipliersQueryValidator = getValidator(multipliersQuerySchema, queryValidator)
export const multipliersQueryResolver = resolve<MultipliersQuery, HookContext<MultipliersService>>({})
