export type Option<T extends string = string> = {
  id: string
  label: string
  value: T
}

export type SelectProps<T extends string = string> = {
  options: Option<T>[]
  onChange: (value: Option<T>) => void
  value: Option<T>
  placeholder?: string
}
