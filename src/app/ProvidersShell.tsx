import { ReactQueryProvider, ThemeProvider } from '@shared/providers'

export const ProvidersShell = ({ children }: React.PropsWithChildren) => {
  return (
    <ThemeProvider>
      <ReactQueryProvider>{children}</ReactQueryProvider>
    </ThemeProvider>
  )
}
