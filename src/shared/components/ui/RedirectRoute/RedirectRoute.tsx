import { Navigate, useLocation } from 'react-router'

import type { RedirectRouteProps } from './types'

export const RedirectRoute = ({ to, statusCode, replace = true }: RedirectRouteProps) => {
  const location = useLocation()

  return <Navigate to={to} replace={replace} state={{ statusCode, originalPath: location.pathname }} />
}
