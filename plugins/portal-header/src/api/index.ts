import request from 'sd-plugin-request'

export const logout = () => {
  return request.get('/system/authority/logout')
}

export const queryUser = () => {
  return request.get('system/authority/user')
}

export const queryNotification = () =>  {
  return request.post('/sysInfo/queryList', {
    pageSize: 5,
    pageNum: 1,
    orderBy: 'create_time',
    orderSort: 'DESC',
    queryParams: [{ colName: 'info_status', type: 2, value: '1' }],
  })
}

export const querySSOCode = () => {
  return request.get('systhirdapp/user/getCode')
}