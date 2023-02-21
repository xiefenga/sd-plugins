import glob from 'glob'
import fse from 'fs-extra'
import AdmZip from 'adm-zip'
import path from 'node:path'
import { PLUGIN_CONFIG_JSON } from '../utils/files'
import { DIST_PATH, PLUGIN_CONFIG_TEMP_PATH, PLUGIN_PATH, PLUGIN_TEMP_PATH } from '../utils/paths'

// 清空目录
fse.removeSync(PLUGIN_TEMP_PATH)

// 复制
fse.copySync(DIST_PATH, PLUGIN_TEMP_PATH)

// 入口文件名
const main = path.basename(
  glob.sync(path.resolve(PLUGIN_TEMP_PATH, 'js/*.js'))[0]
)

// 设置入口文件
const configJson = Object.assign(PLUGIN_CONFIG_JSON, { main })

// 写入 config.json 
fse.writeJsonSync(PLUGIN_CONFIG_TEMP_PATH, configJson)

const zip = new AdmZip()

zip.addLocalFolder(PLUGIN_TEMP_PATH)

const pluginName = `plugin-${new Date().getTime()}.zip`

const pluginPath = path.resolve(PLUGIN_PATH, pluginName)

zip.writeZip(pluginPath)

console.log(pluginName)



