import React from 'react'
import { useSetState } from 'ahooks'
import styled from 'styled-components'
import NiceModal from '@ebay/nice-modal-react'
import { Button, Col, Form, Input, InputNumber, Modal, Row, Switch } from 'antd'
import { useModal, antdModal } from '@ebay/nice-modal-react'
import { Theme, SubNav, BusinessNav, HeaderConfig as PluginConfig } from 'portal-shared/configuration'

import ImageUpload from './ImageUpload'
import ThemeDrawer from './drawer/ThemeDrawer'
import SysNavDrawer from './drawer/SysNavDrawer'
import StyledNavDrawer from './drawer/SubNavDrawer'
import ApiConfigInput from './ApiConfigInput'
import OldInput from './OldInput'

const StyledMoal = styled(Modal).attrs({
  width: 800,
  okText: '确认',
  centered: true,
  closable: false,
  title: '顶栏配置',
  cancelText: '取消',
  destroyOnClose: true,
})`
.ant-modal-footer {
  text-align: center;

  button {
    width: 150px;
  }
}
`


const ConfigButton = styled(Button).attrs({ type: 'primary', size: 'small' })``

interface ConfigModalProps {
  pluginConfig: Partial<PluginConfig>
  submitConfig: (config: any) => void
}

const ConfigModal: React.FC<ConfigModalProps> = (props) => {

  const [form] = Form.useForm()

  const modal = useModal()

  const { submitConfig, pluginConfig } = props

  const [state, setState] = useSetState(pluginConfig)

  const {
    themes, // 主题列表
    isLevel,  // 本级
    workbanch,  // 工作台
    searchUrl,
    subNavs,
    apiConfig,
    topHeight = 160,
    busninessNavs,
    defaultLogo,
    noticeLink,
    old,
    callbackURL,
  } = state

  const onSwitchChange = (checked: boolean) => {
    setState({ isLevel: checked })
  }

  const onModalClickOk = () => {
    form.validateFields().then(() => {
      const currentConfig = Object.entries(state)
        .filter(([_, val]) => !!val)
        .reduce((memo, [key, val]) => Object.assign({}, memo, { [key]: val }), {} as any)
      submitConfig({
        ...currentConfig,
        ...form.getFieldsValue(),
      })
      modal.hide()
    }).catch(() => { })
  }

  const setWorkbachName = (value: string) => {
    setState({
      workbanch: {
        url: workbanch?.url ?? '',
        text: value,
      },
    })
  }

  const setWorkbachUrl = (value: string) => {
    setState({
      workbanch: {
        url: value,
        text: workbanch?.text ?? '',
      },
    })
  }

  const openSubNavDrawer = () => {
    NiceModal.show(StyledNavDrawer, {
      navs: subNavs ?? [],
      onChange(navs: SubNav[]) {
        setState({ subNavs: navs })
      },
    })
  }

  const openSysNavDrawer = () => {
    NiceModal.show(SysNavDrawer, {
      navs: busninessNavs ?? [],
      onChange(navs: BusinessNav[]) {
        setState({ busninessNavs: navs })
      },
    })
  }

  const openThemeDrawer = () => {
    NiceModal.show(ThemeDrawer, {
      defaultLogo,
      themes: themes ?? [],
      onThemesChange(themes: Theme[]) {
        setState({ themes })
      },
    })
  }

  const modalProps = {
    ...antdModal(modal),
    onOk: onModalClickOk,
  }

  const initialValue = {
    apiConfig,
    topHeight,
    defaultLogo,
    noticeLink,
    searchUrl,
    callbackURL,
    old,
  }

  return (
    <StyledMoal {...modalProps}>
      <Form
        form={form}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 6 }}
        initialValues={initialValue}
      >
        <Form.Item valuePropName='checked' label='本级'>
          <Switch
            checked={isLevel}
            checkedChildren='是'
            unCheckedChildren='否'
            onChange={onSwitchChange}
          />
        </Form.Item>
        <Row gutter={20} style={{ paddingLeft: 56 }}>
          {isLevel && (
            <Col span={5}>
              <Form.Item labelCol={{ span: 12 }} label='下级导航'>
                <ConfigButton onClick={openSubNavDrawer}>
                  点击配置
                </ConfigButton>
              </Form.Item>
            </Col>
          )}
          <Col span={5}>
            <Form.Item labelCol={{ span: 12 }} label='导航按钮'>
              <ConfigButton onClick={openSysNavDrawer}>
                点击配置
              </ConfigButton>
            </Form.Item>
          </Col>
          <Col span={5}>
            <Form.Item labelCol={{ span: 12 }} label='主题配置'>
              <ConfigButton onClick={openThemeDrawer}>
                点击配置
              </ConfigButton>
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          name='defaultLogo'
          label='默认Logo'
          rules={[
            { required: true, message: '请上传默认Logo' },
          ]}
        >
          <ImageUpload tip='上传Logo' />
        </Form.Item>
        <Form.Item
          name='topHeight'
          label='顶部高度'
          rules={[
            { required: true, message: '请输入顶栏高度' },
          ]}
        >
          <InputNumber
            min={60}
            max={160}
            size='small'
            addonAfter='px'
            style={{ width: '58%' }}
          />
        </Form.Item>
        
        <Form.Item 
          required
          name='old'
          label='回到旧版'
          wrapperCol={{ span: 16 }}
          rules={[
            {
              validator: (_, value) => {
                if (!value) {
                  return Promise.reject(new Error('请填写完整信息'))
                } else if (value.text && value.url) {
                  return Promise.resolve()
                } else {
                  return Promise.reject(new Error('请填写完整信息'))
                }
              },
            },
          ]}
        >
          <OldInput />
        </Form.Item>
        <Form.Item 
          name='callbackURL' 
          label='退出回调地址'
          wrapperCol={{ span: 16 }}
        >
          <Input 
            size='small' 
            placeholder='退出登录回调地址'
          />
        </Form.Item>
        <Form.Item
          name='searchUrl'
          label='搜索地址'
          wrapperCol={{ span: 16 }}
          rules={[
            { required: true, message: '请输入搜索地址' },
          ]}
        >
          <Input size='small' placeholder='请输入搜索地址' />
        </Form.Item>
        <Form.Item
          name='noticeLink'
          label='消息管理地址'
          wrapperCol={{ span: 16 }}
          rules={[
            { required: true, message: '请输入消息管理地址' },
          ]}
        >
          <Input size='small' placeholder='请输入消息管理地址' />
        </Form.Item>
        <Form.Item
          required
          name='apiConfig'
          label='主题API key'
          wrapperCol={{ span: 20 }}
          rules={[
            {
              validator: (_, value) => {
                if (!value) {
                  return Promise.reject(new Error('请填写API信息'))
                } else if (value.addKey && value.updateKey && value.queryKey) {
                  return Promise.resolve()
                } else {
                  return Promise.reject(new Error('请填写完整API信息'))
                }
              },
            },
          ]}
        >
          <ApiConfigInput />
        </Form.Item>
        <Form.Item
          label='个人工作台配置'
          wrapperCol={{ span: 20 }}
        >
          <Row gutter={10}>
            <Col span={4}>
              <Input
                size='small'
                placeholder='名称'
                value={workbanch?.text}
                onChange={e => setWorkbachName(e.target.value)}
              />
            </Col>
            <Col span={20}>
              <Input
                size='small'
                placeholder='地址'
                value={workbanch?.url}
                onChange={e => setWorkbachUrl(e.target.value)}
              />
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </StyledMoal>
  )
}

export default NiceModal.create(ConfigModal) 