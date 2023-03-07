import { createContext } from 'react'
import { HeaderConfig as PluginConfig } from 'portal-shared/configuration'

export type ConfigContextValue = Partial<Omit<PluginConfig, 'apiConfig'>> & { apiConfig: PluginConfig['apiConfig'] }

export const ConfigContext = createContext<ConfigContextValue>({} as ConfigContextValue)

export const PluginConfigProvider = ConfigContext.Provider



