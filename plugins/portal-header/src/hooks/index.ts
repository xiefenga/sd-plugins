import { useContext } from 'react'
import { ConfigContext, StoreContext } from '@/context'

export const usePluginConfig = () => {
  return useContext(ConfigContext)
}

export const useStore = () => {
  return useContext(StoreContext)
}