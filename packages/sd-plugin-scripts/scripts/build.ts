import fs from 'fs-extra'
import webpack from 'webpack'
import configFactory from '../config/webpack.config'
import { PLUGIN_ENTRY_TEMPLATE_FILE } from '../utils/files'
import { PLUGIN_DEV_INDEX, PLUGIN_INDEX, PLUGIN_NODE_MODULES_STORE, PLUGIN_PRO_INDEX } from '../utils/paths'

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

const config = configFactory('production')

const compiler = webpack(config)

compiler.run((err, _stats) => {
  if (err != null) {
    console.log(err.message)
    process.exit(1)
  }
})
