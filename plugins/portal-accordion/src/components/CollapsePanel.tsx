import React from 'react'
import classNames from 'classnames'
import styled from 'styled-components'

const Panel = styled.div`
  overflow: hidden;
  position: relative;
  transition: width .1s linear;

  &.collapse {

    .description, 
    .block-container {
      display: none;
    }
  }
`

interface PreviewImageProps {
  width: number
  collapse: boolean
}

const PreviewImage = styled.img<PreviewImageProps>`
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  object-fit: cover;
  width: ${props => props.width}px;
  display: ${props => props.collapse ? 'block' : 'none'};
`

const Background = styled.img.attrs({ draggable: false })`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const Description = styled.span.attrs({ className: 'description' })`
  position: absolute;
  top: 20px;
  left: 20px;
  width: 210px;
  height: 57px;
  color: #fff;
  font-size: 14px;
`

const BlockContainer = styled.div.attrs({ className: 'block-container' })`
  position: absolute;
  left: 0;
  bottom: 0;
  width: 534px;
  height: 213px;
  overflow: hidden;
`

const Block = styled.div`
  float: left;
  width: 106px;
  height: 106px;
  
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  font-size: 20px;
  line-height: 25px;
  cursor: pointer;
  position: relative;
  margin-right: 1px;

  &:hover::before {
    opacity: .9;
    background-color: ${props => props.theme.bg.active};
  }

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background: #212121;
    opacity: .7;
    z-index: 0;
    transition: all .3s ease-in-out;
  }

  &:nth-child(1),
  &:nth-child(2),
  &:nth-child(3),
  &:nth-child(4),
  &:nth-child(5) {
    margin-bottom: 1px;
  }

  &:nth-child(5),
  &:nth-child(10) {
    margin-right: 0;
  }

  span {
    position: absolute;
    color: #fff;
    z-index: 1;
    display: block;
    width: 40px;
    height: 50px;
  }
`

interface BlockLinkPorps {
  text: string
}

const BlockLink = (props: BlockLinkPorps) => {

  return (
    <Block>
      <span>{props.text}</span>
    </Block>
  )
}

interface ButtonLink {
  text: string
  link: string
}

export interface CollapsePanelProps {
  collapse?: boolean
  description: string
  buttons: ButtonLink[]
  collapseWidth: number
  background: string
  preview: string
}

const CollapsePanel: React.FC<CollapsePanelProps> = (props) => {

  const { 
    description, 
    background, 
    buttons, 
    preview,
    collapse = false,
    collapseWidth,
  } = props

  return (
    <Panel className={classNames({ collapse })}>
      <Description>{description}</Description>
      <Background src={background} />
      <PreviewImage 
        src={preview}
        collapse={collapse} 
        width={collapseWidth}
      />
      <BlockContainer>
        {buttons.map((button, index) => (
          <BlockLink
            key={index}
            text={button.text}
          />
        ))}
      </BlockContainer>
    </Panel>
  )
}

export default CollapsePanel