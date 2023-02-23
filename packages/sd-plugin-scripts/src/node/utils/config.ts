import fs from 'node:fs'
import * as paths from '../config/paths'

export const useTypeScript = fs.existsSync(paths.TS_CONFIG_PATH)

export const shouldUseSourceMap = process.env.NO_SOURCEMAP !== 'true'

export const imageInlineSizeLimit = parseInt(
  process.env.IMAGE_INLINE_SIZE_LIMIT ?? `${4 * 1024}`
)
