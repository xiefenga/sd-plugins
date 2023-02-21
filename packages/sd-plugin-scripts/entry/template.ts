import devRender from '$$plugin-dev-entry$$'

import proRender from '$$plugin-pro-entry$$'

import { isLogin, login } from 'sd-dev-login'

const detectLogin = async () => {
  const loginStatus = await isLogin()
  if (!loginStatus) {
    const account = process.env.SD_ACCOUNT ?? 'admin'
    const password = process.env.SD_PASSWORD ?? 'sdy_23sZG'
    return await login({ account, password }).then(() => true).catch(() => false)
  }
  return loginStatus
}

if (process.env.NODE_ENV === 'development') {
  if (process.env.NEED_LOGIN === 'true') {
    detectLogin().then((status) => {
      console.log(`[detectLogin] login ${status ? 'success' : 'faild'}!!!`)
      devRender()
    })
  } else {
    devRender()
  }
} else if (process.env.NODE_ENV === 'production') {
  window.CUSTOM_PLUGIN ??= new Map()
  window.CUSTOM_PLUGIN.set(process.env.PLUGIN_ID!, proRender)
}