import { CarouselBlock } from '@/types'

type AssetsResponse = [
  any[],
  (string | number)[][]
]

export const transformAssetsResp = (assetsRes: AssetsResponse) => {
  const headerData = assetsRes[0]
  const bodyData = assetsRes[1]
  return bodyData.map((x) => {
    return x.reduce((memo, item, index) => {
      memo[headerData[index].col_name] = item
      return memo
    }, {} as Record<string, any>) as CarouselBlock
  })
}