import React from 'react'
import styled from 'styled-components'

import Text from '../Text'
import Space from '../Space'

const Div = styled.div`
  width: 427px;
  height: 167px;
  background: #5EBFE91E;
  display: flex;
  align-items: center;
  user-select: none;
  font-family: 'PingFang SC';
`
const Avatar = styled.img`
  width: 120px;
  height: 120px;
  object-fit: cover;
  margin-left: 24px;
  border: 1px solid #5EBFE9;
  border-radius: 2px;
  overflow: hidden;
`

const InfoDiv = styled.div`
  height: 120px;
  width: 227px;
  margin-left: 32px;
`

const FlexDiv = styled.div`
  display: flex;
  align-items: center;
`

const Tag = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2px 12px;
  line-height: 20px;
  background: rgba(205, 128, 37, 0.15);
  border-radius: 4px;
  color: #CD8025;
  line-height: 20px;
  font-weight: 400;
  font-size: 14px;
`
const NameDiv = styled.div`
  font-size: 24px;
  font-weight: 600;
  line-height: 32px;
  color: #FFF;
`

interface UserInfoProps {
  avatar: string
  name: string
  user_rank: string
  user_idcode: string
  age: number
  office_name: string
}

const UserInfo: React.FC<UserInfoProps> = (props) => {

  const { avatar, name, user_rank: rank, user_idcode: code, age, office_name: organization } = props

  return (
    <Div>
      <Avatar draggable={false} src={avatar} />
      <InfoDiv>
        <FlexDiv>
          <NameDiv>{name}</NameDiv>
          <Space x={14} />
          <Tag>{rank}</Tag>
        </FlexDiv>
        <Space y={12} />
        <FlexDiv>
          <Text max={110} label='编号'>{code}</Text>
          <Space x={14} />
          <Text max={30} label='年龄'>{age}</Text>
        </FlexDiv>
        <Space y={12} />
        <Text newLine space={4} label='所在机构' color='#5EBFE9'>
          {organization}
        </Text>
      </InfoDiv>
    </Div>
  )
}

export default UserInfo