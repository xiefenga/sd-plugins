import fs from 'fs-extra'
import {
  PLUGIN_CONFIG_PATH,
  PLUGIN_PACKAGE_PATH,
  PLUGIN_ENTRY_TEMPLATE
} from '../config/paths'

export const PKG = fs.readJSONSync(PLUGIN_PACKAGE_PATH)

export const PLUGIN_CONFIG_JSON = fs.readJSONSync(PLUGIN_CONFIG_PATH)

// template 文件
export const ENTRY_TEMPLATE = {
  DEV: {
    PLUGIN: fs.readFileSync(PLUGIN_ENTRY_TEMPLATE.DEV.PLUGIN, 'utf-8'),
    CONFIG: fs.readFileSync(PLUGIN_ENTRY_TEMPLATE.DEV.CONFIG, 'utf-8'),
  },
  PRO: {
    ONLY_PLUGIN: fs.readFileSync(PLUGIN_ENTRY_TEMPLATE.PRO.ONLY_PLUGIN, 'utf-8'),
    WITH_CONFIG: fs.readFileSync(PLUGIN_ENTRY_TEMPLATE.PRO.WITH_CONFIG, 'utf-8'),
  },
}
