import styled from 'styled-components'
import { useEffect, useMemo, useState } from 'react'
import { Theme, useStore, DEFAULT_THEME } from 'portal-shared'
import { Dropdown, Popover, Badge, Spin, MenuProps, message, Tabs } from 'antd'

import { Notice } from '@/types'
import NoticeList from './NoticeList'
import { queryNotification } from '@/api'
import { updateTheme } from '@/api/service'
import { ThemedTabs } from './styled/AntdTabs'
import { ThemedMenu } from './styled/AntdMenu'
import { usePluginConfig } from '@/running/hooks'

import BellOutlined from './icons/BellOutlined.svg'
import ThemeOutlined from './icons/ThemeOutlined.svg'
import SearchOutlined from './icons/SearchOutlined.svg'
import SettingOutlined from './icons/SettingOutlined.svg'

const BusinessWrapper = styled.div`
  height: 58px;
  display: flex;
  user-select: none;
  font-size: 16px;
  box-sizing: content-box;

  .index-button {
    padding: 0 25px;
    line-height: 58px;
    color: ${props => props.theme.font.active};
    background: ${props => props.theme.bg.active};
    flex-shrink: 0;
  }

  .business-navs {
    max-width: calc(100% - 232px - 82px);

    a {
      color: inherit;
      font-family: inherit;
      font-size: inherit;
      transition: color .1s;
      line-height: 58px;
      padding: 0 25px;
    }
  }

  .operation-btns {
    display: flex;
    border-top: 1px solid #EEE;
    border-bottom: 1px solid #EEE;

    .btn-item {
      cursor: pointer;
      width: 58px;
      display: flex;
      justify-content: center;
      align-items: center;

      &.active {
        background-color: ${props => props.theme.bg.active};
        margin-top: -1px;
        height: 60px;
      }

      &:not(.active):hover {
        background-color: ${props => props.theme.bg.hover};
      }

      svg {
        width: 20px;
        height: 20px;
      }
    }
  }
`

const AutoGap = styled.div`
  flex: 1;
  border-top: 1px solid #EEE;
  border-bottom: 1px solid #EEE;
`

const NoticePopover = styled.div`
  width: 280px;
  margin: -6px -14px;
  user-select: none;

  .notice-loading {
    width: 250px;
  }

  .notice-popover-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px 8px;
    border-bottom: 1px solid #eee;

    .ant-badge-count {
      background-color: #1890ff;
    }
  }

  .all-notice-button {
    margin: 0 10px;
    border-top: 1px solid #eee;
    color: #999;
    cursor: pointer;
    font-size: 13px;
    padding: 10px 0 4px;
    text-align: center;
  }
`

const NoticeLoading = styled(Spin)`
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  font-size: 12px;

  .ant-spin-text {
    margin-top: 10px;
  }
`

const NavLink = styled.a.attrs({ target: '_blank' })`
  display: block;
`

const HeaderBottom = () => {

  const {
    searchUrl,
    themes = [],
    busninessNavs = [],
    apiConfig,
    defaultLogo = '',
    noticeLink,
  } = usePluginConfig()

  const defaultTheme = useMemo(() => {
    return { ...DEFAULT_THEME, logo: defaultLogo }
  }, [defaultLogo])

  const user = useStore(state => state.user)

  const ssoCode = useStore(state => state.code)

  const theme = useStore(state => state.theme)

  const setTheme = useStore(state => async (theme: Theme) => {
    if (apiConfig.updateKey && user) {
      await updateTheme(apiConfig.updateKey, user.id, theme).catch(() => {})
    }
    state.changeTheme(theme)
  })

  const [loading, setLoading] = useState(false)

  const [count, setCount] = useState(0)

  const [noticeList, setNoticeList] = useState<Notice[]>([])

  useEffect(() => {
    getNotifications()
  }, [])

  const getNotifications = async () => {
    setLoading(true)
    try {
      const { data } = await queryNotification()
      const { results } = data
      setCount(data.totalCount)
      setNoticeList(results)
    } catch (_error) {
      // 
    } finally {
      setLoading(false)
    }
  }

  const renderNavButtons = () => {
    return busninessNavs.map((button, index) => {
      const url = new URL(button.url, location.origin)

      button.params?.forEach(param => {
        if (param.option === 'SSOCode') {
          if (button.isHash && url.hash) {
            const delimiter = url.hash.includes('?') ? '&' : '?'
            url.hash += delimiter + `${param.name}=${ssoCode}`
          } else if (!button.isHash) {
            url.searchParams.append(param.name, ssoCode)
          }
        } else if (user) {
          if (button.isHash && url.hash) {
            const delimiter = url.hash.includes('?') ? '&' : '?'
            url.hash += delimiter + `${param.name}=${user[param.option]}`
          } else if (!button.isHash) {
            url.searchParams.append(param.name, user[param.option])
          }
        }
      })

      const target = url.toString()

      return (
        <Tabs.TabPane
          key={button.name + index}
          tab={
            <NavLink href={target}>
              {button.name}
            </NavLink>
          }
        />
      )
    })
  }

  const renderThemeMenu = () => {

    const themeList = [defaultTheme].concat(themes)

    const items = themeList.map(theme => ({
      key: theme.name,
      label: theme.name,
    }))

    const changeTheme: MenuProps['onClick'] = ({ key }) => {
      if (key !== theme.name) {
        const targetTheme = themeList.find(item => item.name === key) ?? defaultTheme
        // 图片预加载
        const image = new Image()
        image.addEventListener('load', () => {
          setTheme(targetTheme)
        })
        image.addEventListener('error', (e) => {
          message.error('logo加载失败', e.error)
          setTheme(targetTheme)
        })
        image.src = targetTheme.logo
      }
    }

    return (
      <ThemedMenu
        items={items}
        onClick={changeTheme}
        selectedKeys={[theme.name]}
      />
    )
  }

  const goNoticeLink = () => {
    if (noticeLink) {
      window.open(noticeLink)
    }
  }

  const renderNoticeContent = () => {
    if (loading) {
      return (
        <NoticePopover>
          <div className='notice-popover-title'>
            <span>通知</span>
            <Badge count={noticeList.length} overflowCount={99} />
          </div>
          <NoticeLoading tip='加载中' />
        </NoticePopover>
      )
    }
    return (
      <NoticePopover>
        <div className='notice-popover-title'>
          <span>通知</span>
          <Badge count={count} overflowCount={99} />
        </div>
        <NoticeList list={noticeList} />
        <div className='all-notice-button' onClick={goNoticeLink}>
          查看全部通知
        </div>
      </NoticePopover>
    )
  }

  const openSearchUrl = () => {
    searchUrl && window.open(searchUrl)
  }

  return (
    <BusinessWrapper>
      <div className='index-button'>
        概览
      </div>
      <div className='business-navs'>
        <ThemedTabs activeKey=''>
          {renderNavButtons()}
        </ThemedTabs>
      </div>
      <AutoGap />
      <div className='operation-btns'>
        <span className='btn-item' onClick={openSearchUrl}>
          <SearchOutlined />
        </span>
        <Dropdown overlay={renderThemeMenu()}>
          <span className='btn-item'>
            <ThemeOutlined />
          </span>
        </Dropdown>
        <Popover
          destroyTooltipOnHide
          placement='topRight'
          content={renderNoticeContent()}
          overlayClassName='themed-ant-popover'
        >
          <span className='btn-item'>
            <Badge dot count={count}>
              <BellOutlined />
            </Badge>
          </span>
        </Popover>
        <span className='btn-item'>
          <SettingOutlined />
        </span>
      </div>
    </BusinessWrapper>
  )
}

export default HeaderBottom