import React from 'react'
import { useState } from 'react'
import styled from 'styled-components'

import Space from '../Space'
import UserTag from './UserTag'
import UserInfo from './UserInfo'
import SearchInput from './SearchInput'
import SearchTitle from './SearchTitle'
import { UserSearchResp } from '@/types'
import SearchBackground from '@/assets/search-background.png'

const Div = styled.div`
  width: 460px;
  background: url(${SearchBackground});
  /* background-size: 1860px 100%; */
  background-size: 1920px 100%;
  height: calc(100% - 100px);
  min-height: 790px;
  max-height: 800px;
  box-sizing: border-box;
  background-position: right;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 30px;
`

const UserSearch = () => {

  const [seletedUser, setSelectUser] = useState<UserSearchResp>()

  // const user = {
  //   avatar: 'https://images.chinatimes.com/newsphoto/2021-04-13/1024/20210413004121.jpg',
  //   name: '吴谦',
  //   rank: '大校',
  //   code: '342567',
  //   age: 35,
  //   organization: '华东战区第十三集团WKBDXX办公室fasd;',
  // }

  return (  
    <Div>
      <SearchInput setSelectUser={setSelectUser} />
      {seletedUser && (
        <React.Fragment>
          <Space y={19} />
          <SearchTitle title='用户基本信息' />
          <Space y={7} />
          <UserInfo {...seletedUser} />
          <Space y={24} />
          <SearchTitle title='用户标签' />
          <Space y={8} />
          <UserTag tags={seletedUser.user_tag.slice(1, -1).split(',')} />
        </React.Fragment>
      )}
    </Div>
  )
}

export default UserSearch