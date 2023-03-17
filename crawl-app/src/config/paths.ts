import { fileURLToPath } from 'node:url'
import { join, resolve } from 'node:path'
import { $Env } from '../utils/env.js'

const __filename = fileURLToPath(import.meta.url)

const __dirname = join(__filename, '../')

const rootDir = resolve(__dirname, '../../')

const resolveApp = (relative: string) => {
  return resolve(rootDir, relative)
}

export const rootPath = resolveApp('.')

export const appPath = resolveApp('src')

const env = $Env('NODE_ENV', ['development', 'production'])

export const dotEnvPath = resolveApp(
  env === 'development'
    ? '.env'
    : '../.env'
)

