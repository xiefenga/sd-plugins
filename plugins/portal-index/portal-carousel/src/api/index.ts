import request from 'sd-plugin-request'

export const queryAssetById = (id: string) => {
  return request.post(`/asset/getAssetData?asset_id=${id}`, [])
}

export const queryFAssetById = async (id: string, tokenType = []) => {
  const { data } = await request.post(`/form/getAssetData?asset_id=${id}`, tokenType)
  return data
}