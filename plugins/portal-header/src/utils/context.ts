import { createContext } from 'react'
import { HeaderConfig as PluginConfig} from 'portal-shared'

export const ConfigContext = createContext<Partial<PluginConfig>>({})

export const PluginConfigProvider = ConfigContext.Provider



