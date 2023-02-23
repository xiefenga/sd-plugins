import { isLogin, login } from 'sd-dev-login'
import pluginRender from '$$plugin-dev-entry$$'

export const detectLogin = async () => {
  const loginStatus = await isLogin()
  if (!loginStatus) {
    console.log('[sd-plugin-scripts]', 'logining...')
    const account = process.env.SD_ACCOUNT ?? 'admin'
    const password = process.env.SD_PASSWORD ?? 'sdy_23sZG'
    return await login({ account, password }).then(() => true).catch(() => false)
  }
  return loginStatus
}

if (process.env.NEED_LOGIN === 'true') {
  const status = await detectLogin()
  console.log(`[sd-plugin-scripts] login ${status ? 'success' : 'faild'}!!!`)
}

pluginRender()
