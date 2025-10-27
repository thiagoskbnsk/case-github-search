import { clsx } from 'clsx'

import { useThemeSwitch } from '@shared/providers'

import { ARIA_LABELS, THEME_NAMES } from './placeholders'

export const ThemeSwitcher = () => {
  const { theme: currentTheme, setTheme, themes } = useThemeSwitch()

  return (
    <div className='flex items-center gap-3' role='radiogroup' aria-label={ARIA_LABELS.container}>
      {themes.map(theme => {
        const isSelected = currentTheme === theme
        const displayColor = `var(--color-base-${theme})`

        return (
          <button
            key={theme}
            onClick={() => setTheme(theme)}
            className={clsx(
              'h-8 w-8 cursor-pointer rounded-full transition-all duration-200 hover:scale-110 focus:outline-none',
              {
                'ring-2 ring-white ring-offset-2 ring-offset-black': isSelected,
              }
            )}
            style={{
              backgroundColor: displayColor,
            }}
            role='radio'
            aria-checked={isSelected}
            aria-label={ARIA_LABELS.themeButton(THEME_NAMES[theme])}
            title={THEME_NAMES[theme]}
          />
        )
      })}
    </div>
  )
}
