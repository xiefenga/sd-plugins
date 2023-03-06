import React from 'react'
import { message } from 'antd'
import { useRequest } from 'ahooks'
import styled from 'styled-components'
import { useStore } from 'portal-shared'
import { ThemeProvider } from 'styled-components'
import { HeaderConfig as PluginConfig } from 'portal-shared'

import { defaultLogo } from '@/utils/assets'
import HeaderTop from './components/HeaderTop'
import { querySSOCode, queryUser } from '@/api'
import GlobalStyle from './components/GlobalStyle'
import HeaderBottom from './components/HeaderBottom'
import { PluginConfigProvider } from '@/utils/context'

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

  const theme = useStore(state => {
    if (state.theme.logo === '') {
      return {
        ...state.theme,
        logo: defaultLogo,
      }
    } else {
      return state.theme
    }
  })


  const setCode = useStore(state => state.setCode)

  const setUser = useStore(state => state.setUser)

  const { pluginConfig } = props
  
  useRequest(querySSOCode, { 
    retryCount: 3, 
    onError: (error) => {
      message.error('sso code 请求失败' + error.message)
    },
    onSuccess: ssoCode => {
      setCode(ssoCode)
    },
  })

  useRequest(queryUser, {
    retryCount: 3,
    onError(error) {
      message.error('请求用户数据失败' + error.message)
    },
    onSuccess(user) {
      setUser(user)
    },
  })


  return (
    <PluginConfigProvider value={pluginConfig}>
      <ThemeProvider theme={theme.color}>
        <GlobalStyle />
        <Header>
          <HeaderTop />
          <HeaderBottom />
        </Header>
      </ThemeProvider>
    </PluginConfigProvider>
  )
}

export default App