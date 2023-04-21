import pick from 'lodash.pick'
import React, { useState } from 'react'
import intl from 'react-intl-universal'
import { Drawer, message, Spin } from 'antd'
import { useMount, useRequest } from 'ahooks'
import { ArrowLeftOutlined } from '@ant-design/icons'
import NiceModal, { useModal, antdDrawer } from '@ebay/nice-modal-react'


import AccountForm from '../forms/AccountForm'
import { createAccount, queryAccount, queryIdentity } from '@/api/account'
import { AccountBaseValue, AccountFormMode, AccountFormSubmit, DrawerAccountValue, IdentityValue } from '@/types/components'


const IDENTITY_NECESSARY_KEYS = [
  'id',
  'is_default',
  'userName',
  'officeId',
  'office_name',
  'roleList',
  'roleNameList',
  'leader',
  'leader_name',
  'authority',
]

const CloseIcon = (
  <ArrowLeftOutlined style={{ fontSize: '20px' }} />
)

interface AccountDrawerProps {
  accountCode?: string
  mode: AccountFormMode
  afterClose: () => void
}


const AccountDrawer: React.FC<AccountDrawerProps> = (props) => {

  const modal = useModal()

  const { mode, afterClose, accountCode } = props

  const drawerTitle = mode === 'add' ? '新增账户' : '修改账户'

  const [formValue, setFormValue] = useState<DrawerAccountValue>({
    account: {} as AccountBaseValue,
    identityList: [],
  })

  const service = async (code: string) => {
    const [accountResp, identities] = await Promise.all([
      queryAccount(code),
      queryIdentity(code),
    ])

    const {
      account: loginName,
      loginName: name,
      userSign: user_sign,
      no,
      mobile,
      email,
      photo,
    } = accountResp

    const account = { name, loginName, user_sign, no, mobile, email, photo }

    const identityList = identities
      .filter(identity => identity.roleNameList)
      .map(identity => {
        identity.roleNameList = identity.roleNameList!.map(roleName => intl.get(roleName).d(roleName))
        return ({
          ...pick(identity, IDENTITY_NECESSARY_KEYS) as IdentityValue,
          _key: identity.id!,
        })
      })

    setFormValue({ account, identityList })
  }

  const { loading, run } = useRequest(service, {
    manual: true,
    onError(error) {
      message.error('账户信息获取失败, ' + error)
      console.log(error)
    },
  })

  useMount(() => {
    if (mode === 'update' && accountCode) {
      run(accountCode)
    }
  })

  const onAccountSubmit: AccountFormSubmit = async (param) => {
    try {
      if ('password' in param) {
        await createAccount(param)
        message.success('账户创建成功！')
      } else if (accountCode) {
        await createAccount({
          ...param,
          account_code: accountCode,
        })
        message.success('账户更新成功！')
      }
      modal.hide()
      afterClose()
    } catch (error: any) {
      if (error && error.data && error.data.message) {
        message.error(error.data.message, 5)
      } else if(accountCode) {
        message.error('账户更新失败')
      } else {
        message.error('账户创建失败')
      }
    }
  }

  return (
    <Drawer
      width={600}
      title={drawerTitle}
      closeIcon={CloseIcon}
      {...antdDrawer(modal)}
    >
      <Spin spinning={loading} style={{ minHeight: '100%' }}>
        {loading && mode === 'update' ? null : (
          <AccountForm
            mode={mode}
            initValue={formValue}
            onCancel={modal.hide}
            onSubmit={onAccountSubmit}
          />
        )}

      </Spin>
    </Drawer>
  )
}

export default NiceModal.create(AccountDrawer)