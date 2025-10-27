import { Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { clsx } from 'clsx'

import type { SelectProps, Option } from './types'

export const Select = <T extends string = string>({ onChange, value, options, placeholder }: SelectProps<T>) => {
  return (
    <Combobox<Option<T>> immediate value={value} onChange={option => onChange(option as Option<T>)}>
      <div className='relative'>
        <ComboboxInput<Option>
          className={clsx(
            'block w-full rounded-md bg-white/2 py-1.5 pr-12 pl-3 text-sm/6 text-white caret-transparent',
            'outline-1 -outline-offset-1 outline-white/50',
            'focus:outline-2 focus:-outline-offset-2 focus:outline-[var(--color-theme-primary-500)]',
            'placeholder:text-gray-500'
          )}
          displayValue={option => option?.label || ''}
          value={value?.label || ''}
          placeholder={placeholder}
        />
        <ComboboxButton
          className={clsx(
            'absolute inset-y-0 right-0 left-0 flex items-center justify-end rounded-r-md px-2',
            'cursor-pointer focus:outline-hidden'
          )}>
          <ChevronDownIcon className='size-5 text-gray-500' aria-hidden='true' />
        </ComboboxButton>

        <ComboboxOptions
          transition
          className={clsx(
            'absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md',
            'border-white/10 bg-[var(--color-theme-primary-900)] py-1 text-sm',
            'outline -outline-offset-1 outline-white/10',
            'data-leave:transition data-leave:duration-100 data-leave:ease-in data-closed:data-leave:opacity-0',
            'cc-scrollbar'
          )}>
          {options.map(option => (
            <ComboboxOption
              key={option.id}
              value={option}
              className={clsx(
                'cursor-pointer px-3 py-2 text-left text-gray-300 select-none',
                'data-focus:bg-[var(--color-theme-primary-700)] data-focus:text-white data-focus:outline-hidden'
              )}>
              <span className='block truncate'>{option.label}</span>
            </ComboboxOption>
          ))}
        </ComboboxOptions>
      </div>
    </Combobox>
  )
}
