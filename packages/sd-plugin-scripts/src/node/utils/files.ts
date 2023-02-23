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
  PLUGIN_DEV: fs.readFileSync(PLUGIN_ENTRY_TEMPLATE.PLUGIN_DEV, 'utf-8'),
  PLUGIN_PRO: fs.readFileSync(PLUGIN_ENTRY_TEMPLATE.PLUGIN_PRO, 'utf-8'),
  PLUGIN_SETTING: fs.readFileSync(PLUGIN_ENTRY_TEMPLATE.PLUGIN_SETTING, 'utf-8'),
}
