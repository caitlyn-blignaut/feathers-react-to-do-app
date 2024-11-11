// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type {
  Multipliers,
  MultipliersData,
  MultipliersPatch,
  MultipliersQuery,
  MultipliersService
} from './multipliers.class'

export type { Multipliers, MultipliersData, MultipliersPatch, MultipliersQuery }

export type MultipliersClientService = Pick<
  MultipliersService<Params<MultipliersQuery>>,
  (typeof multipliersMethods)[number]
>

export const multipliersPath = 'multipliers'

export const multipliersMethods: Array<keyof MultipliersService> = [
  'find',
  'get',
  'create',
  'patch',
  'remove'
]

export const multipliersClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(multipliersPath, connection.service(multipliersPath), {
    methods: multipliersMethods
  })
}

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [multipliersPath]: MultipliersClientService
  }
}
