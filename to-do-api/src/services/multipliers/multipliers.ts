// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  multipliersDataValidator,
  multipliersPatchValidator,
  multipliersQueryValidator,
  multipliersResolver,
  multipliersExternalResolver,
  multipliersDataResolver,
  multipliersPatchResolver,
  multipliersQueryResolver
} from './multipliers.schema'

import type { Application } from '../../declarations'
import { MultipliersService, getOptions } from './multipliers.class'
import { multipliersPath, multipliersMethods } from './multipliers.shared'

export * from './multipliers.class'
export * from './multipliers.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const multipliers = (app: Application) => {
  // Register our service on the Feathers application
  app.use(multipliersPath, new MultipliersService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: multipliersMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(multipliersPath).hooks({
    around: {
      all: [
        authenticate('jwt'),
        schemaHooks.resolveExternal(multipliersExternalResolver),
        schemaHooks.resolveResult(multipliersResolver)
      ]
    },
    before: {
      all: [
        schemaHooks.validateQuery(multipliersQueryValidator),
        schemaHooks.resolveQuery(multipliersQueryResolver)
      ],
      find: [],
      get: [],
      create: [
        schemaHooks.validateData(multipliersDataValidator),
        schemaHooks.resolveData(multipliersDataResolver)
      ],
      patch: [
        schemaHooks.validateData(multipliersPatchValidator),
        schemaHooks.resolveData(multipliersPatchResolver)
      ],
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
    [multipliersPath]: MultipliersService
  }
}
