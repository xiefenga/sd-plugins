import fs from 'fs-extra'
import { 
  PLUGIN_CONFIG_PATH, 
  PLUGIN_PACKAGE_PATH, 
  PLUGIN_INDEX_TEMPLATE 
} from './paths'

export const PKG = fs.readJSONSync(PLUGIN_PACKAGE_PATH)

export const PLUGIN_CONFIG_JSON = fs.readJSONSync(PLUGIN_CONFIG_PATH)

export const PLUGIN_ENTRY_TEMPLATE_FILE = fs.readFileSync(PLUGIN_INDEX_TEMPLATE, 'utf-8')
