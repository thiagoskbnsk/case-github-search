import type { EventStore } from '../events-store/eventStore.types'
import type { EventListenerConfig, EventTypeKeys } from '../events.types'
import type { StateCreator } from 'zustand'

export type Middleware<T> = (config: StateCreator<T, [], [], T>) => StateCreator<T, [], [], T>

export type MiddlewareCreator<Options = Record<string, unknown>> = (options?: Options) => Middleware<EventStore>

export type CreateListenersInput<T extends ReadonlyArray<EventListenerConfig>> = {
  [K in keyof T]: T[K] extends { type: infer Type }
    ? Type extends EventTypeKeys
      ? EventListenerConfig<Type>
      : never
    : never
}
