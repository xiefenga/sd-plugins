import pLimit from 'p-limit'
import request from 'sd-plugin-request'

import { QueryAssetsResp, RoleApp, RoleGroup } from '@/types'
import { transformAssetsResp } from '@/utils'

export const queryAllRole = async (subCompany?: string) => {
  const resp = await request.get<RoleGroup[]>('system/role/queryAllRole', {
    params: { subCompany },
  })
  return resp.data
}

export const queryAssetById = async (id: string) => {
  const resp = await request<QueryAssetsResp>('asset/data', { method: 'POST', params: { id } })
  return resp.data
}

export const queryAssetData = async <T>(id: string) => {
  return transformAssetsResp<T>(
    await queryAssetById(id)
  )
}

export const queryAppsByRole = async (role_id: string) => {
  const resp = await request.post<RoleApp[]>('/ext/secondev/roleMenu/queryRoleCustomApps', { role_id })
  return resp.data
}

export const delApp = async (data_id: string) => request.post('ext/secondev/roleMenu/delete', { data_id })

interface UpdateParams {
  data_id: string | null
  role_id: string | null
  datapp_id: string | null
  operation_type: string | null
}

export const updateAppAuth = async (body: UpdateParams) => request.post('ext/secondev/roleMenu/insert', body)

interface AddAppParams {
  role_id: string
  apps: { datapp_id: string, operation_type: string }[]
}

const limit = pLimit(4)

export const addApps = async (data: AddAppParams) => {
  const { role_id, apps } = data
  const singleServiceParamList = apps.map(app => ({ ...app, role_id, data_id: null }))
  await Promise.all(
    singleServiceParamList.map(param => limit(() => updateAppAuth(param)))
  )
}