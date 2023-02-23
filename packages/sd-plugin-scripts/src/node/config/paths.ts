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

export const WEBPACK_CACHE_DIR = resolvePlugin('node_modules/.cache')

export const WEBPACK_ENTRY_DIR = resolvePlugin('node_modules/.sd-plugin-0x1461a0/entry')

// 入口 template 文件
export const PLUGIN_ENTRY_TEMPLATE = {
  PLUGIN_DEV: path.resolve(__dirname, '../../client/entry/dev.js'),
  PLUGIN_PRO: path.resolve(__dirname, '../../client/entry/pro.js'),
  PLUGIN_SETTING: path.resolve(__dirname, '../../client/entry/setting.js'),
}

// source 文件入口
export const PLUGIN_SOURCE = {
  PLUGIN_DEV: resolveModule(resolvePlugin, 'src/main-dev'),
  PLUGIN_PRO: resolveModule(resolvePlugin, 'src/main-pro'),
  SETTING_DEV: resolveModule(resolvePlugin, 'src/configuration/dev'),
  SETTING_PRO: resolveModule(resolvePlugin, 'src/configuration/pro'),
}


export const PLUGIN_HTML_PATH = resolvePlugin('public/index.html')

export const PLUGIN_PUBLIC_PATH = resolvePlugin('public')

export const PLUGIN_CONFIG_PATH = resolvePlugin('plugin.json')

export const PLUGIN_TEMP_PATH = resolvePlugin('node_modules/.sd-plugin-0x1461a0/plugin')

export const PLUGIN_CONFIG_TEMP_PATH = path.resolve(PLUGIN_TEMP_PATH, 'config.json')
