import React from 'react'
import { useStore } from 'portal-shared'
import { useRequest, useSize } from 'ahooks'
import { ThemeProvider } from 'styled-components'
import { useState, useRef, useEffect } from 'react'
import { AccordionConfig as PluginConfig } from 'portal-shared/configuration'

import { getCommonlyUsedApp } from '@/api'
import CollapsePanel from './components/CollapsePanel'
import PictureCollapse from './components/PictureCollapse'

interface AppProps {
  pluginConfig: Partial<PluginConfig>
}

const App: React.FC<AppProps> = (props) => {

  const {
    pluginConfig: {
      moreLink = '',
      otherHeight = 360,
      menuConfigList = [],
    },
  } = props

  const ssoCode = useStore(state => state.code)

  const theme = useStore(state => state.theme)

  const divRef = useRef<HTMLDivElement>(null)

  const [state, setState] = useState({
    width: 642,
    collapseWidth: 145,
  })

  const size = useSize(divRef)

  useEffect(() => {
    if (size && menuConfigList.length) {
      const x = size.width
      setState(prev => {
        const { width, collapseWidth } = prev
        const left = x - width - collapseWidth * (menuConfigList.length - 1)
        const offset = left / menuConfigList.length
        const next = {
          width: width + offset,
          collapseWidth: collapseWidth + offset,
        }
        return next
      })
    }
  }, [size, menuConfigList.length])

  const { data: panelProps = [] } = useRequest(async () => {
    const apps = await getCommonlyUsedApp()
    return menuConfigList.map(menu => {
      const buttons = apps
        .filter(app => app.menuType === menu.type)
        .map(app => {
          if (app.isSSOCode === '1') {
            const url = new URL(app.url, location.origin)
            url.searchParams.append('code', ssoCode)
            app.url = url.toString()
          }
          return ({ text: app.name, link: app.url })
        })
      return { 
        ...menu, 
        buttons,
        onBackgroundClick: () => {
          if (menu.url) {
            const target = new URL(menu.url, location.origin)
            target.searchParams.append('code', ssoCode)
            window.open(target.toString())
          }
        },
      }
    })
  })

  return (
    <ThemeProvider theme={theme.color}>
      <div ref={divRef}>
        <PictureCollapse
          width={state.width}
          moreLink={moreLink}
          panelProps={panelProps}
          otherHeight={otherHeight}
          collapseWidth={state.collapseWidth}
          renderPanelContent={props => (<CollapsePanel {...props} />)}
        />
      </div>
    </ThemeProvider>
  )
}

export default App

