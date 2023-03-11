import React from 'react'
import pick from 'lodash.pick'
import { useRef, useState } from 'react'
import NiceModal from '@ebay/nice-modal-react'
import { PlusOutlined } from '@ant-design/icons'
import { useBoolean, useMount, useSetState } from 'ahooks'
import { Form, Input, Space, Button, InputRef } from 'antd'

import type { RuleObject } from 'antd/es/form'
import type { StoreValue } from 'antd/es/form/interface'

import ImageUpload from '@/components/ImageUpload'
import UserModal from '@/components/modals/UserModal'
import IdentityPanel from '@/components/IdentityPanel'
import IdentityModal from '@/components/modals/IdentityModal'
import HandoverModal from '@/components/modals/HandoverModal'
import { LOGIN_NAME_RULES, MAIL_RULES, NAME_RULES, PASSWORD_RULES, PHONE_RULES } from './helper'
import { AccountFormMode, IdentityValue, DrawerAccountValue, AccountFormValue, AccountFormSubmit, IdentityFormValue, DeleteUserMap } from '@/types/components'
import './index.less'

interface AccountFormProps {
  mode: AccountFormMode
  onCancel: () => void
  onSubmit: AccountFormSubmit
  initValue: DrawerAccountValue
}

type Identity = IdentityValue & { _key: string }

const NECESSARY_IDENTITY_KEYS = [
  'id',
  'userName',
  'officeId',
  'roleList',
  'leader',
  'authority',
  'is_default',
]

const AccountFrom: React.FC<AccountFormProps> = (props) => {

  const { mode, onSubmit, onCancel, initValue } = props

  const isAddMode = mode === 'add'

  const isUpdateMode = mode === 'update'

  const [form] = Form.useForm<AccountFormValue>()

  const inputRef = useRef<InputRef>(null)

  const [avatar, setAvatar] = useState('')

  const [signature, setSignature] = useState('')

  const [identityList, setIdentityList] = useState<Identity[]>([])

  const [deleteUserMap, setDeleteUserMap] = useSetState<DeleteUserMap>({})

  const [loading, { setTrue, setFalse }] = useBoolean(false)

  useMount(() => {
    // 设置表单初始值
    if (isUpdateMode) {
      const { account, identityList } = initValue
      form.setFieldsValue({ ...account })
      setAvatar(account.photo ?? '')
      setSignature(account.user_sign ?? '')
      setIdentityList(identityList)
    }
    console.log(inputRef)
  })

  const validateSamePassword = async (_: RuleObject, value: StoreValue) => {
    if (value && value !== form.getFieldValue('newPassword')) {
      throw new Error('确认密码与新密码不一致！')
    }
  }

  const retypePasswordRules = [
    { validator: validateSamePassword },
    { required: true, message: '请再次输入确认密码！' },
  ]

  const checkIdentity = async (_rule: RuleObject, _value: StoreValue) => {
    const access = identityList.some(idendity => idendity.is_default === '1')
    if (!access) {
      throw new Error('请选择默认身份！')
    }
  }

  const identityRules = [
    { required: true, validator: checkIdentity },
  ]

  const onFinish = async () => {
    form.setFieldsValue({
      photo: avatar,
      user_sign: signature,
    })
    // avatar && form.setFieldValue('photo', avatar)
    // signature && form.setFieldValue('user_sign', signature)

    const loginName = form.getFieldValue('loginName')

    const param = JSON.parse(JSON.stringify({
      ...form.getFieldsValue(),
      deleteUserMap,
      userItemList: identityList.map(identity => ({
        loginName,
        ...pick(identity, NECESSARY_IDENTITY_KEYS),
      })),
    }))
    setTrue()
    await onSubmit(param)
    setFalse()
  }

  const openIdentityModal = (initValue?: IdentityFormValue) => {
    NiceModal.show(IdentityModal, {
      initValue,
      identityList,
      onConfirm(identityInfo: IdentityFormValue) {
        const identity: Identity = {
          is_default: identityList.length ? '0' : '1',
          ...identityInfo,
        }
        const existedIndex = identityList.findIndex(item => item._key === identity._key)
        if (existedIndex !== -1) {
          identityList[existedIndex] = identity
        } else {
          identityList.push(identity)
        }
        setIdentityList([...identityList])
      },
    })
  }

  const openUserMoal = () => {
    NiceModal.show(UserModal, {
      onConfirm(name: string, no: string) {
        form.setFieldsValue({ no, name })
      },
    })
  }

  return (
    <Form
      form={form}
      onFinish={onFinish}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      className='drawer-account-form'
    >
      <Form.Item
        label='登录名'
        name='loginName'
        rules={LOGIN_NAME_RULES}
      >
        <Input disabled={isUpdateMode} />
      </Form.Item>
      {isAddMode && (
        <React.Fragment>
          <Form.Item
            label='密码'
            name='newPassword'
            rules={PASSWORD_RULES}
          >
            <Input.Password autoComplete='on' />
          </Form.Item>
          <Form.Item
            label='确认密码'
            name='password'
            rules={retypePasswordRules}
          >
            <Input.Password autoComplete='on' />
          </Form.Item>
        </React.Fragment>
      )}
      <Form.Item
        label='姓名'
        name='name'
        rules={NAME_RULES}
        id='account-name'
        htmlFor='account-name'
      >
        <Input
          ref={inputRef}
          id='account-name'
          onClick={openUserMoal}
          disabled={isUpdateMode}
          onFocus={inputRef.current?.blur}
        />
      </Form.Item>
      <Form.Item label='身份证' name='no'>
        <Input disabled />
      </Form.Item>
      <Form.Item label='手机号' name='mobile' rules={PHONE_RULES}>
        <Input />
      </Form.Item>
      <Form.Item label='邮箱' name='email' rules={MAIL_RULES}>
        <Input />
      </Form.Item>
      <Form.Item label='账户头像' name='photo'>
        <ImageUpload
          tip={<span>添加</span>}
          imageUrl={avatar}
          setImageUrl={setAvatar}
        />
      </Form.Item>
      <Form.Item label='签名' name='user_sign'>
        <ImageUpload
          tip={<div>图片上传</div>}
          imageUrl={signature}
          setImageUrl={setSignature}
        />
      </Form.Item>
      <Form.Item
        label='身份 配置'
        name='identity'
        rules={identityRules}
      >
        <div>
          {identityList.map(identity => (
            <IdentityPanel
              key={identity._key}
              identityName={identity.userName}
              isDefault={identity.is_default === '1'}
              onEditClick={() => {
                openIdentityModal(identity)
              }}
              onDeleteClick={async () => {
                if (identity.id) {
                  const identityId = identity.id
                  // @ts-ignore
                  await NiceModal.show(HandoverModal, {
                    mode: 'record',
                    onConfirm(handoverId: string) {
                      setDeleteUserMap({ [identityId]: handoverId })
                    },
                  })
                }
                setIdentityList(
                  identityList.filter(item => identity._key !== item._key)
                )
              }}
              onSetDefaultClick={() => {
                setIdentityList(
                  identityList.map((item) => {
                    if (identity._key === item._key) {
                      item.is_default = '1'
                    } else if (item.is_default === '1') {
                      item.is_default = '0'
                    }
                    return item
                  })
                )
              }}
            />
          ))}
          <Button
            type='dashed'
            className='add-identity-button'
            onClick={() => openIdentityModal()}
          >
            <PlusOutlined />
            <span className="add-text">添加</span>
          </Button>
        </div>
      </Form.Item>

      <Form.Item>
        <Space>
          <Button type='primary' htmlType='submit' loading={loading}>
            确定
          </Button>
          <Button onClick={onCancel} disabled={loading}>
            取消
          </Button>
        </Space>
      </Form.Item>
    </Form>
  )
}

export default AccountFrom