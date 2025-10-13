export const SortOptionValues = {
  BEST_MATCH: 'best-match',
  STARGAZED: 'stargazed',
} as const

export type SortOptionValues =
  (typeof SortOptionValues)[keyof typeof SortOptionValues]

export const SORT_OPTIONS = [
  {
    id: SortOptionValues.BEST_MATCH,
    label: 'Best match (default)',
    value: SortOptionValues.BEST_MATCH,
  },
  {
    id: SortOptionValues.STARGAZED,
    label: 'Stargazed',
    value: SortOptionValues.STARGAZED,
  },
]
