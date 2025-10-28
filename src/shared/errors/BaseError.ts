/**
 * Extracts caller information from error stack trace
 */
const extractCallerInfo = (stackOffset: number = 3): { functionName: string; fileName: string } => {
  const stack = new Error().stack || ''
  const stackLines = stack.split('\n')
  const callerLine = stackLines[stackOffset] || ''

  // Extract function name
  const functionMatch = callerLine.match(/at\s+(\w+)/) || callerLine.match(/(\w+)@/)
  const functionName = functionMatch?.[1] || 'unknown'

  // Extract file name
  const fileMatch = callerLine.match(/\(([^)]+)\)/) || callerLine.match(/(@.+)/)
  const fullPath = fileMatch?.[1] || ''
  const fileName = fullPath.split('/').pop()?.split('\\').pop()?.split(':')[0] || 'unknown'

  return { functionName, fileName }
}

/**
 * Base error class with automatic caller information extraction
 * All custom errors should extend this class
 */
export abstract class BaseError extends Error {
  functionName: string
  fileName: string
  originalError: unknown
  metadata?: Record<string, unknown>

  constructor(message: string, originalError: unknown, metadata?: Record<string, unknown>) {
    super(message)
    this.name = this.constructor.name

    const callerInfo = extractCallerInfo(4) // Offset 4 to skip BaseError constructor
    this.functionName = callerInfo.functionName
    this.fileName = callerInfo.fileName
    this.originalError = originalError
    this.metadata = metadata

    // Maintain proper stack trace
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor)
    }
  }

  /**
   * Gets the full context of where the error occurred
   */
  getContext(): string {
    return `[${this.fileName}:${this.functionName}]`
  }
}
