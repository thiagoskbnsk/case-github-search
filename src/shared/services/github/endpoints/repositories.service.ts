export type Repository = {
  id: string
  description: string
  language: string | null
  name: string
  owner: Record<'login', string>
  stargazers_count: number
}

export type SearchResultsResponse = {
  items: Repository[]
  count: number
}

export const fetchSearchResults = async (
  searchTerm: string
): Promise<SearchResultsResponse> => {
  const response = await fetch(
    `https://api.github.com/search/repositories?q=${searchTerm}`,
    {
      method: 'GET',
      headers: {
        Accept: 'application/vnd.github.v3+json',
      },
    }
  )

  const data = await response.json()

  return {
    items: data.items,
    count: data.total_count,
  }
}
