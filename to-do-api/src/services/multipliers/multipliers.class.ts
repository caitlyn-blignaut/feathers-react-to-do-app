// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { MongoDBService } from '@feathersjs/mongodb'
import type { MongoDBAdapterParams, MongoDBAdapterOptions } from '@feathersjs/mongodb'

import type { Application } from '../../declarations'
import type { Multipliers, MultipliersData, MultipliersPatch, MultipliersQuery } from './multipliers.schema'

export type { Multipliers, MultipliersData, MultipliersPatch, MultipliersQuery }

export interface MultipliersParams extends MongoDBAdapterParams<MultipliersQuery> {}

// By default calls the standard MongoDB adapter service methods but can be customized with your own functionality.
export class MultipliersService<ServiceParams extends Params = MultipliersParams> extends MongoDBService<
  Multipliers,
  MultipliersData,
  MultipliersParams,
  MultipliersPatch
> {}

export const getOptions = (app: Application): MongoDBAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('mongodbClient').then((db) => db.collection('multipliers'))
  }
}
