#!/usr/bin/env node

const SCRIPT_COMMANDS = ['init', 'start', 'build', 'pack']

process.on('unhandledRejection', err => {
  throw err
})

const args = process.argv.slice(2)

const script = args[0]

if (SCRIPT_COMMANDS.includes(args[0])) {
  require(`../scripts/${script}`)
} else {
  throw new Error(`no script ${script} in sd-plugin-script`)
}


