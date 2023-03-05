import React from 'react'
import { useRequest } from 'ahooks'
import { useStore } from 'portal-shared'
import { ThemeProvider } from 'styled-components'
import { useState, useRef, useEffect } from 'react'
import { AccordionConfig as PluginConfig } from 'portal-shared'

import { getCommonlyUsedApp } from '@/api'
import CollapsePanel from './components/CollapsePanel'
import PictureCollapse from './components/PictureCollapse'

interface AppProps {
  pluginConfig: Partial<PluginConfig>
}

const App: React.FC<AppProps> = (props) => {

  const {
    pluginConfig: {
      otherHeight = 360,
      moreLink = '',
      menuConfigList = [],
    },
  } = props

  const theme = useStore(state => state.theme)

  const divRef = useRef<HTMLDivElement>(null)

  const [state, setState] = useState({
    width: 642,
    collapseWidth: 145,
  })

  useEffect(() => {
    if (divRef.current && menuConfigList.length) {
      const x = divRef.current.clientWidth
      console.log(x)
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
  }, [menuConfigList.length])

  const { data } = useRequest(async () => {
    const apps = await getCommonlyUsedApp()
    return menuConfigList.map(menu => {
      const buttons = apps
        .filter(app => app.menuType === menu.type)
        .map(app => ({ text: app.name, link: app.url }))
      return {
        ...menu,
        buttons,
      }
    })
  })



  return (
    <ThemeProvider theme={theme.color}>
      <div ref={divRef}>
        <PictureCollapse
          moreLink={moreLink}
          width={state.width}
          otherHeight={otherHeight}
          collapseWidth={state.collapseWidth}
          panelProps={data ?? []}
          renderPanelContent={props => {
            return (
              <CollapsePanel {...props} />
            )
          }}
        />
      </div>
    </ThemeProvider>
  )
}

export default App

