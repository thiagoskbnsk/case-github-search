export type SuspenseWrapperProps = React.PropsWithChildren<{
  isFetching: boolean
  loadingFallback?: React.ReactNode
}>
