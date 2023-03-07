import React from 'react'
import { message } from 'antd'
import { useState } from 'react'
import { useRequest } from 'ahooks'
import styled from 'styled-components'
import { useStore } from 'portal-shared'
import { ThemeProvider } from 'styled-components'
import { HeaderConfig as PluginConfig } from 'portal-shared/configuration'

import Loading from './components/Loading'
import { defaultLogo } from '@/utils/assets'
import HeaderTop from './components/HeaderTop'
import { querySSOCode, queryUser } from '@/api'
import GlobalStyle from './components/GlobalStyle'
import { addTheme, queryTheme } from '@/api/service'
import HeaderBottom from './components/HeaderBottom'
import { ConfigContextValue, PluginConfigProvider } from '@/utils/context'

const Header = styled.header`
  height: 100%;
  display: flex;
  padding: 0 60px;
  min-width: 1000px;
  flex-direction: column;
`

interface AppProps {
  pluginConfig: Partial<PluginConfig>
}

const App: React.FC<AppProps> = (props) => {

  const { pluginConfig } = props

  const { apiConfig } = pluginConfig

  if (
    !apiConfig ||
    !apiConfig.addKey ||
    !apiConfig.queryKey ||
    !apiConfig.updateKey
  ) {
    message.error('缺少主题API')
    return null
  }

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

  const setTheme = useStore(state => state.changeTheme)

  const setCode = useStore(state => state.setCode)

  const setUser = useStore(state => state.setUser)

  const [loading, setLoading] = useState(true)

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
    async onSuccess(user) {
      setUser(user)
      if (apiConfig.queryKey) {
        const current = await queryTheme(apiConfig.queryKey, user.id)
        if (current !== null) {
          setTheme(current)
        } else {
          await addTheme(apiConfig.addKey, user.id, theme)
        }
        setLoading(false)
      }
    },
  })

  const renderHeader = () => {
    if (loading) {
      return (
        <Loading tip='主题加载中' />
      )
    }
    return (
      <Header>
        <HeaderTop />
        <HeaderBottom />
      </Header>
    )
  }

  return (
    <PluginConfigProvider value={pluginConfig as ConfigContextValue}>
      <ThemeProvider theme={theme.color}>
        <GlobalStyle />
        {renderHeader()}
      </ThemeProvider>
    </PluginConfigProvider>
  )
}

export default App