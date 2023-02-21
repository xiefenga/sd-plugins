import fs from 'fs-extra'
import webpack from 'webpack'
import WebpackDevServer from 'webpack-dev-server'
import configFactory from '../config/webpack.config'
import getDevServerConfig from '../config/devServer.config'
import { PLUGIN_ENTRY_TEMPLATE_FILE } from '../utils/files'
import { PLUGIN_INDEX, PLUGIN_DEV_INDEX, PLUGIN_PRO_INDEX, PLUGIN_NODE_MODULES_STORE } from '../utils/paths'

process.on('unhandledRejection', err => {
  throw err
})

process.on('exit', () => {
  fs.writeFileSync(PLUGIN_INDEX, PLUGIN_ENTRY_TEMPLATE_FILE)
})

fs.ensureDirSync(PLUGIN_NODE_MODULES_STORE)

fs.writeFileSync(
  PLUGIN_INDEX,
  PLUGIN_ENTRY_TEMPLATE_FILE
    .replace(/\$\$plugin-dev-entry\$\$/, PLUGIN_DEV_INDEX)
    .replace(/\$\$plugin-pro-entry\$\$/, PLUGIN_PRO_INDEX)
)

process.env.NEED_LOGIN = 'true'

const config = configFactory('development')

const compiler = webpack(config)

const devServerConfig = getDevServerConfig()

const devServer = new WebpackDevServer(devServerConfig, compiler)

const runServer = async () => {
  await devServer.start()
}

runServer()



