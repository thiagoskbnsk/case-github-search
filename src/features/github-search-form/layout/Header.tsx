import { DEFAULT_TEXTS } from '../constants/placeholders'

export const Header = () => {
  return (
    <>
      <h1
        className="text-2xl font-semibold tracking-tight text-balance text-white
          sm:text-3xl"
      >
        {DEFAULT_TEXTS.title}
      </h1>
      <p className="mx-auto mt-3 max-w-xl text-sm text-pretty text-gray-300">
        {DEFAULT_TEXTS.description}
      </p>
    </>
  )
}
