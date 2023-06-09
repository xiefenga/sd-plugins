import React from 'react'
import { message } from 'antd'
import { useState } from 'react'
import styled from 'styled-components'
import { useStore } from 'portal-shared'
import { useMount, useRequest } from 'ahooks'
import { DEFAULT_THEME } from 'portal-shared'
import { ThemeProvider } from 'styled-components'
import { HeaderConfig as PluginConfig } from 'portal-shared/configuration'

import Loading from './components/Loading'
import { logoutSystem } from '@/utils/helper'
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

  const { apiConfig, defaultLogo = '', themes } = pluginConfig

  if (!defaultLogo) {
    message.error('缺少默认Logo')
  }

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
    if (state.theme.name === '默认主题') {
      return { ...DEFAULT_THEME, logo: defaultLogo }
    } else {
      return state.theme
    }
  })

  const setTheme = useStore(state => state.changeTheme)

  const setCode = useStore(state => state.setCode)

  const setUser = useStore(state => state.setUser)

  const [loading, setLoading] = useState(true)
  
  useMount(() => {
    const flag = new URLSearchParams(window.location.search).get('sign_out')
    if (flag) {
      logoutSystem()
    }
  })
  
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
      try {
        if (apiConfig.queryKey) {
          const saved = await queryTheme(apiConfig.queryKey, user.id)
          if (saved !== null) {
            const current = themes?.find(item => item.id === saved.id)
            if (saved.id !== theme.id && current) {
              setTheme(current)
            }  else if (saved.id !== theme.id) {
              await addTheme(apiConfig.addKey, user.id, theme.id)
            }
          } else {
            await addTheme(apiConfig.addKey, user.id, theme.id)
          }
        }
      } catch (_) {
        message.error('当前主题数据请求失败，使用默认主题')
      } finally {
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