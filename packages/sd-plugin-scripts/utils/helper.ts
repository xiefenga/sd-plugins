import { Env } from '../types'

export const assertNodeEnv = (NODE_ENV: string | undefined): asserts NODE_ENV is Env => {
  if (!NODE_ENV) {
    throw new Error(
      'The NODE_ENV environment variable is required but was not specified.'
    )
  } else if (!['development', 'production'].includes(NODE_ENV)) {
    throw new Error(
      'The NODE_ENV environment variable can only be set development and production.'
    )
  } else {
    // 
    throw new Error(
      'The NODE_ENV environment variable can only be set development and production.'
    )
  }
}