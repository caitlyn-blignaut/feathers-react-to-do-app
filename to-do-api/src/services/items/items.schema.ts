// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve, virtual } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import type { ItemsService } from './items.class'
import { userSchema } from '../users/users.schema'
import { randomUUID } from 'crypto'

// Main data model schema
export const itemsSchema = Type.Object(
  {
    id: Type.Number(),
    uid: Type.String(),
    text: Type.String(),
    checked: Type.Optional(Type.Boolean()),
    userId: Type.Number(),
    user: Type.Ref(userSchema),
    dateCreated: Type.Date(),
    dueDate: Type.Optional(Type.String({ format: 'date-time' }))
  },
  { $id: 'Items', additionalProperties: false }
)
export type Items = Static<typeof itemsSchema>
export const itemsValidator = getValidator(itemsSchema, dataValidator)
export const itemsResolver = resolve<Items, HookContext<ItemsService>>({
  user: virtual(async (item, context) => {
    return context.app.service('users').get(item.userId)
  })
})

export const itemsExternalResolver = resolve<Items, HookContext<ItemsService>>({})

// Schema for creating new entries
export const itemsDataSchema = Type.Pick(itemsSchema, ['text', 'dueDate', 'checked'], {
  $id: 'ItemsData'
})
export type ItemsData = Static<typeof itemsDataSchema>
export const itemsDataValidator = getValidator(itemsDataSchema, dataValidator)
export const itemsDataResolver = resolve<Items, HookContext<ItemsService>>({
  uid: async () => {
    return randomUUID()
  },
  userId: async (_value, _item, context) => {
    return context?.params?.user?.id
  },
  dateCreated: async () => {
    return new Date()
  }
})

// Schema for updating existing entries
export const itemsPatchSchema = Type.Partial(itemsSchema, {
  $id: 'ItemsPatch'
})
export type ItemsPatch = Static<typeof itemsPatchSchema>
export const itemsPatchValidator = getValidator(itemsPatchSchema, dataValidator)
export const itemsPatchResolver = resolve<Items, HookContext<ItemsService>>({})

// Schema for allowed query properties
export const itemsQueryProperties = Type.Pick(itemsSchema, [
  'uid',
  'text',
  'checked',
  'userId',
  'dueDate',
  'dateCreated'
])
export const itemsQuerySchema = Type.Intersect(
  [
    querySyntax(itemsQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type ItemsQuery = Static<typeof itemsQuerySchema>
export const itemsQueryValidator = getValidator(itemsQuerySchema, queryValidator)
export const itemsQueryResolver = resolve<ItemsQuery, HookContext<ItemsService>>({
  userId: async (value, _user, context) => {
    if (context.params.user) {
      return context.params.user.id
    }

    return value
  }
})
