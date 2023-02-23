import fs from 'fs-extra'
import webpack from 'webpack'
import { resolve } from 'node:path'
import { randomUUID } from 'node:crypto'
import WebpackDevServer from 'webpack-dev-server'

import { ENTRY_TEMPLATE } from '../utils/files'
import configFactory from '../config/webpack.config'
import getDevServerConfig from '../config/devServer.config'
import { WEBPACK_ENTRY_DIR, PLUGIN_SOURCE } from '../config/paths'


// todo:
// 1. 端口检测
// 2. 检测.env自动重启

process.on('unhandledRejection', err => {
  throw err
})

process.on('exit', () => {
  fs.removeSync(pluginEntry)
})

fs.ensureDirSync(WEBPACK_ENTRY_DIR)

const pluginEntry = resolve(WEBPACK_ENTRY_DIR, `entry-${randomUUID()}.js`)

fs.writeFileSync(
  pluginEntry,
  ENTRY_TEMPLATE.PLUGIN_DEV
    .replace(/\$\$plugin-dev-entry\$\$/, PLUGIN_SOURCE.PLUGIN_DEV)
)

const config = configFactory('development', pluginEntry)

const compiler = webpack(config)

const devServerConfig = getDevServerConfig()

const devServer = new WebpackDevServer(devServerConfig, compiler)

const runServer = async () => {
  await devServer.start()
}

runServer()



