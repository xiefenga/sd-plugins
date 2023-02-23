import fs from 'fs-extra'
import webpack from 'webpack'
import { resolve } from 'node:path'
import { randomUUID } from 'node:crypto'

import { ENTRY_TEMPLATE } from '../utils/files'
import configFactory from '../config/webpack.config'
import { WEBPACK_ENTRY_DIR, PLUGIN_SOURCE } from '../config/paths'

if (fs.existsSync(PLUGIN_SOURCE.SETTING_PRO)) {
  process.env.WITH_SETTING = 'true'
}

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
  ENTRY_TEMPLATE.PLUGIN_PRO
    .replace(/\$\$plugin-pro-entry\$\$/, PLUGIN_SOURCE.PLUGIN_PRO)
    .replace(/\$\$plugin-setting-entry\$\$/, PLUGIN_SOURCE.SETTING_PRO)
)

const config = configFactory('production', pluginEntry)

const compiler = webpack(config)

compiler.run((err, _stats) => {
  if (err != null) {
    console.log(err.message)
    process.exit(1)
  }
})
