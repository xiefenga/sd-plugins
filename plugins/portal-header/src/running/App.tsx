import React from 'react'
import { message } from 'antd'
import { useRequest } from 'ahooks'
import styled from 'styled-components'
import { useTheme } from 'portal-shared'
import { ThemeProvider } from 'styled-components'

import { querySSOCode } from '@/api'
import { PluginConfig } from '@/types'
import { defaultLogo } from '@/utils/assets'
import HeaderTop from './components/HeaderTop'
import GlobalStyle from './components/GlobalStyle'
import HeaderBottom from './components/HeaderBottom'
import { PluginConfigProvider, StoreProvider } from '@/utils/context'

const Header = styled.header`
  padding: 0 60px;
  height: 200px;
  display: flex;
  flex-direction: column;
  min-width: 1000px;
`

interface AppProps {
  pluginConfig: Partial<PluginConfig>
}

const App: React.FC<AppProps> = (props) => {

  const { pluginConfig } = props
  
  const [theme, setTheme] = useTheme(defaultLogo)

  const { 
    data: ssoCode = '', 
  } = useRequest(querySSOCode, { 
    retryCount: 3, 
    onError: (error) => {
      message.error('sso code 请求失败' + error.message)
    },
  })

  return (
    <PluginConfigProvider value={pluginConfig}>
      <StoreProvider value={{ ssoCode, theme, setTheme }}>
        <ThemeProvider theme={theme.color}>
          <GlobalStyle />
          <Header>
            <HeaderTop />
            <HeaderBottom />
          </Header>
        </ThemeProvider>
      </StoreProvider>
    </PluginConfigProvider>
  )
}

export default App