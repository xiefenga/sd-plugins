import fs from 'fs-extra'
import { pkgPath, proxyFilePath } from './paths'

export const PKG = fs.readJSONSync(pkgPath)

export const proxy = fs.existsSync(proxyFilePath)
  ? require(proxyFilePath)
  : {}
