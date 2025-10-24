import { subscribeWithSelector } from 'zustand/middleware'

import type { StateCreator, StoreApi } from 'zustand'

export type MiddlewareContext<T> = {
  get: () => T
  set: (partial: T | Partial<T> | ((state: T) => T | Partial<T>)) => void
  api: StoreApi<T>
}

export type MiddlewareFunction<T> = (context: MiddlewareContext<T>) => Promise<void> | void

// Sequential middleware composer
export const middlewareComposer = <T>(stateCreator: StateCreator<T, [], [], T>) => {
  return (...middlewares: MiddlewareFunction<T>[]) => {
    // First apply subscribeWithSelector
    const withSubscribe = subscribeWithSelector(stateCreator)

    // Then apply our middlewares
    return (
      set: Parameters<StateCreator<T>>[0],
      get: Parameters<StateCreator<T>>[1],
      api: Parameters<StateCreator<T>>[2]
    ) => {
      // Create the store first
      const store = withSubscribe(set, get, api)

      // Create middleware context
      const context = { get, set, api }

      // Execute middlewares sequentially
      executeMiddlewaresSequential(middlewares, context)

      return store
    }
  }
}

// Execute middlewares in order (important for emit modifications)
const executeMiddlewaresSequential = async <T>(middlewares: MiddlewareFunction<T>[], context: MiddlewareContext<T>) => {
  for (const middleware of middlewares) {
    try {
      await middleware(context)
    } catch (error) {
      console.error('Middleware execution failed:', error)
    }
  }
}
