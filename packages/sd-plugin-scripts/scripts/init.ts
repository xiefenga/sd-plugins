import fs from 'node:fs'
import { v4 as  uuidv4 } from 'uuid'
import { PLUGIN_JSON } from '../utils/constants'
import { PLUGIN_CONFIG_PATH } from '../utils/paths'

PLUGIN_JSON.id = uuidv4()

fs.writeFileSync(
  PLUGIN_CONFIG_PATH,
  JSON.stringify(PLUGIN_JSON, null, 2),
  'utf8'
)
