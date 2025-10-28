import { QueryClientProvider } from '@tanstack/react-query'

import { queryClient } from './queryClient'

export const ReactQueryProvider = ({ children }: React.PropsWithChildren) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}
