type ButtonProps = React.PropsWithChildren<{
  onClick?: () => void
  className?: string
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
}>

export const Button = ({
  children,
  onClick,
  className,
  disabled,
  type = 'button',
}: ButtonProps) => {
  const handleClick = () => {
    if (disabled) return

    onClick?.()
  }

  return (
    <button
      type={type}
      onClick={handleClick}
      className={`cursor-pointer rounded-md bg-indigo-500 px-3 py-2 text-sm
        font-semibold text-white hover:bg-indigo-400 focus:relative ${className}
        aria-disabled:cursor-not-allowed aria-disabled:opacity-60`}
      aria-disabled={disabled}
    >
      {children}
    </button>
  )
}
