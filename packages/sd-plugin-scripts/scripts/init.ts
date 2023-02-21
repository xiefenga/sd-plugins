import fs from 'fs-extra'
import { v4 as uuidv4 } from 'uuid'
import { PLUGIN_CONFIG_JSON } from '../utils/files'
import { PLUGIN_CONFIG_PATH } from '../utils/paths'

const id = uuidv4()

console.log(id)

const configJson = Object.assign(PLUGIN_CONFIG_JSON, { id })

fs.writeJSONSync(PLUGIN_CONFIG_PATH, configJson, { spaces: 2 })

