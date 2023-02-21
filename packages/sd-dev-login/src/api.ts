import request from 'sd-plugin-request'
import { encryptPassword } from './encrypt'
import { Account, LoginParam } from './types'

export const login = async (account: Account) => {
  const params: LoginParam = {
    account: account.account,
    username: account.account,
    password: encryptPassword(account.password),
  }
  const resp = await request.post('/system/authority/loginAccount4Application', params)
  return resp.data
}

export const isLogin = async (): Promise<boolean> => {
  const { data } = await request.get('/system/authority/isLogin')
  return data
}