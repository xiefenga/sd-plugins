import fs from 'node:fs'
import path from 'node:path'

const PLUGIN_DIR = fs.realpathSync(process.cwd())

const resolvePlugin = (relative: string) => path.resolve(PLUGIN_DIR, relative)

const resolveModule = (resolveFn: typeof resolvePlugin, filePath: string) => {
  const extension = MODULE_FILE_EXTENSIONS.find(ext =>
    fs.existsSync(resolveFn(`${filePath}.${ext}`))
  ) ?? 'js'
  return resolveFn(`${filePath}.${extension}`)
}

export const MODULE_FILE_EXTENSIONS = ['ts', 'tsx', 'js', 'jsx', 'json']

export const PLUGIN_PATH = resolvePlugin('.')

export const PLUGIN_SRC_PATH = resolvePlugin('src')

export const DOT_ENV_PATH = resolvePlugin('.env')

export const DIST_PATH = resolvePlugin('dist')

export const PLUGIN_PACKAGE_PATH = resolvePlugin('package.json')

export const TS_CONFIG_PATH = resolvePlugin('tsconfig.json')

export const PROXY_SETUP_PATH = resolvePlugin('proxy.js')

export const PLUGIN_NODE_MODULES = resolvePlugin('node_modules')

export const PLUGIN_NODE_MODULES_STORE = resolvePlugin('node_modules/.sd-plugin-0x1461a0')

export const PLUGIN_WEBPACK_CACHE = resolvePlugin('node_modules/.cache')

export const PLUGIN_INDEX = resolvePlugin('node_modules/.sd-plugin-0x1461a0/entry.js')

export const PLUGIN_INDEX_TEMPLATE = path.resolve(__dirname, '../entry/template.js')

export const PLUGIN_DEV_INDEX = resolveModule(resolvePlugin, 'src/main-dev')

export const PLUGIN_PRO_INDEX = resolveModule(resolvePlugin, 'src/main-pro')

export const PLUGIN_HTML_PATH = resolvePlugin('public/index.html')

export const PLUGIN_PUBLIC_PATH = resolvePlugin('public')

export const PLUGIN_CONFIG_PATH = resolvePlugin('plugin.json')

export const PLUGIN_TEMP_PATH = resolvePlugin('node_modules/.sd-plugin-0x1461a0/plugin')
