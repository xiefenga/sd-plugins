import { useState } from 'react'
import styled from 'styled-components'
import { useMount, useRequest } from 'ahooks'
import NiceModal from '@ebay/nice-modal-react'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Checkbox, CheckboxProps, Empty, Input, Modal, ModalProps, Select, Spin, Typography, message } from 'antd'

import { usePluginConfig } from '@/context'
import { addApps, queryAssetData } from '@/api'
import { AppAsset, PermissionAsset } from '@/types'

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  .add-button {
    cursor: pointer;
  }

  .list-container {
    width: 45%;

    .title {
      font-size: 18px;
      margin-bottom: 10px;
    }

    .tool {
      display: flex;
      align-items: center;
      margin-bottom: 10px;

      .ant-btn {
        margin-left: auto;
      }

      .ant-input-search {
        width: 80%;
      }
    }

    .app-list {
      height: 300px;
      padding: 10px;
      overflow-y: auto;
      border: 1px solid #ccc;
    }
  }

  .empty-container {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`

const AppItemContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px;

  .ant-btn {
    color: #1e1e18;
    &:hover {
      color: #074357;
      background: transparent;
    }
  }

  .ant-typography {
    margin-right: 5px;
  }

  .ant-select {
    width: 100px;
    margin-left: auto;
  }
`

interface AppItemProps {
  title: string
  permission: string
  permissions: PermissionAsset[]
  onSelect?: (value: string) => void
  onDel?: () => void
}

const ReadyAppItem = (props: AppItemProps) => {

  const { title, onDel, permission, onSelect, permissions } = props

  const options = permissions.map(item => ({ label: item.name, value: item.id }))

  return (
    <AppItemContainer>
      <Button onClick={onDel} type='text' size='small'>
        <MinusCircleOutlined rev='' />
      </Button>
      <Typography.Text ellipsis={{ tooltip: title }}>
        {title}
      </Typography.Text>
      <Select
        size='small'
        options={options}
        value={permission}
        placeholder='选择权限'
        onSelect={onSelect}
      />
    </AppItemContainer>
  )
}

interface AppAddModalProps {
  role_id: string
  ownApps: string[]
  permissions: PermissionAsset[]
}

const AppAddModal = (props: AppAddModalProps) => {

  const { role_id, ownApps, permissions } = props

  useMount(() => {
    if (permissions.length === 0) {
      message.error('暂无可用权限，请先创建权限')
      modal.hide()
    }
  })

  const modal = NiceModal.useModal()

  const { appAssetId } = usePluginConfig()

  const [search, setSearch] = useState<string>('')

  const { data: appList, loading } = useRequest(queryAssetData<AppAsset>, {
    defaultParams: [appAssetId],
    onError: (error: any) => {
      message.error(error?.data?.message ?? '应用列表获取失败')
    },
  })

  const { run: addApp, loading: addLoading } = useRequest(addApps, {
    manual: true,
    onSuccess: () => {
      modal.resolve()
      modal.hide()
    },
    onError: (error: any) => {
      message.error(error?.data?.message ?? '添加失败，请重试')
    },
  })

  interface CheckedItem {
    datapp_id: string
    app_name: string
  }

  const [checkedList, setCheckedList] = useState<CheckedItem[]>([])

  interface ReadyItem extends CheckedItem {
    operation_type: string // 权限类型
  }

  const [readyList, setReadyList] = useState<ReadyItem[]>([])

  const appCanCheckedList = appList?.filter(app => !ownApps.includes(app.data_id)).filter(app => !readyList.find(item => item.datapp_id === app.data_id)).filter(app => app.name.includes(search))

  const onAdd = () => {
    setCheckedList([])
    setReadyList([...readyList, ...checkedList.map(item => ({ ...item, operation_type: permissions[0].id }))])
  }

  const modalProps: ModalProps = {
    width: 700,
    title: '添加应用',
    destroyOnClose: true,
    confirmLoading: addLoading,
    ...NiceModal.antdModal(modal),
    onOk: () => {
      addApp({ role_id, apps: readyList })
    },
  }

  return (
    <Modal {...modalProps}>
      <Container>
        <div className='list-container'>
          <div className='title'>应用选择</div>
          <div className='tool'>
            <Input.Search
              allowClear
              size='small'
              onChange={e => setSearch(e.target.value)}
              placeholder='请输入应用名称'
            />
          </div>
          <Spin tip='加载中...' spinning={loading}>
            <div className='app-list'>
              {appCanCheckedList?.map(app => {
                const onChange: CheckboxProps['onChange'] = e => {
                  setCheckedList(
                    e.target.checked
                      ? [...checkedList, { datapp_id: app.data_id, app_name: app.name }]
                      : checkedList.filter(item => item.datapp_id !== app.data_id)
                  )
                }
                const checked = !!checkedList.find(item => item.datapp_id === app.data_id)
                return (
                  <div key={app.data_id}>
                    <Checkbox checked={checked} onChange={onChange}>
                      <Typography.Text ellipsis={{ tooltip: app.name }}>
                        {app.name}
                      </Typography.Text>
                    </Checkbox>
                  </div>
                )
              })}
            </div>
          </Spin>
        </div>

        <Button type='dashed' onClick={onAdd} disabled={checkedList.length === 0}>
          <PlusOutlined rev='' />
        </Button>
        <div className='list-container'>
          <div className='title'>应用赋权</div>
          <div className='tool'>
            <Button size='small' onClick={() => setReadyList([])}>全部移除</Button>
          </div>
          <div className='app-list'>
            {readyList.map(item => {
              const onSelect = (value: string) => {
                item.operation_type = value
                setReadyList([...readyList])
              }

              return (
                <ReadyAppItem
                  onSelect={onSelect}
                  key={item.datapp_id}
                  title={item.app_name}
                  permissions={permissions}
                  permission={item.operation_type}
                  onDel={() => setReadyList(readyList.filter(readyItem => readyItem.datapp_id !== item.datapp_id))}
                />
              )
            })}
            {readyList.length === 0 && (
              <div className='empty-container'>
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description='暂无应用' />
              </div>
            )}
          </div>
        </div>
      </Container>
    </Modal>
  )
}

export default NiceModal.create(AppAddModal)