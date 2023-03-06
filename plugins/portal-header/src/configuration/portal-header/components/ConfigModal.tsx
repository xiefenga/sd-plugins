import React from 'react'
import { useSetState } from 'ahooks'
import styled from 'styled-components'
import NiceModal from '@ebay/nice-modal-react'
import { Button, Form, Input, Modal, Switch } from 'antd'
import { useModal, antdModal } from '@ebay/nice-modal-react'
import { HeaderConfig as PluginConfig, BusinessNav, SubNav, Theme } from 'portal-shared'

import ThemeDrawer from './drawer/ThemeDrawer'
import SysNavDrawer from './drawer/SysNavDrawer'
import StyledNavDrawer from './drawer/SubNavDrawer'

const StyledMoal = styled(Modal).attrs({
  width: 800,
  okText: '确认',
  centered: true,
  closable: false,
  title: '配置插件',
  cancelText: '取消',
  destroyOnClose: true,
})``


const ConfigButton = styled(Button).attrs({ type: 'primary', size: 'small' })``

interface ConfigModalProps {
  pluginConfig: Partial<PluginConfig>
  submitConfig: (config: any) => void
}

const ConfigModal: React.FC<ConfigModalProps> = (props) => {

  const modal = useModal()

  const { submitConfig, pluginConfig } = props

  const [state, setState] = useSetState(pluginConfig)

  const {
    themes, // 主题列表
    isLevel,  // 本级
    workbanch,  // 工作台
    searchUrl,
    subNavs,
    navAssetId,  // 导航资产ID
    busninessNavs,
  } = state

  const onSwitchChange = (checked: boolean) => {
    setState({ isLevel: checked })
  }

  const onModalClickOk = () => {
    const currentConfig = Object.entries(state)
      .filter(([_, val]) => !!val)
      .reduce((memo, [key, val]) => Object.assign({}, memo, { [key]: val }), {} as any)
    submitConfig(currentConfig)
    modal.hide()
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

  return (
    <StyledMoal {...modalProps}>
      <Form labelCol={{ span: 3 }} wrapperCol={{ span: 6 }}>
        <Form.Item label='本级'>
          <Switch
            checked={isLevel}
            checkedChildren='是'
            unCheckedChildren='否'
            onChange={onSwitchChange}
          />
        </Form.Item>
        {isLevel && (
          <Form.Item label='下级导航'>
            <ConfigButton onClick={openSubNavDrawer}>
              点击配置
            </ConfigButton>
          </Form.Item>
        )}
        <Form.Item label='导航按钮'>
          <ConfigButton onClick={openSysNavDrawer}>
            点击配置
          </ConfigButton>
        </Form.Item>
        <Form.Item label='主题配置'>
          <ConfigButton onClick={openThemeDrawer}>
            点击配置
          </ConfigButton>
        </Form.Item>
        <Form.Item label='搜索地址'>
          <Input
            size='small'
            value={searchUrl}
            onChange={e => setState({ searchUrl: e.target.value })}
          />
        </Form.Item>
        <Form.Item label='工作台名称'>
          <Input
            size='small'
            value={workbanch?.text}
            onChange={e => setWorkbachName(e.target.value)}
          />
        </Form.Item>
        <Form.Item label='工作台地址'>
          <Input
            size='small'
            value={workbanch?.url}
            onChange={e => setWorkbachUrl(e.target.value)}
          />
        </Form.Item>
        <Form.Item label='导航资产ID'>
          <Input
            size='small'
            value={navAssetId}
            onChange={e => setState({ navAssetId: e.target.value })}
          />
        </Form.Item>
      </Form>
    </StyledMoal>
  )
}

export default NiceModal.create(ConfigModal) 