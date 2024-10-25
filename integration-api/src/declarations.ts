// For more information about this file see https://dove.feathersjs.com/guides/cli/typescript.html
import {
  HookContext as FeathersHookContext,
  Id,
  NextFunction,
  NullableId,
  Paginated,
  PaginationParams,
  Params
} from '@feathersjs/feathers'
import { Application as FeathersApplication } from '@feathersjs/koa'
import { ApplicationConfiguration } from './configuration'

export type { NextFunction }

// The types for app.get(name) and app.set(name)
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Configuration extends ApplicationConfiguration {}

// A mapping of service names to types. Will be extended in service files.
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ServiceTypes {}

// The application instance type that will be used everywhere else
export type Application = FeathersApplication<ServiceTypes, Configuration>

// The context for hook functions - can be typed with a service class
export type HookContext<S = any> = FeathersHookContext<Application, S>

export interface CustomServiceMethods<
  Result = any,
  Data = Partial<Result>,
  ServiceParams = Params,
  PatchData = Partial<Data>
> {
  find(
    params?: ServiceParams & {
      paginate?: PaginationParams
    }
  ): Promise<Paginated<Result>>
  get(id: Id, params?: ServiceParams): Promise<Result>
  create(data: Data, params?: ServiceParams): Promise<Result>
  patch(id: NullableId, data: PatchData, params?: ServiceParams): Promise<Result | Result[]>
  remove(id: NullableId, params?: ServiceParams): Promise<Result | Result[]>
  setup?(app: Application, path: string): Promise<void>
  teardown?(app: Application, path: string): Promise<void>
}
