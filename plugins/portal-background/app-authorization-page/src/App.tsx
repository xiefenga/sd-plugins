import React from 'react'
import { useState } from 'react'
import styled from 'styled-components'
import zhCN from 'antd/es/locale/zh_CN'
import NiceModal from '@ebay/nice-modal-react'
import { useRequest, useUpdateEffect } from 'ahooks'
import { UsergroupAddOutlined } from '@ant-design/icons'
import { Button, ConfigProvider, Menu, MenuProps, Popconfirm, Space, Spin, Table, TableProps, message } from 'antd'

import { usePluginConfig } from './context'
import RolePath from './components/RolePath'
import AppAddModal from './components/AppAddModal'
import UpdateAppModal from './components/UpdateAppModal'
import { PermissionAsset, RoleApp, RoleGroup, RoleItem } from './types'
import { delApp, queryAllRole, queryAppsByRole, queryAssetData } from './api'

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  background-color: #f5f6f7;
  padding: 20px 10px;
  gap: 20px;

  .role-group-menu {
    width: 256px;
    height: 100%;
    overflow: auto;
    border-radius: 5px;
    background-color: #fff;

    .ant-spin-nested-loading {
      height: 100%;
    }
  }

  .app-list {
    flex-grow: 1;
    background: #fff;
    padding: 10px;
    border-radius: 5px;

    .loading-container {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .title {
      font-size: 24px;
      font-weight: 700;
      margin-bottom: 0;
    }

    .app-table {
      margin-top: 20px;
    }
  }
`

// 默认角色组
const DEFAULT_ROLE_GROUP_ID = 'default'

// 系统管理员
const SYSTEM_ADMINISTRATOR_ROLE_ID = '100000000001'

const App = () => {

  const [selectedGroup, setSelectedGroup] = useState<RoleGroup>()
  const [selectedRole, setSelectedRole] = useState<RoleItem>()

  const { permissionAssetId } = usePluginConfig()

  const { data: permissions, loading: permissionLoading } = useRequest(queryAssetData<PermissionAsset>, {
    defaultParams: [permissionAssetId],
    onError(error: any) {
      message.error(error?.data?.message ?? '获取权限列表失败')
    },
  })

  const { data: roleGroupData, loading } = useRequest(queryAllRole, {
    onError(error: any) {
      message.error(error?.data?.message ?? '获取角色列表失败')
    },
    onSuccess(group) {
      const defaultGroup = group.find(item => item.id === DEFAULT_ROLE_GROUP_ID)
      const defaultRole = defaultGroup?.roleItemList.find(item => item.id === SYSTEM_ADMINISTRATOR_ROLE_ID)
      if (defaultGroup && defaultRole) {
        setSelectedGroup(defaultGroup)
        setSelectedRole(defaultRole)
      }
    },
  })

  const { data: roleApps, loading: roleAppLoading, run, mutate } = useRequest(queryAppsByRole, {
    manual: true,
    onBefore() {
      mutate()
    },
    onError(error: any) {
      message.error(error?.data?.message ?? '获取当前角色应用列表失败')
    },
  })

  useUpdateEffect(() => {
    selectedRole && run(selectedRole.id)
  }, [selectedRole])

  const renderItems = () => {
    return roleGroupData?.map(roleGroup => {
      return {
        key: roleGroup.id,
        label: (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <UsergroupAddOutlined style={{ fontSize: 20, marginRight: 5 }} rev='' />
            <div>{roleGroup.id === 'default' ? '默认角色组' : roleGroup.name}</div>
          </div>
        ),
        children: roleGroup.roleItemList?.map(roleItem => {
          return {
            key: roleItem.id,
            label: roleGroup.id === 'default' ? roleItem.zhname : roleItem.name,
          }
        }),
      }
    })
  }

  const onMenuSelected: MenuProps['onSelect'] = (e) => {
    const { keyPath } = e
    const [selectedKey, groupKey] = keyPath
    const selectedGroup = roleGroupData?.find(item => item.id === groupKey)
    const selectedRole = selectedGroup?.roleItemList.find(item => item.id === selectedKey)
    if (!selectedGroup || !selectedRole) {
      return
    }
    setSelectedGroup(selectedGroup)
    setSelectedRole(selectedRole)
  }

  const columns: TableProps<RoleApp>['columns'] = [
    { title: '应用名称', dataIndex: 'app_name' },
    { title: '应用权限', dataIndex: 'auth_name' },
    {
      title: '操作', render: (_, record) => {

        const onConfirm = async () => {
          try {
            await delApp(record.data_id)
            message.success('删除成功')
            selectedRole && run(selectedRole.id)
          } catch (error: any) {
            message.error(error?.data?.message ?? '删除失败')
          }
        }

        const onClick = async () => {
          if (permissions) {
            console.log('UpdateAppModal')
            await NiceModal.show(UpdateAppModal, {
              role: currentRoleName,
              group: currentGroupName,
              role_id: selectedRole!.id,
              app: record,
              permissions,
            })
            selectedRole && run(selectedRole.id)
          } else if (!permissions) {
            message.error('权限列表获取失败')
          }
        }

        return (
          <Space>
            <Button type='link' onClick={onClick}>编辑</Button>
            <Popconfirm title='确认移除应用' onConfirm={onConfirm}>
              <Button type='link'>移除</Button>
            </Popconfirm>
          </Space>
        )
      },
    },
  ]

  const currentGroupName = selectedGroup?.id === DEFAULT_ROLE_GROUP_ID ? '默认角色组' : selectedGroup?.name ?? ''

  const currentRoleName = selectedRole?.zhname ?? selectedRole?.name ?? ''

  const onAddApp = async () => {
    if (permissions) {
      await NiceModal.show(AppAddModal, {
        permissions,
        role_id: selectedRole!.id,
        ownApps: roleApps?.map(item => item.app_id) ?? [],
      })
      selectedRole && run(selectedRole.id)
    } else {
      message.error('权限数据获取失败')
    }
  }

  const renderAppList = () => {
    if (!selectedRole) {
      return (
        <div className='loading-container'>
          <Spin tip='加载中...' />
        </div>
      )
    }
    return (
      <React.Fragment>
        <p className='title'>{currentRoleName}</p>
        <RolePath group={currentGroupName} role={currentRoleName} />
        <Button type='primary' onClick={onAddApp}>添加应用</Button>
        <Table
          className='app-table'
          rowKey='app_id'
          columns={columns}
          dataSource={roleApps}
          loading={{ tip: '加载应用列表...', spinning: roleAppLoading || permissionLoading, delay: 100 }}
        />
      </React.Fragment>
    )
  }

  return (
    <ConfigProvider locale={zhCN}>
      <NiceModal.Provider>
        <Container>
          <div className='role-group-menu'>
            <Spin tip='加载中...' spinning={loading}>
              <Menu
                mode='inline'
                items={renderItems()}
                onSelect={onMenuSelected}
                defaultOpenKeys={[DEFAULT_ROLE_GROUP_ID]}
                defaultSelectedKeys={[SYSTEM_ADMINISTRATOR_ROLE_ID]}
              />
            </Spin>
          </div>
          <div className='app-list'>
            {renderAppList()}
          </div>
        </Container>
      </NiceModal.Provider>
    </ConfigProvider>
  )
}

export default App