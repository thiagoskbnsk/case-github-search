import type { MiddlewareCreator } from './eventsUtils.types'
import type { EventStore } from '../events-store/eventStore.types'
import type { StateCreator, StoreApi } from 'zustand'

export const createMiddleware = <Options extends { enabled?: boolean } = { enabled?: boolean }>(
  implementation: <T extends EventStore>(
    options: Options,
    store: T,
    set: StoreApi<T>['setState'],
    get: StoreApi<T>['getState'],
    api: StoreApi<T>
  ) => T
): MiddlewareCreator<Options> => {
  return (options = {} as Options) => {
    const { enabled = true } = options

    return <T extends EventStore>(config: StateCreator<T, [], [], T>): StateCreator<T, [], [], T> => {
      if (!enabled) return config

      return (set, get, api) => {
        const store = config(set, get, api)
        return implementation(options, store, set, get, api)
      }
    }
  }
}
