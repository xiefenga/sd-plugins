import { QueryAssetsResp } from '@/types'

export const transformAssetsResp = <T, >(assetsResp: QueryAssetsResp) => {
  const [columns, assetData] = assetsResp
  return assetData.map(columnData => {
    return columnData.reduce((memo, current, index) => {
      memo[columns[index].col_name] = current
      return memo
    }, {} as Record<string, any>)
  }) as T[]
}