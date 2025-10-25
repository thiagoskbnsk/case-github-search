export type RedirectRouteProps = {
  to: string
  statusCode?: number
  replace?: boolean
  state?: Record<string, unknown>
}
