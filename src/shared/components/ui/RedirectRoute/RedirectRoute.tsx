import { Navigate, useLocation } from 'react-router'

import type { RedirectRouteProps } from './RedirectRoute.types'

/**
 * Generic redirect component that can be used for 404s, authentication, or custom redirects
 * Automatically includes the original path in state for breadcrumb tracking
 */
export const RedirectRoute = ({ to, statusCode, replace = true, state = {} }: RedirectRouteProps) => {
  const location = useLocation()

  const navigationState = {
    ...state,
    ...(statusCode && { statusCode }),
    originalPath: location.pathname,
  }

  return <Navigate to={to} replace={replace} state={navigationState} />
}
