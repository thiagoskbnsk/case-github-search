export type ButtonProps = React.PropsWithChildren<{
  onClick?: () => void
  className?: string
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
}>
