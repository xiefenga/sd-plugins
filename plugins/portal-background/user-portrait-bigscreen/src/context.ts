import React from 'react'
import { ConfigurationOuput } from './types'

export const ScreenConfigurationContext = React.createContext<ConfigurationOuput>({} as ConfigurationOuput)

export default ScreenConfigurationContext