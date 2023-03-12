import { useContext } from 'react'
import { useRequest } from 'ahooks'

import { IS_DEV } from '@/utils/constants'
import { queryAssetById } from '@/api/assets'
import { enablePollingInterval } from '@/config'
import { ConfigurationMapValues } from '@/types'
import { ScreenConfigurationContext } from '@/context'

export const useRequestAssets = (key: ConfigurationMapValues) => {

  const context = useContext(ScreenConfigurationContext)

  const pollingInterval = (!IS_DEV || enablePollingInterval) 
    ? Number(context.pollingInterval) 
    : 0

  const assetId = context[key]

  const queryAssetsData = async (): Promise<[{ col_name: string }[], string[][]]> => {
    return (await queryAssetById(assetId)).data
  }

  return useRequest(queryAssetsData, { pollingInterval })
}