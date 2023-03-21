import request from './request'
import { encryptPassword } from '@/util'
import { Account, LoginParam } from '@/types/api/account'

export const login = (account: Account) => {
  const params: LoginParam = {
    account: account.account,
    username: account.account,
    password: encryptPassword(account.password),
  }
  return request.post('/system/authority/loginAccount4Application', params)
}

export const isLogin = async (): Promise<boolean> => {
  const { data } = await request.get('/system/authority/isLogin')
  return data
}