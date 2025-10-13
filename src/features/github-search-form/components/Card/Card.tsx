import { memo } from 'react'
import { StarIcon } from '@heroicons/react/16/solid'

type CardProps = {
  description: string
  language: string | null
  name: string
  ownerLogin: string
  stargazersCount: number
}

export const Card = memo(
  ({ description, language, name, ownerLogin, stargazersCount }: CardProps) => {
    return (
      <div className="cc-card rounded-md">
        <div
          className="flex items-center justify-between border-b border-white/10
            p-4"
        >
          <p className="flex gap-1.5 text-sm text-gray-400">
            <span>{ownerLogin}</span>
            <span>/</span>
            <span
              className="w-[300px] overflow-hidden text-left text-sm font-medium
                text-ellipsis whitespace-nowrap text-white"
            >
              {name}
            </span>
          </p>
          <span className="flex items-start gap-x-2">
            <div
              className="rounded-md bg-blue-500/10 px-2 py-1 text-xs font-medium
                text-blue-500 ring-1 ring-blue-500/10 ring-inset"
            >
              {language}
            </div>
            <div
              className="flex gap-1 rounded-md bg-yellow-500/10 px-2 py-1
                text-xs font-medium text-yellow-500 ring-1 ring-yellow-500/10
                ring-inset"
            >
              <StarIcon width={16} height={16} /> {stargazersCount}
            </div>
          </span>
        </div>
        <div className="p-4 text-left text-sm">
          <p className="text-gray-400">{description}</p>
        </div>
      </div>
    )
  }
)
