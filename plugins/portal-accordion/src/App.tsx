import React from 'react'
import { useCurrentTheme } from 'portal-shared'
import { ThemeProvider } from 'styled-components'
import { useState, useRef, useEffect } from 'react'

import { panelList } from './utils/config'
import CollapsePanel from './components/CollapsePanel'
import PictureCollapse from './components/PictureCollapse'

const App: React.FC = () => {

  const panelProps = panelList

  const theme = useCurrentTheme()

  const divRef = useRef<HTMLDivElement>(null)

  const [state, setState] = useState({
    width: 642,
    collapseWidth: 145,
  })

  useEffect(() => {
    if (divRef.current) {
      const x = divRef.current.clientWidth
      console.log(x)
      setState(prev => {
        const { width, collapseWidth } = prev
        const left = x - width - collapseWidth * (panelList.length - 1)
        const offset = left / panelList.length
        const next = {
          width: width + offset,
          collapseWidth: collapseWidth + offset,
        }
        return next
      })

    }
  }, [])


  return (
    <ThemeProvider theme={theme.color}>
      <div ref={divRef}>
        <PictureCollapse
          width={state.width}
          height={360}
          collapseWidth={state.collapseWidth}
          panelProps={panelProps}
          renderPanelContent={props => {
            const {
              background: {
                expand: background,
                collapse: preview,
              },
              collapse,
              collapseWidth,
              description,
              buttons,
            } = props
            return (
              <CollapsePanel
                buttons={buttons}
                preview={preview}
                collapse={collapse}
                background={background}
                description={description}
                collapseWidth={collapseWidth}
              />
            )
          }}
        />
      </div>
    </ThemeProvider>
  )
}

export default App

