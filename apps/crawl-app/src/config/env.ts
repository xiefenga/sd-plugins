import fs from 'node:fs'
import dotenv from 'dotenv'
import { dotEnvPath } from './paths.js'

if (!fs.existsSync(dotEnvPath)) {
  throw new Error('缺少配置文件，无法启动！！！')
}

const dotenvFiles = [
  // `${dotEnvPath}.${env}.local`,
  // `${dotEnvPath}.local`,
  // `${dotEnvPath}.${env}`,
  dotEnvPath,
]

const parseEnv = (path: string) => {
  return dotenv.config({ path }).parsed as NodeJS.ProcessEnv
}

export const config = dotenvFiles.reduce((config, envFile) => {
  return {
    ...config,
    ...parseEnv(envFile),
  }
}, {} as NodeJS.ProcessEnv)

console.log(config)
