import { subscribeWithSelector } from 'zustand/middleware'

import type { Middleware } from './eventsUtils.types'
import type { StateCreator } from 'zustand'

export const composeMiddlewares =
  <T>(baseConfig: StateCreator<T, [], [], T>) =>
  (...middlewares: Middleware<T>[]) => {
    const composedConfig = middlewares.reduceRight((config, middleware) => middleware(config), baseConfig)

    return subscribeWithSelector(composedConfig)
  }
