import { usePagination } from 'ahooks'
import React, { useState } from 'react'
import NiceModal from '@ebay/nice-modal-react'
import { DownOutlined, InfoCircleOutlined } from '@ant-design/icons'
import { Form, Input, Select, Button, Table, Popconfirm, Divider, Upload, message, UploadProps, Dropdown, Menu, MenuProps } from 'antd'

import { getCookie, download } from '@/util'
import PasswordModal from '../modals/PasswordModal'
import HandoverModal from '../modals/HandoverModal'
import AccountDrawer from '../modals/AccountDrawer'
import useConfirmModal from '../modals/ComfirmModal'
import { AccountFormMode } from '@/types/components'
import { CurrentUserResp, UserResp } from '@/types/api/account'
import { baseUserTableColumns, showImportSataus } from './helper'
import { downloadAccountExcel, queryUserList, updateLoginFlag } from '@/api/account'
import './index.less'

type UserFilter = {
  name: string
  account: string
  login_flag: string
}

const ColTypeMap: { [key in keyof UserFilter]: 0 | 2 } = {
  name: 0,
  account: 0,
  login_flag: 2,
}

// const openModal = <T extends Omit<any, 'id'>, >(modal: React.FC<T>, args: T) => {
//   NiceModal.show(modal, args)
// }

type PaginationServiceParams = { current: number, pageSize: number }

interface UserTableProps {
  deployMode: string
  permission: string[]
  currentUser?: CurrentUserResp
}

const UserTable: React.FC<UserTableProps> = (props) => {

  const { deployMode, permission, currentUser } = props

  const paginationService = async (
    { current, pageSize }: PaginationServiceParams
  ) => {

    const filedsValue = form.getFieldsValue()

    const params = Object.keys(filedsValue)
      .filter(col => !!filedsValue[col as keyof UserFilter])
      .map((colName) => {
        const type = ColTypeMap[colName as keyof UserFilter]
        const value = filedsValue[colName as keyof UserFilter]
        return {
          type,
          value,
          colName,
        }
      })

    const resp = await queryUserList(params, { pageNum: current, pageSize })
    return {
      total: resp.totalCount,
      list: resp.result,
    }
  }

  const {
    data,
    loading,
    refresh,
    pagination,
  } = usePagination(paginationService, {
    onError(error) {
      message.error('获取数据失败, ' + error)
      console.log(error)
    },
  })

  const dataSource = data?.list ?? []

  const [form] = Form.useForm<UserFilter>()

  const openChangePasswordModal = (account: string, code: string) => {
    NiceModal.show(PasswordModal, { account, code, refresh })
  }

  const openHandoverModal = (deleteAccounts: string[]) => {
    // @ts-ignore
    NiceModal.show(HandoverModal, {
      refresh,
      deleteAccounts,
    })
  }

  const openAccountDrawer = (mode: AccountFormMode, code?: string, loginName?: string) => {
    NiceModal.show(AccountDrawer, {
      mode,
      loginName,
      accountCode: code,
      afterClose: refresh,
    })
  }

  const operationTableColumn = {
    title: '操作',
    render: (_: string, record: UserResp) => {
      const opText = record.loginFlag === '0' ? '禁用' : '启用'

      const showAccountInfo = () => {
        openAccountDrawer('update', record.code, record.account)
      }

      const editAccountStatus = async () => {
        try {
          await updateLoginFlag(
            record.loginFlag === '0' ? 1 : 0,
            [record.code]
          )
          refresh()
        } catch (error) {
          message.error(opText + '失败, ' + error)
          console.log(error)
        }
      }

      const changePassword = async () => {
        openChangePasswordModal(record.account, record.code)
      }

      const handover = () => {
        openHandoverModal([record.code])
      }

      const canOpAccount = deployMode === '0' && permission.includes('e') && record.code !== currentUser?.account_code

      return (
        <div>
          <Button type='link' onClick={showAccountInfo}>
            详情
          </Button>
          <Divider type='vertical' />
          {permission.includes('e') && (
            <Popconfirm
              okText="确定"
              cancelText="取消"
              title="确定要修改密码吗?"
              onConfirm={changePassword}
            >
              <Button type='link'>密码</Button>
            </Popconfirm>
          )}

          {canOpAccount && (
            <React.Fragment>
              <Divider type='vertical' />
              <Popconfirm
                okText="确定"
                cancelText="取消"
                title={`确定要${opText}吗?`}
                onConfirm={editAccountStatus}
              >
                <Button type='link'>{opText}</Button>
              </Popconfirm>
            </React.Fragment>
          )}

          {permission.includes('e') && (
            <React.Fragment>
              <Divider type='vertical' />
              <Popconfirm
                okText="确定"
                cancelText="取消"
                title="确定要删除吗?"
                onConfirm={handover}
              >
                <Button type='link'>删除</Button>
              </Popconfirm>
            </React.Fragment>
          )}
        </div>
      )
    },
  }

  const columns = [...baseUserTableColumns, operationTableColumn]

  const resetQuery = async () => {
    form.resetFields()
    refresh()
  }

  const downloadExcel = async () => {
    try {
      const response = await downloadAccountExcel()
      const blob = new Blob([response],
        {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8',
        }
      )
      download(blob, '账户模板')
    } catch (error) {
      message.error('文件下载失败, ' + (
        error instanceof Object
          ? error instanceof Error
            ? error.message
            : error.toString()
          : error
      ))
      console.log(error)
    }
  }

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])

  const rowSelection = {
    selectedRowKeys,
    onChange(selectedRowKeys: React.Key[]) {
      setSelectedRowKeys(selectedRowKeys)
    },
  }

  const clearSelections = () => {
    setSelectedRowKeys([])
  }

  const openDisableAccountModal = useConfirmModal({
    icon: <InfoCircleOutlined />,
    title: '确认禁用吗？',
    content: null,
    async onConfirm() {
      try {
        await updateLoginFlag(1, selectedRowKeys as string[])
        setSelectedRowKeys([])
        message.success('禁用成功！')
        refresh()
      } catch (error) {
        message.error('禁用失败, ' + error)
        console.log(error)
      }
    },
  })

  const openEnableAccountModal = useConfirmModal({
    icon: <InfoCircleOutlined />,
    title: '确认启用吗？',
    content: null,
    async onConfirm() {
      try {
        await updateLoginFlag(0, selectedRowKeys as string[])
        setSelectedRowKeys([])
        message.success('启用成功！')
        refresh()
      } catch (error) {
        message.error('启用失败, ' + error)
        console.log(error)
      }
    },
  })

  const batchMenuItems = [
    { key: '删除账号', label: '删除账号' },
    { key: '禁用账号', label: '禁用账号', deployMode: '0' },
    { key: '启用账号', label: '启用账号', deployMode: '0' },
  ]

  const renderBatchMenu = () => {

    const menus = batchMenuItems.filter(item => !item.deployMode || item.deployMode === deployMode)

    const onClick: MenuProps['onClick'] = ({ key }) => {
      if (key === '禁用账号') {
        openDisableAccountModal()
      } else if (key === '启用账号') {
        openEnableAccountModal()
      } else if (key === '删除账号') {
        openHandoverModal(selectedRowKeys as string[])
      }
    }

    return (
      <Menu onClick={onClick}>
        {menus.map(menu => (
          <Menu.Item key={menu.key}>
            {menu.label}
          </Menu.Item>
        ))}
      </Menu>
    )
  }

  const renderBatchOpButton = () => {
    return selectedRowKeys.length && permission.includes('e')
      ? (
        <Dropdown overlay={renderBatchMenu()}>
          <Button type='primary' >
            批量操作
            <DownOutlined />
          </Button>
        </Dropdown>
      ) : null
  }

  const renderTableSelection = () => {
    return selectedRowKeys.length
      ? (
        <div className='table-selection'>
          <span>已选择 {selectedRowKeys.length} 项,总计 {pagination.total}</span>
          <span
            className='cancel-button'
            onClick={clearSelections}
          >清空选择</span>
        </div>
      ) : null
  }

  const onUploadChange: UploadProps['onChange'] = ({ file }) => {
    // 上传失败
    if (file.status === 'error') {
      message.error(
        '导入失败，' +
        (file.response.message ?? '模板不正确或数据不符合要求')
      )
      // 上传成功
    } else if (file.status === 'done') {
      const {
        failCount = 0,
        successCount = 0,
        errorAccount = '',
      } = file.response.result
      showImportSataus(successCount, failCount, errorAccount)
    }
  }

  return (
    <div className='user-list-0x1461a0'>
      <div className='user-filter'>
        <Form layout='inline' form={form}>
          <Form.Item name='name' label='姓名'>
            <Input />
          </Form.Item>
          <Form.Item name='account' label='登录名'>
            <Input />
          </Form.Item>
          <Form.Item name='login_flag' label='状态'>
            <Select
              allowClear
              style={{ width: 150 }}
              options={[
                {
                  value: '0',
                  label: '启用',
                },
                {
                  value: '1',
                  label: '禁用',
                },
              ]}
            />
          </Form.Item>
          <Form.Item>
            <Button type='primary' onClick={refresh}>
              查询
            </Button>
          </Form.Item>
          <Form.Item>
            <Button onClick={resetQuery}>
              重置
            </Button>
          </Form.Item>
        </Form>
      </div>
      <div className='user-tools'>
        <Button
          type='primary'
          className='user-tool'
          onClick={downloadExcel}
        >
          下载模板
        </Button>
        <Upload
          maxCount={1}
          withCredentials
          className='user-tool'
          showUploadList={false}
          onChange={onUploadChange}
          headers={{ 'X-XSRF-TOKEN': getCookie('XSRF-TOKEN') }}
          action='/sdata/rest/system/excelImport/importAccount'
        >
          <Button type='primary'>
            导入用户
          </Button>
        </Upload>

        {deployMode === '0' && permission.includes('e') && (
          <Button
            type='primary'
            className='user-tool'
            onClick={() => openAccountDrawer('add')}
          >
            新增账户
          </Button>
        )}
        {renderBatchOpButton()}
      </div>
      {renderTableSelection()}
      <div className='user-table'>
        <Table
          rowKey='code'
          loading={loading}
          columns={columns}
          dataSource={dataSource}
          pagination={pagination}
          rowSelection={rowSelection}
        />
      </div>
    </div>
  )
}

export default UserTable