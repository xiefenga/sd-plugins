import React from 'react'
import { useState } from 'react'
import { useRequest } from 'ahooks'
import styled from 'styled-components'
import { Dropdown, Avatar, message } from 'antd'

import { logout, queryUser } from '@/api'
import { Optional, User } from '@/types'
import { usePluginConfig } from '@/running/hooks'
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


const UserInfo: React.FC = () => {

  const { workbanch } = usePluginConfig()

  const [visible, setVisible] = useState(false)

  const [user, setUser] = useState<Optional<User>>()

  useRequest(queryUser, {
    retryCount: 3,
    onError(error) {
      message.error('请求用户数据失败' + error.message)
    },
    onSuccess(data) {
      const {
        photo: avatar,
        name: userName,
        userName: identity,
        companyName: organization,
      } = data
      setUser({ organization, identity, avatar, userName })
    },
  })

  const logoutSys = async () => {
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
          <a href={workbanch?.url} target='_blank' rel="noreferrer">
            {workbanch?.text || '个人工作台'}
          </a>
        ),
      },
      {
        key: 'logout',
        label: (
          <span onClick={logoutSys}>
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
      {user && (
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