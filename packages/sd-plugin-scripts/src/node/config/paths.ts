import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'

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
  DEV: {
    PLUGIN: path.resolve(__dirname, '../../client/entry/development/plugin.js'),
    CONFIG: path.resolve(__dirname, '../../client/entry/development/config.js'),
  },
  PRO: {
    ONLY_PLUGIN: path.resolve(__dirname, '../../client/entry/production/onlyPlugin.js'),
    WITH_CONFIG: path.resolve(__dirname, '../../client/entry/production/withConfig.js'),
  },
}

// source 文件入口
export const PLUGIN_SOURCE = {
  PLUGIN_DEV: resolveModule(resolvePlugin, 'src/running/dev'),
  PLUGIN_PRO: resolveModule(resolvePlugin, 'src/running/pro'),
  SETTING_DEV: resolveModule(resolvePlugin, 'src/configuration/dev'),
  SETTING_PRO: resolveModule(resolvePlugin, 'src/configuration/pro'),
}


export const PLUGIN_HTML_PATH = resolvePlugin('public/index.html')

export const PLUGIN_PUBLIC_PATH = resolvePlugin('public')

export const PLUGIN_CONFIG_PATH = resolvePlugin('plugin.json')

export const PLUGIN_TEMP_PATH = resolvePlugin('node_modules/.sd-plugin-0x1461a0/plugin')

export const PLUGIN_CONFIG_TEMP_PATH = path.resolve(PLUGIN_TEMP_PATH, 'config.json')

export const CLI_CONFIG_PATH = resolvePlugin('plugin-cli.config.js')