import { INFO_LABELS, DEFAULT_TEXTS } from './DetailsGithub.placeholders'

import type { DataKeyItem } from './DetailsGithub.types'

export const DATA_KEYS: Record<string, DataKeyItem> = {
  STARS: {
    key: 'stars',
    label: INFO_LABELS.stars,
    renderKey: 'formattedStars',
  },
  FORKS: {
    key: 'forks',
    label: INFO_LABELS.forks,
    renderKey: 'formattedForksCount',
  },
  OPEN_ISSUES: {
    key: 'openIssues',
    label: INFO_LABELS.openIssues,
    renderKey: 'formattedOpenIssuesCount',
  },
  OWNER: {
    key: 'owner',
    label: INFO_LABELS.owner,
    renderKey: 'owner.name',
  },
  REPOSITORY: {
    key: 'repository',
    label: INFO_LABELS.repository,
    renderKey: 'name',
  },
  DESCRIPTION: {
    key: 'description',
    label: INFO_LABELS.description,
    renderKey: 'displayDescription',
  },
  LANGUAGE: {
    key: 'language',
    label: INFO_LABELS.language,
    renderKey: 'displayLanguage',
  },
}

export const NOT_FOUND_STATE = {
  title: DEFAULT_TEXTS.notFoundRepository.title,
  description: DEFAULT_TEXTS.notFoundRepository.description,
} as const
