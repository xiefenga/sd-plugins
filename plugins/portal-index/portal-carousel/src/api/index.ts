import request from 'sd-plugin-request'
import { FormAssetsResponse, NewsChartResp } from '@/types'

export const queryAssetById = (id: string) => {
  return request.post(`/asset/getAssetData?asset_id=${id}`, [])
}

export const queryFAssetById = async (id: string, tokenType = []) => {
  const { data } = await request.post<FormAssetsResponse>(`/form/getAssetData?asset_id=${id}`, tokenType)
  return data
}

export const queryNewsChartData = async (asset_id: string, count: number) => {
  const { data } = await request.get<NewsChartResp[]>('/news/getNewsChart', {
    params: {
      count,
      asset_id,
    },
  })
  return data
}