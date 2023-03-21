import to from 'await-to-js'
import { isLogin, login } from '@/api/login'

const account = process.env.SD_ACCOUNT

const password = process.env.SD_PASSWORD

if (!account || !password) {
  throw new Error('The SD_ACCOUNT and SD_PASSWORD environment variable are required but was not specified.')
}

export const detectLogin = async () => {
  const [err, loginStatus] = await to(isLogin())
  if (err) {
    console.log('[detectLogin]', '检测登录状态失败')
    throw err
  } 
  if (!loginStatus) {
    const err = await to(login({ account, password }))
    if (err) {
      console.log('[detectLogin]', '登录失败')
      throw err
    }
  }
  console.log('[detectLogin]', '登录成功')
}