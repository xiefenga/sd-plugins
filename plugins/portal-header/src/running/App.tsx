import React from 'react'
import styled from 'styled-components'
import { ThemeProvider } from 'styled-components'
import { useLocalStorageState, useRequest } from 'ahooks'

import { querySSOCode } from '@/api'
import { PluginConfig } from '@/types'
import HeaderTop from './components/HeaderTop'
import GlobalStyle from './components/GlobalStyle'
import HeaderBottom from './components/HeaderBottom'
import { DEFAULT_THEME, STORAGE_KEY } from '@/utils/constants'
import { PluginConfigProvider, StoreProvider } from '@/utils/context'
import { message } from 'antd'

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

  const [
    theme,
    setTheme,
  ] = useLocalStorageState(
    STORAGE_KEY.DEFAULT_THEME,
    { defaultValue: DEFAULT_THEME }
  )

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