import request from 'sd-plugin-request'
import { EncryptPassword } from '@/util'
import { AccountParam } from '@/types/params'
import { SDPaginationResult } from '@/types/api/result'
import { 
  AccountResp, 
  BussinessUserResp, 
  IdentityResp, 
  OfficeDelCreateMemberResp, 
  OfficeResp, 
  UserAllResp, 
  UserResp,
  RoleResp,
  CurrentUserResp
} from '@/types/api/account'

type QueryParam = {
  type: 0 | 2
  colName: string
  value: string
}

export type PaganationParam = {
  pageNum: number
  pageSize: number
}

export const queryUserList = async (
  queryParams: QueryParam[] = [],
  paganation: Partial<PaganationParam> = {}
) => {
  const { pageNum = 1, pageSize = 10 } = paganation
  const resp = await request<SDPaginationResult<UserResp>>('/system/account/queryAll', {
    method: 'POST',
    data: {
      pageNum,
      pageSize,
      queryParams,
    },
  })

  return resp.data
}

export const downloadAccountExcel = async () => {
  const resp = await request({
    url: '/system/excelImport/downloadAccountTemp',
    method: 'POST',
    responseType: 'blob',
    data: {},
  })
  return resp.data
}

export const changePassword = async (code: string, password: string) => {
  return await request({
    url: '/system/account/modifyAccountPassword',
    method: 'POST',
    data: {
      code,
      password: EncryptPassword(password),
    },
  })
}

export const queryAccount = async (code: string) => {
  const url = `/system/account/queryAccountByCode?account_code=${code}`
  const res = await request<AccountResp>(url)
  return res.data
}

export const queryUserAll = async () => {
  const res = await request<UserAllResp>('/system/user')
  return res.data
}

export const queryOfficeDelCreateMember = async (id?: string) => {
  const resp = await request(`system/office?createMember=${id}`)
  return resp.data as OfficeDelCreateMemberResp
}

export const handover =async (id: string, code: string | string[]) => {
  await request({
    url: `/system/account/batchDeleteAccount?handover_person=${id}`,
    method: 'POST',
    data: ([] as string[]).concat(code),
  })
}

export const queryIdentity = async (code: string) => {
  const url = `/system/account/queryUserByAccount?account_code=${code}`
  const res = await request<IdentityResp[]>(url)
  return res.data
}

export const createAccount = async (param: AccountParam) => {
  if ('password' in param) {
    param.password = EncryptPassword(param.password)
  }

  await request.post('/system/account/create', param)
}


export const updateLoginFlag = async (
  loginFlag: 0 | 1,  // 0 启用 1 禁用
  sysAccountList: string[]  // code[]
) => {
  await request('/system/account/updateLoginFlag', {
    method: 'POST',
    data: {
      loginFlag,
      sysAccountList,
    },
  })
}

// 获取 office 
export const queryOfficeByOfficeId = async (officeId?: string) => {
  const url = `/system/office/queryCountByOfficeId${officeId
    ? `?OfficeId=${officeId}`
    : ''
  }`
  const resp = await request<OfficeResp[]>(url)
  return resp.data
}

export const queryOfficeByOfficeName = (officeName: unknown) =>
  request.get(`system/office/queryByOfficeName?officeName=${officeName}`)


export const queryUserByName = (userName?: string) =>
  request.get(`system/user/getUserLikeName?userName=${userName}`)

export const queryAllRoleByName = (role_name?: string) =>
  request.get(`system/role/queryAllRoleByName?role_name=${role_name}`)


export const queryUserByOfficeId = (officeId: string) =>
  request.get(
    `/system/office/queryStaff${officeId ? `?OfficeId=${officeId}` : ''}`
  )

export const queryBussinessUsers = async (id: string) => {
  const resp = await request(`/business/queryUsers?assetId=${id}`)
  return resp.data as BussinessUserResp[]
}

export const queryAllRoles = async () => {
  const resp = await request<RoleResp[]>('system/role/queryAllRole')
  return resp.data
}

export const identifyPermission = async (identifyCode: string, menuId?: string) => {
  const resp = await request.get<string[]>(
    `system/user/identifyPermission?identifyCode=${identifyCode}${
      menuId ? '&menuId=' + menuId : ''
    }`
  )
  return resp.data
}

export const authorityUser = async () => {
  const resp = await request.get<CurrentUserResp>('/system/authority/user')
  return resp.data
}

export const getDeployMode = async () => {
  const resp = await request.get<string>('/system/authority/deployMode')
  return resp.data
}