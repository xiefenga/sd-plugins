import fs from 'fs-extra'
import webpack from 'webpack'
import { resolve } from 'node:path'
import { randomUUID } from 'node:crypto'

import { ENTRY_TEMPLATE } from '../utils/files'
import configFactory from '../config/webpack.config'
import { WEBPACK_ENTRY_DIR, PLUGIN_SOURCE } from '../config/paths'

const withConfig = fs.existsSync(PLUGIN_SOURCE.SETTING_PRO)

if (withConfig) {
  process.env.WITH_CONFIG = 'true'
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
  (
    withConfig
      ? ENTRY_TEMPLATE.PRO.WITH_CONFIG
      : ENTRY_TEMPLATE.PRO.ONLY_PLUGIN
  )
    .replace(/\$\$plugin-pro-entry\$\$/, PLUGIN_SOURCE.PLUGIN_PRO.replaceAll('\\', '\\\\'))
    .replace(/\$\$plugin-config-entry\$\$/, PLUGIN_SOURCE.SETTING_PRO.replaceAll('\\', '\\\\'))
)

const config = configFactory('production', pluginEntry)

const compiler = webpack(config)

compiler.run((err, stats) => {
  if (stats?.hasErrors()) {
    console.log(stats.toJson())
  }
  if (err != null) {
    console.log(err.message)
    process.exit(1)
  }
})
