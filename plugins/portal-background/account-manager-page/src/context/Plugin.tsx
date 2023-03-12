import React from 'react'

export interface PluginContextValue {
  assetId: string
}

const PluginContext = React.createContext<PluginContextValue>({
  assetId: '',
})

export default PluginContext