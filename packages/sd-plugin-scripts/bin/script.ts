#!/usr/bin/env node

import { SCRIPT_COMMANDS } from '../utils/constants'

process.on('unhandledRejection', err => {
  throw err
})

const args = process.argv.slice(2)

const script = args[0]

if (SCRIPT_COMMANDS.includes(args[0])) {
  require(`../scripts/${script}`)
} else {
  console.log(`no script ${script} in sd-plugin-script`)
}


