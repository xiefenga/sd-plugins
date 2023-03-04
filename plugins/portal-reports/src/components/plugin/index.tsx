import { useState, useEffect, useRef } from 'react'
import PortalTab from '../Tab'
import { ThemeProvider } from 'styled-components'
import { useCurrentTheme } from 'portal-shared'

declare global {
  interface Window {
    pluginTimer: any
  }
}

const TEXT = [
  '军事训练',
  '军事教育',
  '军事管理',
]

const Plugin = (props: any) => {

  const theme = useCurrentTheme()

  const [id, setId] = useState(props.block.baseConfig.id)

  const [itemNames, setItemNames] = useState([
    '军事训练',
    '军事教育',
    '军事管理',
  ])

  const [currentIndex, setCurrentIndex] = useState(0)

  const [activeKey, setActiveKey] = useState('')

  const [themeList, setThemeList] = useState([])
  const [themeIndex, setThemeIndex] = useState(0)

  const initFormRef = useRef<number>(themeIndex)

  useEffect(() => {
    initFormRef.current = themeIndex
    handleTabChange(itemNames[0])
  }, [themeIndex])


  const handleTabChange = (key: string) => {
    const {
      block: {
        dataConfig: {
          pluginOptions = {},
        },
      },
    } = props

    const tempIndex = getTargetIndex(key, itemNames)!

    setActiveKey(key)

    const flag = tempIndex >= itemNames.length
    if (flag) {
      setActiveKey(itemNames[0])
    } else {
      setActiveKey(itemNames[tempIndex])
    }
    setContainerContent(flag, tempIndex)
    setCurrentIndex(flag ? 1 : tempIndex + 1)
  }

  const getTargetIndex = (target: string, data: string[]) => {
    for (let i = 0; i < data.length; i++) {
      if (data[i] === target) {
        return i
      }
    }
  }

  //定时器设置容器内容
  const setContainerContent = (flag = false, nIndex?: number) => {
    const {
      bigscreen: { updateBlockById },
      block: {
        dataConfig: { pluginOptions = {} },
      },
    } = props
    if (pluginOptions?.dispositionList[initFormRef.current]?.containerId) {
      updateBlockById(pluginOptions.dispositionList[initFormRef.current]?.containerId, {
        dataConfig: {
          configs: [
            {
              name: '网页',
              type: 0,
              value: pluginOptions.dispositionList[initFormRef.current]?.[`tabLink${flag ? 1 : (nIndex ?? currentIndex) + 1}`],
            },
          ],
          defaultValue: null,
          defaultType: 3,
        },
      })
    }
  }

  return (
    <ThemeProvider theme={theme.color}>
      <PortalTab
        onTabClick={handleTabChange}
        items={TEXT.map((text) => ({ label: text, key: text }))}
      />
    </ThemeProvider>
  )
}

export default Plugin