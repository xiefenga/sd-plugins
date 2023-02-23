import { createContext } from 'react'
import { PluginConfig, Store } from './types'

export const ConfigContext = createContext<Partial<PluginConfig>>({})

export const PluginConfigProvider = ConfigContext.Provider

export const StoreContext = createContext<Store>({} as Store) 

export const StoreProvider = StoreContext.Provider

