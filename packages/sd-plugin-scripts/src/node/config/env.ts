import fs from 'node:fs'
import dotenv from 'dotenv'
import { Env } from '../types'
import { DOT_ENV_PATH } from './paths'
import { PLUGIN_CONFIG_JSON } from '../utils/files'

export default function (env: Env) {
  
  process.env.NODE_ENV = env

  const dotenvFiles = [
    `${DOT_ENV_PATH}.${env}.local`,
    `${DOT_ENV_PATH}.local`,
    `${DOT_ENV_PATH}.${env}`,
    DOT_ENV_PATH,
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

  const pluginEnvs = {
    PLUGIN_ID: PLUGIN_CONFIG_JSON.id,
    PLUGIN_TYPE: PLUGIN_CONFIG_JSON.type,
  }

  Object.entries(pluginEnvs).forEach(([key, value]) => process.env[key] = value)

  const defaultEnvs = {
    NODE_ENV: process.env.NODE_ENV,
    WITH_SETTING: process.env.WITH_SETTING,
  }

  const envs = Object.assign({}, envsFromDovEnv, pluginEnvs, defaultEnvs)

  const reduceFn = (memo: Record<string, string>, [key, value]: [string, any]) => ({ ...memo, [key]: JSON.stringify(value) })

  return {
    raw: envs,
    stringified: Object.entries(envs).reduce(reduceFn, {}),
  }
}