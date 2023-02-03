import fs from 'node:fs'
import webpack from 'webpack'
import WebpackDevServer from 'webpack-dev-server'
import configFactory from '../config/webpack.config'
import devServerConfig from '../config/devServer.config'
import { PLUGIN_ENTRY_TEMPLATE } from '../utils/constants'
import { PLUGIN_INDEX, PLUGIN_DEV_INDEX, PLUGIN_PRO_INDEX, PLUGIN_NODE_MODULES_STORE } from '../utils/paths'

process.on('unhandledRejection', err => {
  throw err
})

process.on('exit', () => {
  fs.writeFileSync(PLUGIN_INDEX, PLUGIN_ENTRY_TEMPLATE)
})

fs.mkdirSync(PLUGIN_NODE_MODULES_STORE)

fs.writeFileSync(
  PLUGIN_INDEX,
  PLUGIN_ENTRY_TEMPLATE
    .replace(/\$\$plugin-dev-entry\$\$/, PLUGIN_DEV_INDEX)
    .replace(/\$\$plugin-pro-entry\$\$/, PLUGIN_PRO_INDEX)
)

const config = configFactory('development')

const compiler = webpack(config)

const devServer = new WebpackDevServer(devServerConfig, compiler)

const runServer = async () => {
  await devServer.start()
}

runServer()



