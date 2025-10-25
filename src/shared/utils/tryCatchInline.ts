/**
 * Executes an async function and handles errors inline, returning a tuple with the result or error.
 *
 * @template T - The type of the successful result
 * @template E - The type of the error (defaults to Error)
 * @param {TryFn<T>} tryFn - An async function to execute that returns a Promise of type T
 * @param {OnError<E>} onError - A callback function to handle errors when they occur, returns the error
 * @returns {Promise<[T, null] | [null, E]>} A promise that resolves to a discriminated union tuple where:
 *   - [T, null] if successful - data is T, error is null
 *   - [null, E] if error occurred - data is null, error is E
 *
 * @example
 * ```typescript
 * const [data, error] = await tryCatchInline(
 *   async () => fetchUserData(userId),
 *   (err) => new Error(`Failed to fetch user: ${err}`)
 * );
 * ```
 */
type TryFn<T> = () => Promise<T>
type OnError<E = Error> = (error: unknown) => E

export const tryCatchInline = async <T, E = Error>(
  tryFn: TryFn<T>,
  onError: OnError<E>
): Promise<[T, null] | [null, E]> => {
  try {
    const result = await tryFn()
    return [result, null]
  } catch (error) {
    return [null, onError(error)]
  }
}
