import { Navigate, useLocation } from 'react-router'

import type { RedirectRouteProps } from './types'

/**
 * TODO: make it more generic, can be used on DetailsPage
 */
export const RedirectRoute = ({ to, statusCode, replace = true }: RedirectRouteProps) => {
  const location = useLocation()

  return <Navigate to={to} replace={replace} state={{ statusCode, originalPath: location.pathname }} />
}
