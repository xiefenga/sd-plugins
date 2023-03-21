import fs from 'node:fs'
import dotenv from 'dotenv'
import { dotEnvPath } from './paths'

if (!process.env.NODE_ENV) {
  throw new Error(
    'The NODE_ENV environment variable is required but was not specified.'
  )
}

const env = process.env.NODE_ENV

const dotenvFiles = [
  `${dotEnvPath}.${env}.local`,
  `${dotEnvPath}.local`,
  `${dotEnvPath}.${env}`,
  dotEnvPath,
]

const envsFromDovEnv = dotenvFiles
  .filter(path => fs.existsSync(path))
  .reduce((memo: Record<string, string>, path) => {
    dotenv.config({ path })
    return {
      ...memo,
      ...dotenv.parse(
        fs.readFileSync(path)
      ),
    }
  }, {})

const defaultEnvs = {
  NODE_ENV: process.env.NODE_ENV,
}

const envs = Object.assign({}, envsFromDovEnv, defaultEnvs)

const reduceFn = (memo: Record<string, string>, [key, value]: [string, string]) => ({ ...memo, [key]: JSON.stringify(value) })

export const raw = envs

export const stringified = Object.entries(envs).reduce(reduceFn, {})
