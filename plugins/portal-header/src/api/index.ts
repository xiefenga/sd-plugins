import { User } from '@/types/api'
import request from 'sd-plugin-request'

export const logout = () => {
  return request.get('/system/authority/logout')
}

export const queryUser = async () => {
  const resp = await request.get<User>('system/authority/user')
  return resp.data
}

export const queryNotification = () => {
  return request.post('/sysInfo/queryList', {
    pageSize: 5,
    pageNum: 1,
    orderBy: 'create_time',
    orderSort: 'DESC',
    queryParams: [{ colName: 'info_status', type: 2, value: '1' }],
  })
}

export const querySSOCode = async () => {
  const resp = await request.get<string>('systhirdapp/user/getCode')
  return resp.data
}