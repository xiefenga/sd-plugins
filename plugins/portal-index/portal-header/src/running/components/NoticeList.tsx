import React from 'react'
import moment from 'moment'
import styled from 'styled-components'

import type { Notice } from '@/types'
import SmileOutlined from './icons/SmileOutlined.svg'

const NoticeListWrapper = styled.ul`
  margin: 0;
  padding: 0;
`

const NoticeItem = styled.li`
  padding: 8px 12px;
  border-radius: 2px;
  list-style: none;
  box-sizing: content-box;
  user-select: none;

  &:hover {
    color: ${props => props.theme.font.active};
    background-color: ${props => props.theme.bg.active};

    .notice-date {
      color: ${props => props.theme.font.active};
    }
  }

  .notice-title {
    font-size: 16px;
    font-weight: 700;
  }

  .notice-body {
    margin: 5px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .content {
      width: 60%;
    }

    .op {
      cursor: pointer;
      flex-shrink: 0;
      color: #1890ff;
    }
  }

  .notice-date {
    font-size: 12px;
    color: #999;
  }
`

const EmptyNotice = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;

  .icon svg {
    width: 70px;
    height: 70px;
  }

  .tip {
    font-size: 13px;
    line-height: 13px;
    color: #00000040;
  }
`

interface NoticeListProps {
  list: Notice[]
}

const NoticeList: React.FC<NoticeListProps> = (props) => {

  const { list } = props

  const renderNoticeList = () => {
    if (list.length === 0) {
      return (
        <EmptyNotice>
          <span className='icon'>
            <SmileOutlined />
          </span>
          <span className='tip'>
            暂无通知
          </span>
        </EmptyNotice>
      )
    } 
    return list.map((item, index) => {
      const openNotice = () => {
        item.info_url && window.open(item.info_url)
      }
      return (
        <NoticeItem key={index}>
          <div className='notice-title'>
            {item.info_title}
          </div>
          <div className='notice-body'>
            <span className='content'>
              {item.info_url_title ?? '未知'}
            </span>
            <span className='op' onClick={openNotice}>
              {item.info_content}
            </span>
          </div>
          <div className='notice-date'>
            {moment(item.last_modify_time).format('YYYY-MM-DD')}
          </div>
        </NoticeItem>
      )
    })
  }

  return (
    <NoticeListWrapper>
      {renderNoticeList()}
    </NoticeListWrapper>
  )
}

export default NoticeList