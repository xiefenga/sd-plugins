import React from 'react'
import styled from 'styled-components'

const PanelWrappeer = styled.div`
  overflow: hidden;
  position: relative;
  transition: width .1s linear;
  height: 100%;
`

const Title = styled.div`
  position: absolute;
  width: 28px;
  font-size: 20px;
  font-weight: 700;
  text-align: center;
  color: ${props => props.theme.font.default};
  right: 10px;
  top: 0;
  padding: 0 4px 4px;
  box-sizing: content-box;
  background-color: #FFF;
  user-select: none;

  &::after {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    border: 5px solid;
    border-color: #FFF transparent transparent #FFF;
    top: 0;
    right: -10px;
  }

`

interface PreviewImageContainerProps {
  width: number
  collapse: boolean
}

const PreviewImageContainer = styled.div<PreviewImageContainerProps>`
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: ${props => props.width}px;
  display: ${props => props.collapse ? 'block' : 'none'};
`

const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const Background = styled.img.attrs({ draggable: false })`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const Description = styled.span<{ collapse: boolean }>`
  position: absolute;
  top: 20px;
  left: 20px;
  width: 210px;
  height: 57px;
  color: #fff;
  font-size: 14px;
  display: ${props => props.collapse ? 'none' : 'block'};
`

const BlockContainer = styled.div<{ collapse: boolean }>`
  position: absolute;
  left: 0;
  bottom: 0;
  width: 534px;
  height: 213px;
  overflow: hidden;
  display: ${props => props.collapse ? 'none' : 'block'};
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
    display: flex;
    width: 40px;
    height: 100%;
    align-items: center;
  }
`

interface BlockLinkPorps {
  text: string
  link: string
}

const BlockLink = (props: BlockLinkPorps) => {

  return (
    <a href={props.link} target='_blank' rel='noreferrer'>
      <Block>
        <span>
          {props.text}
        </span>
      </Block>
    </a>
  )
}

interface ButtonLink {
  text: string
  link: string
}

export interface CollapsePanelProps {
  collapse?: boolean
  title: string
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
    title,
  } = props

  return (
    <PanelWrappeer>
      <Title>{title}</Title>
      <Description collapse={collapse}>{description}</Description>
      <Background src={background} />
      <PreviewImageContainer 
        collapse={collapse} 
        width={collapseWidth}
      >
        <Title>{title}</Title>
        <PreviewImage src={preview} />
      </PreviewImageContainer>
      <BlockContainer collapse={collapse}>
        {buttons.map((button, index) => (
          <BlockLink
            key={index}
            text={button.text}
            link={button.link}
          />
        ))}
      </BlockContainer>
    </PanelWrappeer>
  )
}

export default CollapsePanel