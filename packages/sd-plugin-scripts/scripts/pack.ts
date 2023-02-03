import glob from 'glob'
import fse from 'fs-extra'
import AdmZip from 'adm-zip'
import path from 'node:path'
import { statSync } from 'node:fs'
import { formatBytes } from '../utils/fmt'
import { DIST_PATH, PLUGIN_CONFIG_PATH, PLUGIN_PATH, PLUGIN_TEMP_PATH } from '../utils/paths'

// 清空目录
glob.sync(path.join(PLUGIN_TEMP_PATH, '*')).forEach(file => {
  fse.removeSync(file)
  console.log('removed:', file)
})

// copy
glob.sync(path.join(DIST_PATH, '*')).forEach(file => {
  const fileName = path.basename(file)
  if (!['index.html', 'favicon.ico'].includes(fileName)) {
    fse.copySync(file, path.join(PLUGIN_TEMP_PATH, fileName))
    console.log('copyd:', file)
  }
})

const entry = path.basename(
  glob.sync(path.resolve(PLUGIN_TEMP_PATH, 'js/*.js'))[0]
)

// 设置入口文件
const configJson = require(PLUGIN_CONFIG_PATH)

configJson.main = entry

fse.writeFileSync(
  path.resolve(PLUGIN_TEMP_PATH, 'config.json'),
  JSON.stringify(configJson, null, 2),
  'utf8'
)

console.log('config.json 修改完成')

console.log('开始打包...')

const zip = new AdmZip()

zip.addLocalFolder(PLUGIN_TEMP_PATH)

const pluginName = `plugin-${new Date().getTime()}.zip`

const pluginPath = path.resolve(PLUGIN_PATH, pluginName)

zip.writeZip(pluginPath)

console.log('打包完成...', pluginName, formatBytes(statSync(pluginPath).size))


