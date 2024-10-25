// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#custom-services
import { Paginated, type Id, type Params } from '@feathersjs/feathers'

import type { Application, CustomServiceMethods, ServiceTypes } from '../../declarations'
import type { Items, ItemsData, ItemsPatch, ItemsQuery } from './items.schema'
import { ClientApplication } from 'to-do-api'
import { ItemsParams as ItemsApiParams } from 'to-do-api/lib/services/items/items.class'

import axios from 'axios'
import rest from '@feathersjs/rest-client'
import { createClient } from 'to-do-api'

export type { Items, ItemsData, ItemsPatch, ItemsQuery }

export interface ItemsServiceOptions {
  app: Application
  toDoApiClient: ClientApplication
}

export interface ItemsParams extends Params<ItemsQuery> {}

// This is a skeleton for a custom service class. Remove or add the methods you need here
export class ItemsService<ServiceParams extends ItemsParams = ItemsParams>
  implements CustomServiceMethods<Items, ItemsData, ServiceParams, ItemsPatch>
{
  constructor(public options: ItemsServiceOptions) {}

  async find(params: ServiceParams): Promise<Paginated<Items>> {
    const itemsParams: ItemsApiParams = {
      query: {
        $sort: params?.query?.$sort,
        checked: params?.query?.checked,
        dueDate: params?.query?.dueDate?.toLocaleString(),
        dateCreated: params?.query?.dateCreated
      }
    }

    const result = await this.options.toDoApiClient.service('items').find({
      ...itemsParams,
      paginate: { max: params?.query?.$limit, default: params?.query?.$skip },
      headers: { authorization: params?.headers?.authorization }
    })

    return {
      ...result,
      data: result?.data?.map((item) => {
        return {
          id: item?.id,
          text: item?.text,
          checked: item?.checked,
          dateCreated: item?.dateCreated,
          user: {
            name: item?.user?.name,
            email: item?.user?.email
          },
          dueDate: item?.dueDate ? new Date(item?.dueDate) : undefined
        }
      })
    }
  }

  async get(id: Id, params?: ServiceParams): Promise<Items> {
    const result = await this.options.toDoApiClient
      .service('items')
      .get(id, { headers: { authorization: params?.headers?.authorization } })

    return {
      id: result?.id,
      text: result?.text,
      checked: result?.checked,
      dateCreated: result?.dateCreated,
      user: {
        name: result?.user?.name,
        email: result?.user?.email
      },
      dueDate: result?.dueDate ? new Date(result?.dueDate) : undefined
    }
  }

  async create(data: ItemsData, params?: ServiceParams): Promise<Items>
  async create(data: ItemsData[], params?: ServiceParams): Promise<Items[]>
  async create(data: ItemsData | ItemsData[], params?: ServiceParams): Promise<Items | Items[]> {
    if (Array.isArray(data)) {
      return Promise.all(data.map((current) => this.create(current, params)))
    }

    const result = await this.options.toDoApiClient
      .service('items')
      .create(
        { ...data, dueDate: data?.dueDate?.toISOString() },
        { headers: { authorization: params?.headers?.authorization } }
      )

    return {
      id: result?.id,
      text: result?.text,
      checked: result?.checked,
      dateCreated: result?.dateCreated,
      user: {
        name: result?.user?.name,
        email: result?.user?.email
      },
      dueDate: result?.dueDate ? new Date(result?.dueDate) : undefined
    }
  }

  async patch(id: Id, data: ItemsPatch, params?: ServiceParams): Promise<Items> {
    const result = await this.options.toDoApiClient
      .service('items')
      .patch(
        id,
        { checked: data?.checked, text: data?.text, dueDate: data?.dueDate?.toISOString() },
        { headers: { authorization: params?.headers?.authorization } }
      )

    return {
      id: result?.id,
      text: result?.text,
      checked: result?.checked,
      dateCreated: result?.dateCreated,
      user: {
        name: result?.user?.name,
        email: result?.user?.email
      },
      dueDate: result?.dueDate ? new Date(result?.dueDate) : undefined
    }
  }

  async remove(id: Id, params?: ServiceParams): Promise<Items> {
    const result = await this.options.toDoApiClient
      .service('items')
      .remove(id, { headers: { authorization: params?.headers?.authorization } })

    return {
      id: result?.id,
      text: result?.text,
      checked: result?.checked,
      dateCreated: result?.dateCreated,
      user: {
        name: result?.user?.name,
        email: result?.user?.email
      },
      dueDate: result?.dueDate ? new Date(result?.dueDate) : undefined
    }
  }
}

export const getOptions = (app: Application) => {
  const toDoApiConnection = rest('http://localhost:3030').axios(axios.create())

  const toDoApiClient = createClient(toDoApiConnection)

  return { app, toDoApiClient, paginate: app.get('paginate') }
}
