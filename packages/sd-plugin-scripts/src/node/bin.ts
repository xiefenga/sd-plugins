#!/usr/bin/env node

process.on('unhandledRejection', err => {
  throw err
})

const args = process.argv.slice(2)

const script = args[0]

try {
  require(`./scripts/${script}`)
} catch (error) {
  throw new Error(`no script ${script} in sd-plugin-script`, { cause: error })
}



