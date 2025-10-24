import { subscribeWithSelector } from 'zustand/middleware'

import type { StateCreator } from 'zustand'

// Middleware creator type - follows Zustand's pattern
export type MiddlewareCreator<T> = (config: StateCreator<T, [], [], T>) => StateCreator<T, [], [], T>

/**
 * Composes middlewares using Zustand's standard function wrapping pattern
 * Middlewares are applied right-to-left, so the last middleware in the array wraps first
 * This ensures proper execution order where the first middleware executes first
 */
export const middlewareComposer = <T>(baseConfig: StateCreator<T, [], [], T>) => {
  return (...middlewares: MiddlewareCreator<T>[]) => {
    // Compose middlewares right-to-left (like Redux/Zustand)
    // reduceRight ensures: middleware1(middleware2(middleware3(baseConfig)))
    const composedConfig = middlewares.reduceRight((config, middleware) => middleware(config), baseConfig)

    // Apply subscribeWithSelector as the outermost wrapper
    return subscribeWithSelector(composedConfig)
  }
}
