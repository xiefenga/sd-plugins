import render from '$$plugin-pro-entry$$'

window.CUSTOM_PLUGIN ??= new Map()

window.CUSTOM_PLUGIN.set(process.env.PLUGIN_ID!, render)
