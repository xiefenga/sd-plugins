import React from 'react'
import { useState } from 'react'
import styled from 'styled-components'
import { css } from 'styled-components'

const Div = styled.div`
  font-size: 14px;
  display: flex;
  height: 100%;
`

const Left = styled.div`
  text-align: right;
  margin-right: 10px;
  flex: 0 0 auto;
`

const Tiltle = styled.div`
  font-size: 32px;
  font-weight: 700;
`

const Container = styled.div`
  border: 2px solid ${props => props.theme.border.color};
  flex: 1;
`

interface TabNavsProps {
  index: number
}

const TabNavs = styled.div<TabNavsProps>`
  position: relative;
  
  &::after  {
    box-sizing: content-box;
    content: '';
    position: absolute;
    right: -12px;
    transition: top .3s ease;
    top: ${props => props.index * 56 + 4}px;
    width: 6px;
    height: 32px;
    background-color: ${props => props.theme.bg.active};
    border-top: 8px solid #fff;
    border-bottom: 8px solid #fff;
  }
`

interface TabProps {
  active: boolean
}

const Tab = styled.div<TabProps>`
  box-sizing: content-box;
  width: 28px;
  height: 36px;
  font-size: 14px;
  padding: 10px;
  cursor: pointer;
  overflow: hidden;
  user-select: none;
  margin-left: auto;
  color: ${props => props.theme.font.default};
  transition: color .3s ease;
  
  ${props => props.active && css`
    color: ${props => props.theme.bg.active};
  `}
  
  &:hover {
    color: ${props => props.theme.font.hover};
  }
`

interface TabItem {
  key: string
  label: string
}

interface PortalTabProps {
  items: TabItem[]
  onTabClick?: (key: string, event: React.MouseEvent) => void
}

const PortalTab: React.FC<PortalTabProps> = (props) => {

  const { items, onTabClick } = props

  const [activeIndex, setActiveIndex] = useState(0)

  const renderTabItems = () => {
    return items.map((item, index) => {

      const active = index === activeIndex

      const onClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        setActiveIndex(index)
        onTabClick?.(item.key, event)
      }

      return (
        <Tab key={item.key} active={active} onClick={onClick}>
          {item.label}
        </Tab>
      )
    })
  }

  return (
    <Div>
      <Left>
        <Tiltle>报表</Tiltle>
        <TabNavs index={activeIndex}>
          {renderTabItems()}
        </TabNavs>
      </Left>
      <Container />
    </Div>
  )
}

export default PortalTab