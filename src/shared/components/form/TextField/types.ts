export type TextFieldProps = {
  leftIcon?: React.ReactNode
  placeholder?: string
  label: string
  value?: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  disabled?: boolean
  error?: string
  id?: string
  name?: string
  className?: string
  loading?: boolean
  onClear?: () => void
}
