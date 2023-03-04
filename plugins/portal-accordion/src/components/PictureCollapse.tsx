import styled from 'styled-components'
import { useState, type ReactNode } from 'react'

interface CollapseContainerProps {
  width: number
  otherHeight: number
}

const CollapseContainer = styled.div<CollapseContainerProps>`
  position: relative;
  overflow: hidden;
  width: ${props => props.width}px;
  height: calc(100vh - ${props => props.otherHeight}px);
`

interface CollapsePanelProps {
  left: number
  width: number
  // height: number
  z: number
  pointer: boolean
}

const CollapsePanel = styled.div<CollapsePanelProps>`
  position: absolute;
  top: 0;
  cursor: ${props => props.pointer ? 'pointer': 'default'};
  z-index: ${props => props.z};
  left: ${props => props.left}px;
  width: ${props => props.width}px;
  height: 100%;
  transition: left .3s ease-in-out;
`
/* height: ${props => props.height}px; */


interface PictureCollapseProps<T> {
  width: number
  otherHeight: number
  collapseWidth: number
  panelProps: T[]
  moreLink: string
  renderPanelContent: (props: T & { collapseWidth: number, collapse: boolean }) => ReactNode
}

const PictureCollapse = <T, >(props: PictureCollapseProps<T>) => {

  const {
    width,
    otherHeight,
    collapseWidth,
    panelProps,
    moreLink,
    renderPanelContent,
  } = props

  const [expandIndex, setExpandIndex] = useState(0)

  const renderPanel = () => {
    return panelProps.map((props, index) => {

      const panelLeft = index <= expandIndex
        ? index * collapseWidth
        : index * collapseWidth + (width - collapseWidth)

      return (
        <CollapsePanel
          z={index}
          key={index}
          width={width}
          // height={height}
          left={panelLeft}
          pointer={index === panelProps.length - 1}
          onClick={() => {
            if (index === panelProps.length - 1) {
              window.open(moreLink)
            }
          }}
          onMouseEnter={() => {
            if (index !== panelProps.length - 1) {
              setExpandIndex(index)
            }
          }}
        >
          {renderPanelContent({ 
            ...props,
            collapseWidth,  
            collapse: index !== expandIndex, 
          })}
        </CollapsePanel>
      )
    })
  }

  const containerWidth = width + collapseWidth * (panelProps.length - 1)

  return (
    <CollapseContainer width={containerWidth} otherHeight={otherHeight}>
      {renderPanel()}
    </CollapseContainer>
  )
}

export default PictureCollapse