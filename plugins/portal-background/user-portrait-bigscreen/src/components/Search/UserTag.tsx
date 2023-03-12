import React from 'react'
import styled from 'styled-components'
import textBackground from '@/assets/decorator1.png'
import smallBackground from '@/assets/decorator2.png'
import decoratorBackground from '@/assets/decorator-background.png'

interface DecoratorProp {
  width: number
  x: number
  y: number
}

const Div = styled.div`
  width: 427px;
  height: 438px;
  position: relative;
  background: rgba(94, 191, 233, 0.12);
  background-image: url(${decoratorBackground});
  background-size: cover;
  background-position: 7px 75px;
  border: 1px solid;
  border-image: linear-gradient('#5EBFE900', '##FFFFFF83', '#5EBFE900') 1;
`

const SmallDecorator = styled.div<DecoratorProp>`
  position: absolute;
  left: ${prop => prop.x}px;
  top: ${prop => prop.y}px;
  width: ${prop => prop.width}px;
  height: ${prop => prop.width}px;
  background-image: url(${smallBackground});
  background-position: center;
  background-size: 150%;
  border-radius: ${prop => prop.width / 2}px;
`

const TextDecorator = styled.div<DecoratorProp>`
  position: absolute;
  left: ${prop => prop.x}px;
  top: ${prop => prop.y}px;
  width: ${prop => prop.width}px;
  height: ${prop => prop.width}px;
  background-image: url(${textBackground});
  background-position: center;
  background-size: 113%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  user-select: none;
`

const smallDecorators = [
  { width: 31, x: 50, y: 51 },
  { width: 31, x: 181, y: 120 },
  { width: 39, x: 64, y: 223 },
  { width: 23, x: 122, y: 215 },
  { width: 41, x: 277, y: 170 },
  { width: 44, x: 353, y: 133 },
  { width: 31, x: 368, y: 254 },
  { width: 22, x: 377, y: 329 },
  { width: 53, x: 225, y: 306 },
  { width: 44, x: 32, y: 346 },
]

const textDecorators = [
  { width: 73, x: 81, y: 104, index: 2 },
  { width: 70, x: 225, y: 82, index: 4 },
  { width: 98, x: 164, y: 170, index: 0 },
  { width: 79, x: 109, y: 273, index: 1 },
  { width: 73, x: 279, y: 232, index: 3 },
]

interface UserTagProps {
  tags: string[]
}

const UserTag: React.FC<UserTagProps> = (props) => {

  const { tags } = props

  const renderUserTags = () => {
    return textDecorators.map(({ index, ...position }) => (
      <TextDecorator
        {...position}
        key={JSON.stringify(position)}
      >
        {tags[index]}
      </TextDecorator>
    ))
  }

  return (
    <Div>
      {smallDecorators.map(position => (
        <SmallDecorator
          {...position}
          key={JSON.stringify(position)}
        />
      ))}
      {renderUserTags()}
    </Div>
  )
}

export default UserTag