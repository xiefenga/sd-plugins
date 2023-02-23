import React from 'react'
import styled from 'styled-components'
import { useState, useEffect } from 'react'
import { useLocalStorageState } from 'ahooks'
import { ThemeProvider } from 'styled-components'

import { querySSOCode } from './api'
import { PluginConfig } from './types'
import HeaderTop from './components/HeaderTop'
import GlobalStyle from './components/GlobalStyle'
import HeaderBottom from './components/HeaderBottom'
import { DEFAULT_THEME_KEY, DEFAULT_THEME } from './constants'
import { PluginConfigProvider, StoreProvider } from './context'

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

  const [theme, setTheme] = useLocalStorageState(DEFAULT_THEME_KEY, { defaultValue: DEFAULT_THEME })

  const [ssoCode, setSSOCode] = useState('')

  useEffect(() => {
    querySSOCode()
      .then(res => res.data)
      .then(code => setSSOCode(code))
      .catch()
  }, [])

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