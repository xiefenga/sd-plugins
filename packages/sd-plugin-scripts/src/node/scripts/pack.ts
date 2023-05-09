import dayjs from 'dayjs'
import fse from 'fs-extra'
import AdmZip from 'adm-zip'
import path from 'node:path'
import { formatBytes } from '../utils/fmt'
import { PLUGIN_CONFIG_JSON } from '../utils/files'
import { DIST_PATH, PLUGIN_CONFIG_TEMP_PATH, PLUGIN_PATH, PLUGIN_TEMP_PATH } from '../config/paths'

const moment = dayjs()

// 清空目录
fse.removeSync(PLUGIN_TEMP_PATH)

// 复制
fse.copySync(DIST_PATH, PLUGIN_TEMP_PATH)

const files = fse.readdirSync(path.resolve(PLUGIN_TEMP_PATH, 'js'))

const mathedEntry = files.filter(file => /^main\..+\.js$/.test(file))

if (mathedEntry.length === 0) {
  throw new Error('请先打包......')
}

// 入口文件名
const main = mathedEntry[0]

// 设置入口文件
const configJson = Object.assign(PLUGIN_CONFIG_JSON, { main })

// 写入 config.json 
fse.writeJsonSync(PLUGIN_CONFIG_TEMP_PATH, configJson)

const zip = new AdmZip()

zip.addLocalFolder(PLUGIN_TEMP_PATH)

const pluginName = configJson.name ?? ''

const filename = `${pluginName}@${moment.format('YYYY-MM-DD HH:mm:ss')}.zip`

const pluginPath = path.resolve(PLUGIN_PATH, filename)

zip.writeZip(pluginPath)

const pluginSize = fse.statSync(pluginPath).size

console.log('插件构建完成🎉🎉🎉')

console.log(`
插件名: ${filename}
构建时间: ${moment.format('YYYY-MM-DD HH:mm:ss')}
大小: ${formatBytes(pluginSize)}
`)



