/**
 * TODO:
 * this file has a diff name from the others, select a pattern
 */
export type ButtonProps = React.PropsWithChildren<{
  onClick?: () => void
  className?: string
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
}>
