import request from 'sd-plugin-request'
import { MenuGroupResp, CommonlyUsedAppResp } from '@/types'

export const getCommonlyUsedApp = async () => {
  const resp = await request<CommonlyUsedAppResp>('/28s/datapp/queryUseMenusByUserId')
  return resp.data.dataList
}

export const getMenuGroup = async () => {
  const resp = await request<MenuGroupResp[]>('/28s/datapp/queryMenuGroup')
  return resp.data
}