import { createContext, useContext } from 'react'
import { PluginConfig } from './types'

export const PluginConfigContext = createContext({} as PluginConfig)

export const PluginConfigProvider = PluginConfigContext.Provider

export const usePluginConfig = () => useContext(PluginConfigContext)

