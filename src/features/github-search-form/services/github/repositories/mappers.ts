import type { Repository, SearchResultsResponse, RepositoryUI, SearchResultsUI } from './RepositoriesService.types'

const formatStarsCount = (count: number): string => {
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M`
  }
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K`
  }
  return count.toString()
}

export const mapRepositoryToUI = (repo: Repository): RepositoryUI => ({
  id: repo.id,
  name: repo.name,
  description: repo.description,
  url: repo.html_url,
  language: repo.language,
  stars: repo.stargazers_count,
  owner: {
    name: repo.owner.login,
    avatar: repo.owner.avatar_url,
  },
  formattedStars: formatStarsCount(repo.stargazers_count),
  formattedLanguage: repo.language || 'Unknown',
  displayLanguage: repo.language || 'No language specified',
  displayDescription: repo.description || 'No description provided',
  hasDescription: Boolean(repo.description),
  hasLanguage: Boolean(repo.language),
  forksCount: repo.forks_count,
  openIssuesCount: repo.open_issues_count,
  formattedForksCount: formatStarsCount(repo.forks_count),
  formattedOpenIssuesCount: formatStarsCount(repo.open_issues_count),
})

export const mapSearchResponseToUI = (response: SearchResultsResponse): SearchResultsUI => ({
  repositories: response.items.map(mapRepositoryToUI),
  totalCount: response.total_count,
})
