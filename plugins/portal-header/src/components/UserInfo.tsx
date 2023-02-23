import React from 'react'
import styled from 'styled-components'
import { useState, useEffect } from 'react'
import { Dropdown, Avatar, message } from 'antd'

import { logout, queryUser } from '@/api'
import { Optional, User } from '@/types'
import { usePluginConfig } from '@/hooks'
import ThemedMenu from './styled/AntdMenu'
import DownOutlined from './icons/DownOutlined.svg'
import defaultAvatar from '@/assets/default-avatar.png'

const UserInfoWrapper = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  
  .avatar {
    margin: 0 5px;
  }

  .account {
    display: flex;
    align-items: center;

    svg {
      margin-bottom: 3px;
      transform: scale(0.7);
      transition: transform .3s;
      &.open {
        transform: scale(0.7) rotate(180deg);
      }
    }
  }
`
const appid = new URLSearchParams(window.location.search).get('appid')

// companyName 组织
// userName 身份
// name 姓名
// photo 头像

const UserInfo: React.FC = () => {

  const { workbanchName = '个人工作台', workbanchUrl } = usePluginConfig()

  const [visible, setVisible] = useState(false)

  const [user, setUser] = useState<Optional<User>>()

  const request = async () => {
    try {
      const { data } = await queryUser()
      const {
        photo: avatar,
        name: userName,
        userName: identity,
        companyName: organization,
      } = data

      setUser({ organization, identity, avatar, userName })
    } catch (_error) {
      // 
    }
  }

  useEffect(() => {
    request()
  }, [])

  const logoutAccout = async () => {
    try {
      const { status, data } = await logout()
      if (status === 200) {
        if (data) {
          window.location.href = `/application/login/${appid}`
        } else {
          console.log('Nores.data')
          window.location.reload()
        }
      }
    } catch (error) {
      message.error('退出登录出错' + error)
    }
  }

  const renderUserMenu = () => {

    const menuItems = [
      {
        key: 'workbanch',
        label: (
          <a href={workbanchUrl} target='_blank' rel="noreferrer">
            {workbanchName}
          </a>
        ),
      },
      {
        key: 'logout',
        label: (
          <span onClick={logoutAccout}>
            退出登录
          </span>
        ),
      },
    ]

    return (
      <ThemedMenu 
        items={menuItems} 
        style={{ fontSize: 12 }} 
      />
    )
  }

  return (
    <UserInfoWrapper>
      { user && (
        <React.Fragment>
          <span>{user?.organization} · {user?.identity} · </span>
          <Avatar 
            size={30}
            draggable={false} 
            className='avatar'
            src={user?.avatar ?? defaultAvatar} 
          />
          <Dropdown 
            visible={visible} 
            destroyPopupOnHide 
            overlay={renderUserMenu()} 
            onVisibleChange={visible => setVisible(visible)}
          >
            <div className='account'>
              <span className='username'>
                {user?.userName}
              </span>
              <DownOutlined className={visible ? 'open' : ''} />
            </div>
          </Dropdown>
        </React.Fragment>
      )}
    </UserInfoWrapper>
  )
}

export default UserInfo