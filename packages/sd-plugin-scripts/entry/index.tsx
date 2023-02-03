import devRender from '$$plugin-dev-entry$$'

import proRender from '$$plugin-pro-entry$$'

if (process.env.NODE_ENV === 'development') {
  devRender()
} else if (process.env.NODE_ENV === 'production') {
  window.CUSTOM_PLUGIN ??= new Map()
  window.CUSTOM_PLUGIN.set(process.env.PLUGIN_ID!, proRender)
}