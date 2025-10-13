export type Option<T extends string = string> = {
  id: string
  label: string
  value: T
}
export type TSelectOption<T extends string = string> = Option<T> | null

export type SelectProps<T extends string = string> = {
  options: Option<T>[]
  onChange: (value: TSelectOption<T>) => void
  value: TSelectOption<T>
  placeholder?: string
}
