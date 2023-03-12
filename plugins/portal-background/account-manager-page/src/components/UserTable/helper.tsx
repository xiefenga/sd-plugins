import React from 'react'
import { Modal, Image } from 'antd'
import successIcon from '@/assets/success.png'
import { UserResp } from '@/types/api/account'

export const baseUserTableColumns = [
  {
    title: '姓名',
    width: '20%',
    dataIndex: 'loginName',
    render(text: string, record: UserResp) {
      return (
        <React.Fragment>
          <Image
            width={32}
            height={32}
            preview={false}
            src={record.photo}
          />
          <span style={{ marginLeft: '5px' }}>
            {text}
          </span>
        </React.Fragment>
      )
    },
  },
  {
    title: '工号',
    dataIndex: 'no',
  },
  {
    title: '登录名',
    dataIndex: 'account',
  },
  {
    title: '手机',
    dataIndex: 'mobile',
  },
  {
    title: '邮箱',
    dataIndex: 'email',
  },
  {
    title: '状态',
    dataIndex: 'loginFlag',
    render: (text: string) => {
      return Number(text) === 1
        ? '禁用'
        : '启用'
    },
  },
]

export const showImportSataus = (
  successCount: number,
  failCount: number,
  errorAccount: string
) => {
  Modal.info({
    icon: null,
    title: (<div className='title'>用户导入</div>),
    className: 'success-import-model',
    okText: '知道了',
    content: (
      <div className='model-content'>
        <div className='status'>
          <Image
            width={48}
            height={48}
            preview={false}
            src={successIcon}
          />
          <p className='status-message'>导入成功</p>
        </div>
        <div className='description'>
          <div className='tip'>
            <p className='title'>说明：</p>
            <p>1.不符合规则密码已改为Aa@12345</p>
            <p>2.部门为空默认改为一级部门名称</p>
            <p>3.角色为空默认改为普通用户角色</p>
          </div>
          <div className='info'>
            <p className='title'>导入状态：</p>
            <p>导入成功{successCount}条，{
              failCount > 0
                ? `导入失败${failCount}条， 请重新导入下列失败数据，登录名为：${errorAccount}`
                : '无失败数据'
            }</p>
          </div>
        </div>
      </div>
    ),
  })
}