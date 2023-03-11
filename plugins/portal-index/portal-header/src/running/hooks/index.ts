import { useContext } from 'react'
import { ConfigContext } from '@/utils/context'

export const usePluginConfig = () => {
  return useContext(ConfigContext)
}

