import request from 'sd-plugin-request'
import { UserSearchResp } from '@/types'

export const queryAssetById = (id: string) => {
  return request('asset/data', { method: 'POST', params: { id } })
}

export const searchUser = (key: string) => {
  return request<UserSearchResp[]>(`0x1461a0/userPortrait/search?key=${key}`)
}
