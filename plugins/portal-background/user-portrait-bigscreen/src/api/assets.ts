import request from 'sd-plugin-request'

export const queryAssetById = (id: string) => {
  return request('asset/data', { method: 'POST', params: { id } })
}
