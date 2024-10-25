// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  itemsDataValidator,
  itemsPatchValidator,
  itemsQueryValidator,
  itemsResolver,
  itemsExternalResolver,
  itemsDataResolver,
  itemsPatchResolver,
  itemsQueryResolver
} from './items.schema'

import type { Application } from '../../declarations'
import { ItemsService, getOptions } from './items.class'
import { itemsPath, itemsMethods } from './items.shared'

export * from './items.class'
export * from './items.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const items = (app: Application) => {
  // Register our service on the Feathers application
  app.use(itemsPath, new ItemsService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: itemsMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(itemsPath).hooks({
    around: {
      all: [
        authenticate('jwt'),
        schemaHooks.resolveExternal(itemsExternalResolver),
        schemaHooks.resolveResult(itemsResolver)
      ]
    },
    before: {
      all: [schemaHooks.validateQuery(itemsQueryValidator), schemaHooks.resolveQuery(itemsQueryResolver)],
      find: [],
      get: [],
      create: [schemaHooks.validateData(itemsDataValidator), schemaHooks.resolveData(itemsDataResolver)],
      patch: [schemaHooks.validateData(itemsPatchValidator), schemaHooks.resolveData(itemsPatchResolver)],
      remove: []
    },
    after: {
      all: []
    },
    error: {
      all: []
    }
  })
}

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    [itemsPath]: ItemsService
  }
}
